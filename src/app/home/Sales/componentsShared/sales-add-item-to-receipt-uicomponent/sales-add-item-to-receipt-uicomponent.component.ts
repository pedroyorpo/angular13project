import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ItemsService } from 'src/app/services/Files/items.service';

@Component({
  selector: 'app-sales-add-item-to-receipt-uicomponent',
  templateUrl: './sales-add-item-to-receipt-uicomponent.component.html',
  styleUrls: ['./sales-add-item-to-receipt-uicomponent.component.css']
})
export class SalesAddItemToReceiptUIComponentComponent implements OnInit {

  Items           : any;
  pageSizeOptions : number[] = [5, 10, 25, 100];
  searchKey       : string = "";
  listData        : MatTableDataSource<any>;
  IsTrue          : boolean = false;  
  SelectedId      : any;
  SelectedData    : any;
  SelectedItem: any;
  Barcodes: any;
  Detail : any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'ItemName',
    'Category',
    'UM',
    'Price',
    'Cost',
    'Available',
  ];
  Transaction: any;
  Name: any;
  
 
  constructor(
    private itemsService  : ItemsService,
    private dialog          : MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update

  ) { }

  ngOnInit(): void {
    this.Detail = this.data[0];
    this.Transaction = this.data[1];

    if(this.Transaction == 'sales'){
      this.Name = this.Detail.CustomerName;
    }

    this.GetItems();
  }

  async GetItems(){
    this.IsTrue = true;
    this.Items  = await firstValueFrom(this.itemsService.GetItems());
    this.Items  = this.Items.filter(x => x.RecordStatus == 'active');
    if(this.Items)
      this.IsTrue = false;
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
    var data = this.Items;

    this.listData = new MatTableDataSource(data);
    this.listData.paginator = this.paginator;
  }
  getRecord(data : any){
    this.SelectedId = data.id;
    this.SelectedData = data;
  }
  async PopUpPrice(){
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '500px';

    if(!this.SelectedId){
      this.SelectedItem = this.Items.filter(x => x.ItemName.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase()));
      this.SelectedItem = this.SelectedItem[0];
      this.SelectedItem         = await firstValueFrom(this.itemsService.GetItemsByItemId(this.SelectedItem.ItemId));
    }
    else{
      this.SelectedItem         = await firstValueFrom(this.itemsService.GetItemsByItemId(this.SelectedData.ItemId));
    }
    
    dialogConfig.data         = (['', this.SelectedItem, this.Detail.ReceiptNo]);
  
    // if(this.Transaction == 'sales'){
    // //  this.dialog.open(SelectedSaleDetailUIComponent,dialogConfig).beforeClosed().subscribe(()=>{
    //     this.searchKey = undefined;
    //   });
    // }
  }


}
