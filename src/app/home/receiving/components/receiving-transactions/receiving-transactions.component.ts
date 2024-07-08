import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ItemsService } from 'src/app/services/Files/items.service';
import { SuppliersService } from 'src/app/services/Files/suppliers.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { ToolBoxService } from 'src/app/services/Global/tool-box.service';
import { ReceiveDetailsService } from 'src/app/services/Receiving/receive-details.service';
import { ReceiveHeadersService } from 'src/app/services/Receiving/receive-headers.service';
import { ReceivingTransactionService } from 'src/app/services/Receiving/receiving-transaction.service';
import { ReceivingPaymentUIComponent } from '../../componentsShared/receiving-payment-ui/receiving-payment-ui.component';

@Component({
  selector: 'app-receiving-transaction',
  templateUrl: './receiving-transactions.component.html',
  styleUrls: ['./receiving-transactions.component.css']
})
export class ReceivingTransactionsComponent implements OnInit {
  Items               : any=[];
  Suppliers           : any=[];
  ReceiveDetails      : any=[];
  ReceiveHeader       : any=[];
  listData            : MatTableDataSource<any> ;
  searchKey           : any=[];
  IsTrue              : boolean = false;
  IsCostCheck         : boolean = false;
  TransNo             : any  = null;
  SubTotal            : number = 0;
  SupplierId          : any = 'CASH';
  ItemId              : any=[];
  SelectedId          : string;
  SelectedItem        : any=[];
  SelectedSupplier    : any=[];
  Btn1Text            : string = 'SAVE TRANSACTION';
  pageSizeOptions     : number[] = [5, 10, 25, 100];
  disableSave         : boolean = false;
  displayedColumns1   : any[] = [
    'Qty',
    'ItemName',
    'UM',
    'Cost',
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
    'Cost2',
    'Available',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog                  : MatDialog,
    private itemsService            : ItemsService,
    private suppliersService        : SuppliersService,
    private receivingTransactionService : ReceivingTransactionService,
    private receiveHeadersService      : ReceiveHeadersService,
    private receiveDetailsService      : ReceiveDetailsService,
    private notificationsService    : NotificationsService,
    private toolBoxService          : ToolBoxService,
  ) { }

  ngOnInit(): void {
    this.GetReceiveDetails();
    this.GetSuppliers();
    this.GetItems();

    this.receivingTransactionService.RequiredRefresh.subscribe(()=>{
      this.GetReceiveDetails();
    });
  }

  async GetReceiveDetails(){
    await this.GetTransNo();

    this.IsTrue = true;
    this.ReceiveHeader  = await firstValueFrom(this.receiveHeadersService.GetReceiveHeaderByTransNo(this.TransNo));
    this.ReceiveDetails = await firstValueFrom(this.receiveDetailsService.GetReceiveDetailsByTransNo(this.TransNo));

    if(this.ReceiveHeader){
      if(this.ReceiveHeader.SupplierId){
        if(this.SupplierId  != 'CASH'){
          this.SupplierId = this.SupplierId
        }else{
          this.SupplierId = this.ReceiveHeader.SupplierId
        }
      }
    }else{
      this.SupplierId = 'CASH';
    }
    
    if(this.ReceiveDetails)
      this.IsTrue = false;
    this.DisplayRecords();
  } 

  async GetTransNo(){
    this.TransNo = await firstValueFrom(this.receivingTransactionService.GetTransReceiveNo());
  }

  async GetSuppliers(){
    // this.Suppliers = await firstValueFrom(this.suppliersService.GetCBOSuppliers());
    // this.Suppliers.push('CASH');
  }

  async GetItems(){
    this.Items = await firstValueFrom(this.itemsService.GetItemsToSale());
  }

  CostCheck(){
    this.IsCostCheck = true;
    this.Btn1Text     = 'Receive DETAILS';
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
    var data = this.ReceiveDetails;
    this.SubTotal = 0;
    if(data.length > 0){
      data.forEach(x => {
        this.SubTotal += (x.Cost * x.Qty )- (x.Discount * x.Qty);
        x.Amount      = (x.Cost * x.Qty )- (x.Discount * x.Qty);
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

    this.receivingTransactionService.SaveToReceiveHeaders(this.ItemId, this.TransNo, this.SupplierId).subscribe({
      next: (res)=>{
        this.notificationsService.toastrSuccess(res.message);
        this.ItemId = undefined;
      },
      error: (err)=>{
        this.notificationsService.toastrError(err.error);
      }
    }); 
    this.GetReceiveDetails();
  }

  async SaveTransaction(){
    if(this.Btn1Text == 'SAVE TRANSACTION'){
      this.disableSave = true;
      if(this.ReceiveDetails.length > 0){
        if(this.SupplierId != 'CASH'){
       //   this.SelectedSupplier       = await firstValueFrom(this.suppliersService.GetSupplierBySupplierId(this.SupplierId));
        }else{
          var data:any  ={
            'SupplierId' : 'CASH',
            'SupplierName' : 'CASH',
          } 
          this.SelectedSupplier = data;
        }
        this.ReceiveHeader             = await firstValueFrom(this.receiveHeadersService.GetReceiveHeaderByTransNo(this.TransNo));
        this.ReceiveHeader.TotalAmount = this.SubTotal;
        this.ReceiveHeader.ReceiptNo   = 'generated';
    
        const dialogConfig        = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus    = true;
        dialogConfig.width        = '800px';
        dialogConfig.data         = ([this.ReceiveHeader, this.SelectedSupplier,'open']);
        this.dialog.open(ReceivingPaymentUIComponent,dialogConfig).beforeClosed().subscribe(()=>{
          this.ngOnInit();
          this.disableSave = false;
        })
      }
      else{
        this.notificationsService.toastrWarning('No Items Sold!');
        this.disableSave = false;
      }
    }else{
      this.IsCostCheck = false;
      this.Btn1Text     = 'SAVE TRANSACTION';
      this.DisplayRecords();
    }
  }

//  async Edit(data:any){
//     this.SelectedItem         = await firstValueFrom(this.itemsService.GetItemByItemId(data.ItemId));
    
//     const dialogConfig        = new MatDialogConfig();
//     dialogConfig.disableClose = true;
//     dialogConfig.autoFocus    = true;
//     dialogConfig.width        = '500px';
//     dialogConfig.data         = ([data, this.SelectedItem, '']);
//     this.dialog.open(SelectedReceivingDetailUIComponent,dialogConfig).beforeClosed().subscribe(()=>{
//       this.GetReceiveDetails();
//     })
//   }

  Remove(data:any){
    if(!data){
      this.notificationsService.toastrWarning('No record selected!');
    }
    else{
      this.notificationsService.popupWarning3Buttons("Delete Item","Are you sure to delete this item?").then((result) => {
        if (result.isConfirmed) {
          this.receivingTransactionService.DeleteReceiveDetailById(data.id).subscribe({
            next:(res) =>{
              this.notificationsService.toastrSuccess(res.message);
              this.GetReceiveDetails();
  
            },
            error:(err) => {
              this.notificationsService.toastrError(err.error.message);
              this.GetReceiveDetails();
            },
          });
        } else if (result.isDenied) {
          this.receivingTransactionService.DeleteReceiveDetailsByTransNo(this.TransNo).subscribe({
            next:(res) =>{
              this.notificationsService.toastrSuccess(res.message);
              this.GetReceiveDetails();
            },
            error:(err) => {
              this.notificationsService.toastrError(err.error.message);
              this.GetReceiveDetails();
            },
          });
        }
      });
    }
  }

  SaveAsHold(){
    this.notificationsService.popupWarning('Save as Hold', 'All items will be Saved as Hold. CONTINUE? ').then(async (result) => {
      if (result.isConfirmed) {
        if(this.SupplierId != 'CASH'){
     //     this.SelectedSupplier       = await firstValueFrom(this.suppliersService.GetSupplierBySupplierId(this.SupplierId));
        }else{
          var data:any  ={
            'SupplierId' : 'CASH',
            'SupplierName' : 'CASH',
          } 
          this.SelectedSupplier = data;
        }

        var form:any = {
          'SupplierId'    : this.SelectedSupplier.SupplierId,
          'SupplierName'  : this.SelectedSupplier.SupplierName,
          'TotalAmount'   : this.SubTotal,
          'ReceiptNo'     : 'generated',
          'TransNo'       : this.TransNo,
          'TotalDue'      : this.SubTotal,
          'TransDate'     : (new Date),
          'AmountPaid'    : 0,
          'PaymentType'   : 'CASH',
        };

        this.receivingTransactionService.UpdateReceiveHeader(form, 'onhold').subscribe({
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

  PopUpCost(){
    this.SelectedItem = this.Items.filter(x => x.ItemName.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase()));
    this.SelectedItem = this.SelectedItem[0];
    this.SelectItem();
  }

  SelectItem2(){
    if(this.IsCostCheck){
      this.ItemId  =  this.SelectedItem.ItemId;
      this.searchKey = undefined;
      this.SelectItem();
    }
  }

  GetDisplayedColumns(){
    if(this.IsCostCheck == true){
      return this.displayedColumns2;
    }
    else{
      return this.displayedColumns1;
    }
  }

  UpdateElementReceiveDetail(event: any, id: string, Column: string){
    if(Column == 'DiscountType'){
      var Value = event.checked;
      if(Value == true){
        Value = 'percent';
      }else{
        Value = 'amount';
      }
    }else{
      var Value = event.target.value ;

      if (!this.toolBoxService.isNumber(Value)) {
        return this.notificationsService.toastrWarning(Value+' is not a number.');
      } 
    }

    this.receivingTransactionService.UpdateElementReceiveDetail(id, Column, Value).subscribe({
      next:(res) =>{
        this.notificationsService.toastrSuccess(res.message);
        this.GetReceiveDetails();
      },
      error:(err) => {
        this.notificationsService.toastrError(err.error.message);
        this.GetReceiveDetails();
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
