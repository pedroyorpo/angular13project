import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { CustomersService } from 'src/app/services/Files/customers.service';

import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { CustomerUIComponent } from '../../componentsShared/customers-ui/customers-ui.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {

  listData          : MatTableDataSource<any>;
  pageSizeOptions   : number[] = [5, 10, 25, 100];
  searchKey         : string = "";
  placeHolder       : string = "Search Item";
  customers         : any=[];
  num               : any =[];
  defaultColumns: string[] = [    
    'CustomerId',
    'CustomerName',
    'Address',
    
  ];
  numberColumns: string[] = [ 
    'ContactNo', 
   
    
  ];
  dateColumns: string[] =[
    'created_at',
    'updated_at'
  ]
  addedColumns: string[] = [    
    'actions',
  ];
  isTrue : boolean = false;
  mergeColumns: any = this.defaultColumns.concat(this.numberColumns,this.dateColumns, this.addedColumns);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private customersService      : CustomersService,
    private dialog                : MatDialog,
    private notificationsService  : NotificationsService,
  ) { }

  ngOnInit(): void {
    this.GetItems();
    this.customersService.RequiredRefresh.subscribe(() =>{
      this.GetItems();
    })
  }
 
  async GetItems(){
    this.isTrue = true;
    this.customers = await firstValueFrom(this.customersService.GetItems());
    if(this.customers)
      this.isTrue = false;
    this.DisplayRecords();
    
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  clearSearch(){
    this.searchKey = "";
    this.applyFilter();
  }

  DisplayRecords(){
    var customers = this.customers;

    this.listData = new MatTableDataSource(customers);
    this.listData.paginator = this.paginator;
  }

  onUpdate(data:any){
    // var data:any ={
    //   'CustomerId ': 'CT122',
   
    // }
    // console.log(data);
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '600px';
    dialogConfig.data        =data;
    this.dialog.open(CustomerUIComponent,dialogConfig);
  }

  onClickNew(){
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '600px';
    this.dialog.open(CustomerUIComponent,dialogConfig);
  }
  onClickNew2(){
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '600px';
    this.dialog.open(CustomerUIComponent,dialogConfig);

  }

  onDelete(data:any){
    if(!data){
      this.notificationsService.toastrWarning('No record selected!');
      
    }
    else{
      this.notificationsService.popupWarning("Customer Name","Are you sure to delete this customer?").then((result) => {
        if (result.value) {
          console.log(data)
          this.customersService.DeleteCustomer(data.CustomerId).subscribe({
              next:(res)=>{
                this.notificationsService.toastrSuccess(res.message);
              },
              error:(err)=>{
                this.notificationsService.toastrError(err.error);
              },
          });
        }
      });
    }
  }



}




