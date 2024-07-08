import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { CustomersService } from 'src/app/services/Files/customers.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { ToolBoxService } from 'src/app/services/Global/tool-box.service';
import { SaleHeadersService } from 'src/app/services/Sales/sale-headers.service';
import { SalesTransactionService } from 'src/app/services/Sales/sales-transaction.service';
import { SalePaymentUIComponent } from '../../componentsShared/sale-payment-ui/sale-payment-ui.component';
import { Router } from '@angular/router';
import { SaleDetailsService } from 'src/app/services/Sales/sale-details.service';

@Component({
  selector: 'app-sales-receipt-ui',
  templateUrl: './sales-receipt-ui.component.html',
  styleUrls: ['./sales-receipt-ui.component.css']
})
export class SalesReceiptUIComponent implements OnInit {

  SaleHeaders       : any = [];
  SelectedCustomer: any=[];
  SelectedSaleHeader: any=[];
  ListData          : MatTableDataSource<any>;
  PageSizeOptions   : number[] = [5, 10, 25, 100, 150];
  SearchKey         : string = "";
  TransDateFrom     : any = new Date();
  TransDateTo       : any = new Date();
  RecordStatus      : string = 'open';
  SelectedReceiptNo : string = undefined;

  dateColumns : string[] = [
    'TransDate',
  ];
  defaultColumns: string[] = [    
    'ReceiptNo',
    'CustomerName',
    'Address',
    'ContactNo',
  ];
  numberColumns: string[] = [  
    'TotalAmount',
    'Discount',
    'TotalDue',
    'AmountPaid',
  ];
  addedColumns: string[] = [    
    'actions',
  ];
  isTrue      : boolean = false;
  mergeColumns: any = this.dateColumns.concat(this.defaultColumns,this.numberColumns,  this.addedColumns);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private saleHeadersService        : SaleHeadersService,
    private saleTransactionService    : SalesTransactionService,
    private dialog                    : MatDialog,
    private notificationsService      : NotificationsService,
    private toolBoxService            : ToolBoxService,
    private customersService          : CustomersService,
    private router:Router,
    private saleDetailsService: SaleDetailsService
  ) { }

  ngOnInit(): void {
    this.saleHeadersService.RequiredRefresh.subscribe(() =>{
      this.GetSaleHeaders();
    })
  }
  async GetSaleHeaders(){
    this.isTrue = true;
    this.SaleHeaders = await firstValueFrom(this.saleHeadersService.GetSaleHeaderByTransDateFromByTransDateTo(
      this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateFrom)),
      this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateTo)),
    ));
    if(this.SaleHeaders)
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
    var data = this.SaleHeaders;
    if(this.RecordStatus.toLocaleLowerCase() != 'all'){
      data  = data.filter((x: { RecordStatus: string; }) => x.RecordStatus == this.RecordStatus);
    }
    this.ListData = new MatTableDataSource(data);
    this.ListData.paginator = this.paginator;
  }

  async onClickUpdate(){
    if(!this.SelectedReceiptNo)
      return this.notificationsService.toastrWarning('No Record Selected.');
      if(this.SelectedSaleHeader.CustomerId != 'CASH'){
        this.SelectedCustomer       = await firstValueFrom(this.customersService.GetCustomerByCustomerId(this.SelectedSaleHeader.CustomerId));
      }else{
        var data:any  ={
          'CustomerId' : 'CASH',
          'CustomerName' : 'CASH',
        } 
        this.SelectedCustomer = data;
      }
      this.SelectedSaleHeader             = await firstValueFrom(this.saleHeadersService.GetSaleHeaderByReceiptNo(this.SelectedSaleHeader.ReceiptNo));
  
      const dialogConfig        = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus    = true;
      dialogConfig.width        = '800px';
      dialogConfig.data         = ([this.SelectedSaleHeader, this.SelectedCustomer,'update']);
      this.dialog.open(SalePaymentUIComponent,dialogConfig).beforeClosed().subscribe(()=>{
        this.SelectedReceiptNo  = undefined;
        this.SelectedSaleHeader = [];
        this.GetSaleHeaders();
      })
    }
    
    onClickVoid(){
      if(!this.SelectedReceiptNo)
      return this.notificationsService.toastrWarning('No Record Selected.');
  
      var RecordStatus = this.SelectedSaleHeader.RecordStatus == 'open' ? 'void' : 'open';
        this.notificationsService.popupWarning(RecordStatus.toLocaleUpperCase()+" Record","Are you sure to "+RecordStatus+" this item?").then((result) => {
          if (result.value) {
            this.saleTransactionService.UpdateSaleHeaderStatusByReceiptNo(this.SelectedSaleHeader.ReceiptNo, RecordStatus).subscribe({
                next:(res)=>{
                  this.notificationsService.toastrSuccess(res.message);
                  this.GetSaleHeaders();
                },
                error:(err)=>{
                  this.notificationsService.toastrError(err.error);
                },
            });
          }
        });
    }
    onClickPrintReceipts(){
      var url = this.router.serializeUrl(
        this.router.createUrlTree(['print/printreceipts'])
      );
      var data = this.ListData.filteredData;
      console.log(data)
      this.popupWindow(url, 'SaleReceipts', window, 800, 800);
      localStorage.setItem('Headers', JSON.stringify(data));
      localStorage.setItem('Title', 'SALES RECEIPTS from '+this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateFrom)) +' to '+  this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateTo)) );
      localStorage.setItem('Transaction', 'sales');
    }

    popupWindow(url, windowName, win, w, h) {
      const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
      const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
      return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }
    async onClickPrintReceipt(){
      if(!this.SelectedReceiptNo)
        return this.notificationsService.toastrWarning('No Record Selected.');
  
      var url = this.router.serializeUrl(
        this.router.createUrlTree(['print/printreceipt'])
      );
  
      var data = this.SelectedSaleHeader;
      var saleDetails = await firstValueFrom(this.saleDetailsService.GetSaleDetailsByReceiptNoByRecordStatus(this.SelectedSaleHeader.ReceiptNo, 'open'));
      this.popupWindow(url, 'SaleReceipt', window, 800, 800);
      localStorage.setItem('Header', JSON.stringify(data));
      localStorage.setItem('Details', JSON.stringify(saleDetails));
      localStorage.setItem('Title', 'SALES RECEIPTS from '+this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateFrom)) +' to '+  this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateTo)) );
      localStorage.setItem('Transaction', 'sales');
    }
  
  
      
  
    // onClickVoid(){
    //   if(!this.SelectedReceiptNo)
    //   return this.notificationsService.toastrWarning('No Record Selected.');
  
    //   var RecordStatus = this.SelectedSaleHeader.RecordStatus == 'open' ? 'void' : 'open';
    //     this.notificationsService.popupWarning(RecordStatus.toLocaleUpperCase()+" Record","Are you sure to "+RecordStatus+" this item?").then((result) => {
    //       if (result.value) {
    //       //  console.log(this.SelectedSaleHeader)
    //         this.saleTransactionService.UpdateSaleHeaderStatusByReceiptNo(this.SelectedSaleHeader.ReceiptNo, RecordStatus),({
    //             next:(res: { message: any; })=>{
    //               this.notificationsService.toastrSuccess(res.message);
    //             },
    //             error:(err: { error: any; })=>{
    //               this.notificationsService.toastrError(err.error);
    //             },
    //         });
    //       }
    //     });
    // }
  
  

    getRecord(data : any){
      this.SelectedReceiptNo = data.ReceiptNo;
      this.SelectedSaleHeader = data;
    }
      

}
