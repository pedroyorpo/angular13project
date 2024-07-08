import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/Files/items.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { SalesTransactionService } from 'src/app/services/Sales/sales-transaction.service';

@Component({
  selector: 'app-selected-sale-detail-ui',
  templateUrl: './selected-sale-detail-ui.component.html',
  styleUrls: ['./selected-sale-detail-ui.component.css']
})
export class SelectedSaleDetailUIComponent implements OnInit {
  SaleDetail : any;
  Item : any;
  btnSave : string = "Save";
  loading : boolean = false;
  SaleDetailForm = new FormGroup({
  id : new FormControl(''),
  ItemId : new FormControl(''),
  ItemName : new FormControl(''),
  UM : new FormControl(''),
  Category : new FormControl(''),
  Available : new FormControl(''),
  Cost : new FormControl(''),
  AveCost : new FormControl(''),
  Price : new FormControl(''),
  PriceType : new FormControl(''),
  Qty : new FormControl(''),
  EquivalentQty : new FormControl(''),
  Discount : new FormControl(''),
  DiscountValue : new FormControl(''),
  DiscountType : new FormControl(''),
  Amount : new FormControl(''),
  ReceiptNo : new FormControl(''),
  });
  constructor(
  private dialog : MatDialog,
  private dialogRef : MatDialogRef<SelectedSaleDetailUIComponent>,
  private item_service : ItemsService,
  private st_service : SalesTransactionService,
  private notif : NotificationsService,
  @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update
  ) { }
async ngOnInit(): Promise<void> {
if (this.data) {
this.SaleDetail = this.data[0];
this.Item = this.data[1];
console.log(this.Item);
if (this.data[0]) {
this.btnSave = "Update";
}
else{
this.btnSave = "Save";
}
this.GetSaleDetailFormData();
}
}
GetSaleDetailFormData(){
this.SaleDetailForm.controls['ItemId'].setValue(this.Item.ItemId);
this.SaleDetailForm.controls['ItemName'].setValue(this.Item.ItemName);
this.SaleDetailForm.controls['UM'].setValue(this.Item.UM);
this.SaleDetailForm.controls['Category'].setValue(this.Item.Category);
this.SaleDetailForm.controls['Available'].setValue(this.Item.Available);
this.SaleDetailForm.controls['Cost'].setValue(this.Item.Cost);
if (this.data[0]) {
this.SaleDetailForm.controls['id'].setValue(this.SaleDetail.id);
this.SaleDetailForm.controls['Price'].setValue(this.SaleDetail.Price);
this.SaleDetailForm.controls['Qty'].setValue(this.SaleDetail.Qty);
this.SaleDetailForm.controls['Discount'].setValue(this.SaleDetail.Discount);
this.SaleDetailForm.controls['DiscountValue'].setValue(this.SaleDetail.DiscountValue);
this.SaleDetailForm.controls['DiscountType'].setValue(this.SaleDetail.DiscountType);
this.SaleDetailForm.controls['ReceiptNo'].setValue(this.SaleDetail.ReceiptNo);

}
else{
this.SaleDetailForm.controls['Price'].setValue(this.Item.Price);
this.SaleDetailForm.controls['Qty'].setValue(1);
this.SaleDetailForm.controls['Discount'].setValue(0);
this.SaleDetailForm.controls['DiscountValue'].setValue(0);
this.SaleDetailForm.controls['DiscountType'].setValue('percent');
if (this.data[2]) {
this.SaleDetailForm.controls['ReceiptNo'].setValue(this.data[2]);
}
}
this.ComputeAmount();
}
ComputeAmount(){
var Discount = this.SaleDetailForm.controls['Discount'].value;
var DiscountValue = this.SaleDetailForm.controls['DiscountValue'].value;
var DiscountType = this.SaleDetailForm.controls['DiscountType'].value;
var Price = this.SaleDetailForm.controls['Price'].value;
var Qty = this.SaleDetailForm.controls['Qty'].value;
var RegAmount = (Price * Qty);
if(DiscountType.toLocaleLowerCase() == 'percent'){
Discount = (RegAmount * DiscountValue/100);
RegAmount = RegAmount - Discount
Discount = Discount/Qty;
}
else{Discount = DiscountValue;
  RegAmount = RegAmount - Discount;
  }
  this.SaleDetailForm.controls['Discount'].setValue(Number(Discount).toFixed(2));
  this.SaleDetailForm.controls['Amount'].setValue(Number(RegAmount).toFixed(2));
  }
  ValidateForm(){
  this.onSubmit();
  }
  
  onSubmit(){
  this.loading = true;
  this.st_service.UpdateSaleDetail(this.SaleDetailForm.getRawValue()).subscribe({
  next:(res)=>{
  this.notif.toastrSuccess(res.message);
  this.dialogRef.close();
  this.loading = false;
  },
  error:(err)=>{
  this.notif.toastrError(err.error.message);
  this.loading = false;
  },
  });
}

}
