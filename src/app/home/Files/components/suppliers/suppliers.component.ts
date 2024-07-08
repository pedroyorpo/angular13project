import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { SuppliersService } from 'src/app/services/Files/suppliers.service';

import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { SuppliersUiComponent } from '../../componentsShared/suppliers-ui/suppliers-ui.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})

export class SuppliersComponent implements OnInit {

  listData          : MatTableDataSource<any>;
  pageSizeOptions   : number[] = [5, 10, 25, 100];
  searchKey         : string = "";
  placeHolder       : string = "Search Item";
  suppliers         : any=[];
  num               : any =[];

  defaultColumns: string[] = [    
    'SupplierId',
    'SupplierName',
    'Address',
    'ContactNo',
    'ContactPerson'
  ];
  numberColumns: string[] = [ 
   
   
    
  ];
  dateColumns: string[] =[
    'created_at',
    'updated_at'
  ]
  addedColumns: string[] = [    
    'actions',
  ];
  isTrue : boolean = false;
  mergeColumns: any = this.defaultColumns.concat(this.dateColumns, this.addedColumns);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  customersService: any;

  constructor(
    private suppliersService      : SuppliersService,
    private dialog                : MatDialog,
    private notificationsService  : NotificationsService,
  ) { }

  ngOnInit(): void {
    this.GetItems();
    this.suppliersService.RequiredRefresh.subscribe(() =>{
      this.GetItems();
    })
  }
 
  async GetItems(){
    this.isTrue = true;
    this.suppliers = await firstValueFrom(this.suppliersService.GetSuppliers());
    if(this.suppliers)
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
    var suppliers = this.suppliers;

    this.listData = new MatTableDataSource(suppliers);
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
    dialogConfig.data        = data;
    this.dialog.open(SuppliersUiComponent,dialogConfig);
  }

  onClickNew(){
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '600px';
    this.dialog.open(SuppliersUiComponent,dialogConfig);
  }
  onClickNew2(){
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '600px';
    this.dialog.open(SuppliersUiComponent,dialogConfig);

  }
  onDelete(data:any){
    if(!data){
      this.notificationsService.toastrWarning('No record selected!');
      
    }
    else{
      this.notificationsService.popupWarning("Supplier Name","Are you sure to delete this supplier?").then((result) => {
        if (result.value) {
          console.log(data)
          this.suppliersService.DeleteSupplier(data.SupplierId).subscribe({
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




