import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ItemsService } from 'src/app/services/Files/items.service';
import { ItemUIComponent } from '../../componentsShared/item-ui/item-ui.component';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { ToolBoxService } from 'src/app/services/Global/tool-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  listData          : MatTableDataSource<any>;
  pageSizeOptions   : number[] = [5, 10, 25, 100];
  searchKey         : string = "";
  placeHolder       : string = "Search Item";
  items             : any=[];
  num               : any =[];
  TransDateFrom     : any = new Date();
  TransDateTo       : any = new Date();
  defaultColumns: string[] = [    
    'ItemId',
    'ItemName',
    'UM',
    'Category'
  ];
  numberColumns: string[] = [  
    'Cost',
    'Price',
    'Available',
    
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
    private itemsService          : ItemsService,
    private dialog                : MatDialog,
    private notificationsService  : NotificationsService,
    private toolBoxService            : ToolBoxService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.GetItems();
    this.itemsService.RequiredRefresh.subscribe(() =>{
      this.GetItems();
    })
  }
  toastMessage(){
    // this.notificationsService.toastrSuccess("TOAST SUCCESS");
    // this.notificationsService.toastrError("TOAST ERROR");
    // this.notificationsService.toastrInfo("TOAST INFO");
    // this.notificationsService.toastrWarning("TOAST WARNING");
    this.num = this.searchKey;

  }

  async GetItems(){
    this.isTrue = true;
    this.items = await firstValueFrom(this.itemsService.GetItems());
    if(this.items)
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
    var items = this.items;

    this.listData = new MatTableDataSource(items);
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
    this.dialog.open(ItemUIComponent,dialogConfig);
  }

  onClickNew(){
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '600px';
    this.dialog.open(ItemUIComponent,dialogConfig);
  }
  onClickPrintReceipts(){
    var url = this.router.serializeUrl(
      this.router.createUrlTree(['print/printreceipts'])
    );
    var data = this.listData.filteredData;
    console.log(data)
    this.popupWindow(url, 'Items', window, 800, 800);
    localStorage.setItem('Headers', JSON.stringify(data));
    localStorage.setItem('Title', 'ITEMS RECEIPT from '+this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateFrom)) +' to '+  this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateTo)) );
    localStorage.setItem('Transaction', 'items');
  }

  popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
  }
  onClickNew2(){
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '600px';
    this.dialog.open(ItemUIComponent,dialogConfig);

  }

  onDelete(data:any){
    if(!data){
      this.notificationsService.toastrWarning('No record selected!');
      
    }
    else{
      this.notificationsService.popupWarning("Delete Item","Are you sure to delete this item?").then((result) => {
        if (result.value) {
          console.log(data);
          this.itemsService.DeleteItem(data.ItemId).subscribe({
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




