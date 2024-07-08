import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ItemsService } from 'src/app/services/Files/items.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { ToolBoxService } from 'src/app/services/Global/tool-box.service';
import { SaleDetailsService } from 'src/app/services/Sales/sale-details.service';
import { SaleHeadersService } from 'src/app/services/Sales/sale-headers.service';
import { SalesTransactionService } from 'src/app/services/Sales/sales-transaction.service';
import { SelectedSaleDetailUIComponent } from '../../componentsShared/selected-sale-detail-ui/selected-sale-detail-ui.component';

@Component({
  selector: 'app-edit-sales-records',
  templateUrl: './edit-sales-records.component.html',
  styleUrls: ['./edit-sales-records.component.css']
})
export class EditSalesRecordsComponent implements OnInit {

  SaleDetails       : any = [];
  SelectedSaleDetail: any=[];
  ListData          : MatTableDataSource<any>;
  PageSizeOptions   : number[] = [5, 10, 25, 100, 150];
  SearchKey         : string = "";
  TransDateFrom     : any = new Date();
  TransDateTo       : any = new Date();
  RecordStatus      : string = 'open';
  SelectedId : string = undefined;

  dateColumns : string[] = [
    'TransDate',
  ];
  defaultColumns: string[] = [    
    'ReceiptNo',
    'CustomerName',
    'ItemName',
    'UM',
    'Category',
  ];
  numberColumns: string[] = [  
    'Qty',
    'Price',
    'Discount',
    'Amount',
  ];
  addedColumns: string[] = [    
    'actions',
  ];
  isTrue      : boolean = false;
  mergeColumns: any = this.dateColumns.concat(this.defaultColumns,this.numberColumns,  this.addedColumns);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private saleHeadersService        : SaleHeadersService,
    private saleDetailsService        : SaleDetailsService,
    private saleTransactionService    : SalesTransactionService,
    private dialog                    : MatDialog,
    private notificationsService      : NotificationsService,
    private toolBoxService            : ToolBoxService,
    private itemsService              : ItemsService,
  ) { }

  ngOnInit(): void {
    this.saleDetailsService.RequiredRefresh.subscribe(() =>{
      this.GetSaleDetails();
    })
  }

  async GetSaleDetails(){
    this.isTrue = true;

    this.SaleDetails = await firstValueFrom(this.saleDetailsService.GetSaleDetailsByTransDateFromByTransDateTo(
      this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateFrom)),
      this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateTo)),
    ));
    this.SaleDetails.forEach(x=>{
      x.Amount = (x.Qty * x.Price)-(x.Qty * x.Discount);
    })
    
    if(this.SaleDetails)
      this.isTrue = false;
    this.DisplayRecords();
  }

  applyFilter(){
    this.ListData.filter = this.SearchKey.trim().toLocaleLowerCase();
  }

  clearSearch(){
    this.SearchKey = "";
    this.applyFilter();
  }

  DisplayRecords(){
    var data = this.SaleDetails;
    if(this.RecordStatus.toLocaleLowerCase() != 'all'){
      data  = data.filter(x => x.RecordStatus == this.RecordStatus);
    }
    this.ListData = new MatTableDataSource(data);
    this.ListData.paginator = this.paginator;
  }

  async onClickUpdate(){
    if(!this.SelectedId)
      return this.notificationsService.toastrWarning('No Record Selected.');
      var item         = await firstValueFrom(this.itemsService.GetItemsByItemId(this.SelectedSaleDetail.ItemId));
      var data         = await firstValueFrom(this.saleDetailsService.GetSaleDetailById(this.SelectedSaleDetail.id));

      const dialogConfig        = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus    = true;
      dialogConfig.width        = '500px';
      dialogConfig.data         = ([data, item, '']);
      this.dialog.open(SelectedSaleDetailUIComponent,dialogConfig).beforeClosed().subscribe(()=>{
        this.GetSaleDetails();
      })
  }


  onClickVoid(){
    if(!this.SelectedId)
    return this.notificationsService.toastrWarning('No Record Selected.');

    var RecordStatus = this.SelectedSaleDetail.RecordStatus == 'open' ? 'void' : 'open';
    this.notificationsService.popupWarning(RecordStatus.toLocaleUpperCase()+" Record","Are you sure to "+RecordStatus+" this item?").then((result) => {
      if (result.value) {
        this.saleTransactionService.UpdateSaleDetailStatusById(this.SelectedSaleDetail.id, RecordStatus).subscribe({
            next:(res)=>{
              this.notificationsService.toastrSuccess(res.message);
              this.GetSaleDetails();
            },
            error:(err)=>{
              this.notificationsService.toastrError(err.error);
            },
        });
      }
    });
  }

  async onClickAddItemToReceipt(){
    if(!this.SelectedId)
    return this.notificationsService.toastrWarning('No Record Selected.');

    var data         = await firstValueFrom(this.saleDetailsService.GetSaleDetailById(this.SelectedSaleDetail.id));


    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '1000px';
    dialogConfig.data         = ([data,'sales']);
    
    // this.dialog.open(SalesAddItemToReceiptUIComponent,dialogConfig).beforeClosed().subscribe(()=>{
    //   this.GetSaleDetails();
    // })

  }

  getRecord(data : any){
    this.SelectedId = data.id;
    this.SelectedSaleDetail = data;
  }


}
