import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { CustomersService } from 'src/app/services/Files/customers.service';
import { ItemsService } from 'src/app/services/Files/items.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { SaleDetailsService } from 'src/app/services/Sales/sale-details.service';
import { SaleHeadersService } from 'src/app/services/Sales/sale-headers.service';
import { SalesTransactionService } from 'src/app/services/Sales/sales-transaction.service';
import { SalePaymentUIComponent } from '../../componentsShared/sale-payment-ui/sale-payment-ui.component';
import { SelectedSaleDetailUIComponent } from '../../componentsShared/selected-sale-detail-ui/selected-sale-detail-ui.component';
import { ToolBoxService } from 'src/app/services/Global/tool-box.service';


@Component({
  selector: 'app-sales-transaction',
  templateUrl: './sales-transaction.component.html',
  styleUrls: ['./sales-transaction.component.css']
})
export class SalesTransactionComponent implements OnInit {

  Items           : any=[];
  Customers       : any=[];
  SaleDetails     : any=[];
  SaleHeader      : any=[];
  listData        : MatTableDataSource<any> ;
  searchKey       : any=[];
  IsTrue          : boolean = false;
  IsPriceCheck    : boolean = false;
  TransNo         : any  = null;
  SubTotal        : number = 0;
  CustomerId      : any = 'CASH';
  ItemId          : any=[];
  SelectedId      : string;
  SelectedItem    : any=[];
  SelectedCustomer: any=[];
  Btn1Text        : string = 'SAVE TRANSACTION';
  pageSizeOptions : number[] = [5, 10, 25, 100];
  disableSave     : boolean = false;
  displayedColumns1: any[] = [
    'Qty',
    'ItemName',
    'UM',
    'Price',
    'Discount',
    'DiscountValue',
    'Amount',
    'actions',
  ];
  displayedColumns2: string[] = [
    'ItemId' ,
    'ItemName',
    'UM',
    'Category',
    'Price2',
    'Available',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog                  : MatDialog,
    private itemsService            : ItemsService,
    private customersService        : CustomersService,
    private salesTransactionService : SalesTransactionService,
    private saleHeadersService      : SaleHeadersService,
    private saleDetailsService      : SaleDetailsService,
    private notificationsService    : NotificationsService,
    private toolBoxService          :ToolBoxService,
  ) { }

  ngOnInit(): void {
    this.GetSaleDetails();
    this.GetCustomers();
    this.GetItems();
    this.salesTransactionService.RequiredRefresh.subscribe(()=>{
      this.GetSaleDetails();
    });
  }

  async GetSaleDetails(){
    await this.GetTransNo();
    this.IsTrue = true;
    this.SaleHeader  = await firstValueFrom(this.saleHeadersService.GetSaleHeaderByTransNo(this.TransNo));
    this.SaleDetails =  await firstValueFrom(this.saleDetailsService.GetSaleDetailsByTransNo(this.TransNo));

    if(this.SaleHeader){
      if(this.SaleHeader.CustomerId){
        if(this.CustomerId  != 'CASH'){
          this.CustomerId = this.CustomerId
        }else{
          this.CustomerId = this.SaleHeader.CustomerId
        }
      }
    }else{
      this.CustomerId = 'CASH';
    }
    
    if(this.SaleDetails)
      this.IsTrue = false;
    this.DisplayRecords();
  } 

  async GetTransNo(){
    this.TransNo = await firstValueFrom(this.salesTransactionService.GetTransSaleNo());
    //console.log(this.TransNo)
  }

  async GetCustomers(){
    this.Customers = await firstValueFrom(this.customersService.GetCBOCustomers());
    this.Customers.push('CASH');
  }

  async GetItems(){
    this.Items = await firstValueFrom(this.itemsService.GetItemsToSale());
  }

  PriceCheck(){
    this.IsPriceCheck = true;
    this.Btn1Text     = 'SALE DETAILS';
    this.DisplayRecords2();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  clearSearch(){
    this.searchKey = "";
    this.applyFilter();
  }

  DisplayRecords(){
    var data = this.SaleDetails;
    this.SubTotal = 0;
    if(data.length > 0){
      data.forEach(x => {
        this.SubTotal += (x.Price * x.Qty )- (x.Discount * x.Qty);
        x.Amount      = (x.Price * x.Qty )- (x.Discount * x.Qty);
      });
    }
    this.SelectedId = undefined;
    this.listData = new MatTableDataSource(data);
    this.listData.paginator = this.paginator;
  }

  DisplayRecords2(){
    var data        = this.Items;
    this.SelectedId = undefined;
    this.listData   = new MatTableDataSource(data);
    this.listData.paginator = this.paginator;
  }

  getRecord(data : any){
    this.SelectedId = data.id;
    this.SelectedItem = data;
  }
  
  SelectItem(){
    this.Btn1Text = 'SAVE TRANSACTION';
    this.SelectedItem = this.Items.filter(x => x.ItemId == this.ItemId);
   //console.log(this.CustomerId)
    this.salesTransactionService.SaveToSaleHeaders(this.ItemId, this.TransNo, this.CustomerId).subscribe({
    
      next: (res)=>{
        this.notificationsService.toastrSuccess(res.message);
        this.ItemId = undefined;
      
      },
      error: (err)=>{
        this.notificationsService.toastrError(err.error);
      }
    }); 
    this.GetSaleDetails();
  }

  async SaveTransaction(){
    if(this.Btn1Text == 'SAVE TRANSACTION'){
      this.disableSave = true;
      if(this.SaleDetails.length > 0){
        if(this.CustomerId != 'CASH'){
          this.SelectedCustomer       = await firstValueFrom(this.customersService.GetCustomerByCustomerId(this.CustomerId));
        }else{
          var data:any  ={
            'CustomerId' : 'CASH',
            'CustomerName' : 'CASH',
          } 
          this.SelectedCustomer = data;
        }
        this.SaleHeader             = await firstValueFrom(this.saleHeadersService.GetSaleHeaderByTransNo(this.TransNo));
        this.SaleHeader.TotalAmount = this.SubTotal;
        this.SaleHeader.ReceiptNo = 'generated';

        const dialogConfig        = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus    = true;
        dialogConfig.width        = '800px';
        dialogConfig.data         = ([this.SaleHeader, this.SelectedCustomer,'open']);
        this.dialog.open(SalePaymentUIComponent,dialogConfig).beforeClosed().subscribe(()=>{
          this.ngOnInit();
          this.disableSave = false;
        })
      }
      else{
        this.notificationsService.toastrWarning('No Items Sold!');
        this.disableSave = false;
      }
    }else{
      this.IsPriceCheck = false;
      this.Btn1Text     = 'SAVE TRANSACTION';
      this.DisplayRecords();
    }
  }

 async Edit(data:any){
    this.SelectedItem         = await firstValueFrom(this.itemsService.GetItemsByItemId(data.ItemId));
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '500px';
    dialogConfig.data         = ([data, this.SelectedItem, '']);
    this.dialog.open(SelectedSaleDetailUIComponent,dialogConfig).beforeClosed().subscribe(()=>{
      this.GetSaleDetails();
    })
  }
  Remove(data:any){
    if(!data){
      this.notificationsService.toastrWarning('No record selected!');
    }
    else{
      this.notificationsService.popupWarning3Buttons("Delete Item","Are you sure to delete this item?").then((result) => {
        if (result.isConfirmed) {
         // console.log(data.id)
          this.salesTransactionService.DeleteSaleDetailById(data.id).subscribe({
            next:(res) =>{
              this.notificationsService.toastrSuccess(res.message);
              this.GetSaleDetails();
  
            },
            error:(err) => {
              this.notificationsService.toastrError(err.error.message);
              this.GetSaleDetails();
            },
          });
        } else if (result.isDenied) {
          this.salesTransactionService.DeleteSaleDetailsByTransNo(this.TransNo).subscribe({
            next:(res) =>{
              this.notificationsService.toastrSuccess(res.message);
              this.GetSaleDetails();
            },
            error:(err) => {
              this.notificationsService.toastrError(err.error.message);
              this.GetSaleDetails();
            },
          });
        }
      });
    }
  }

  SaveAsHold(){
    this.notificationsService.popupWarning('Save as Hold', 'All items will be Saved as Hold. CONTINUE? ').then(async (result) => {
      if (result.isConfirmed) {
        if(this.CustomerId != 'CASH'){
          this.SelectedCustomer       = await firstValueFrom(this.customersService.GetCustomerByCustomerId(this.CustomerId));
        }else{
          var data:any  ={
            'CustomerId' : 'CASH',
            'CustomerName' : 'CASH',
          } 
          this.SelectedCustomer = data;
        }

        var form:any = {
          'CustomerId'    : this.SelectedCustomer.CustomerId,
          'CustomerName'  : this.SelectedCustomer.CustomerName,
          'TotalAmount'   : this.SubTotal,
          'ReceiptNo'     : 'generated',
          'TransNo'       : this.TransNo,
          'TotalDue'      : this.SubTotal,
          'TransDate'     : (new Date),
          'AmountPaid'    : 0,
          'PaymentType'   : 'CASH',
          'PONo'          : '-',
          'TransType'     : 'PICKUP',
          'DiscountPerson': 'NO DISCOUNT',
        };

        this.salesTransactionService.UpdateSaleHeader(form, 'onhold').subscribe({
          next:(res)=>{
            this.notificationsService.toastrSuccess(res.message);
            this.ngOnInit();
          },
          error:(err)=>{
            this.notificationsService.toastrError(err.error);
          },
        });
      
      }
    });
  }

  PopUpPrice(){
    this.SelectedItem = this.Items.filter(x => x.ItemName.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase()));
    this.SelectedItem = this.SelectedItem[0];
    this.SelectItem();
  }

  SelectItem2(){
    if(this.IsPriceCheck == true)
    {
      this.ItemId  =  this.SelectedItem.ItemId;
      this.searchKey = undefined;
      this.SelectItem();
      this.IsPriceCheck = false;
    }

  }
  GetDisplayedColumns(){
    if(this.IsPriceCheck == true){
      return this.displayedColumns2;
    }
    else{
      return this.displayedColumns1;
    }
  }

  UpdateElementSaleDetail(event: any, id: string, Column: string){
    if(Column == 'DiscountType'){
      var Value = event.checked;
      if(Value == true){
        Value = 'percent';
      }else{
        Value = 'amount';
      }
    }else{
      var Value = event.target.value ;
      if(!this.toolBoxService.isNumber(Value)){
        return this.notificationsService.toastrWarning(Value+'is not a number.');
      }
    }
    this.salesTransactionService.UpdateElementSaleDetail(id, Column, Value).subscribe({
      next:(res) =>{
        this.notificationsService.toastrSuccess(res.message);
        this.GetSaleDetails();

      },
      error:(err) => {
        this.notificationsService.toastrError(err.error.message);
        this.GetSaleDetails();
      },
    });
  }

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  onContextMenu(event: MouseEvent, data: any) {
    this.getRecord(data);
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = { 'data': data };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
  }


}
