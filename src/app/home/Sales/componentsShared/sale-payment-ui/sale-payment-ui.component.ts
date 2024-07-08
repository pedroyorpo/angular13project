import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { ToolBoxService } from 'src/app/services/Global/tool-box.service';
import { SalesTransactionService } from 'src/app/services/Sales/sales-transaction.service';

@Component({
  selector: 'app-sale-payment-ui',
  templateUrl: './sale-payment-ui.component.html',
  styleUrls: ['./sale-payment-ui.component.css']
})
export class SalePaymentUIComponent implements OnInit {
  btnSave                       : string = "Save";
  Customer                      : any=[];
  SaleHeader                    : any=[];
  RecordStatus                  : string = 'update';
  loading                       : boolean = false;
  PaymentType                   : string  = 'CASH';
  SalePaymentForm       = new FormGroup({
    ReceiptNo           : new FormControl(''),
    TransNo             : new FormControl(''),
    TransDate           : new FormControl(),
    CustomerId          : new FormControl(''),
    CustomerName        : new FormControl(''),
    TotalAmount         : new FormControl('0'),
    DiscountType        : new FormControl(''),
    DiscountValue       : new FormControl(''),
    Discount            : new FormControl(''),
    TotalDue            : new FormControl(''),
    AmountPaid          : new FormControl(''),
    Change              : new FormControl(''),
    PaymentType         : new FormControl('CASH'),
  });
  
  constructor(
    private dialogRef         : MatDialogRef<SalePaymentUIComponent>,
    private st_service        : SalesTransactionService,
    private notif             : NotificationsService,
    private toolbox_service   : ToolBoxService,
    @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update
  ) { }

  async ngOnInit(): Promise<void> {
  
    if(this.data){  
      this.SaleHeader   = this.data[0];
      this.Customer     = this.data[1];
      this.RecordStatus = this.data[2];

      if(this.SaleHeader.RecordStatus == 'pending' ){
        this.btnSave = 'Save';
        this.GetSalePaymentForm();
        this.onCheck(true);
      }
      else{
        this.btnSave = 'Update';
        this.GetSalePaymentForm();
      }
    }
  }

  GetSalePaymentForm(){
    if(this.SaleHeader.TransStatus == 'ongoing'){
      this.SalePaymentForm.controls['ReceiptNo'].setValue('generated');
    }

    if(this.SaleHeader.TransStatus == 'finish'){
      this.SalePaymentForm.controls['ReceiptNo'].setValue(this.SaleHeader.ReceiptNo);
      this.SalePaymentForm.controls['TransDate'].setValue(this.toolbox_service.ConvertToDateFormat(new Date(this.SaleHeader.TransDate)) );
      this.SalePaymentForm.controls['PaymentType'].setValue(this.SaleHeader.PaymentType);
      this.SalePaymentForm.controls['AmountPaid'].setValue(this.SaleHeader.AmountPaid);
      if(this.SaleHeader.Discount > 0)
        this.onCheck1(true);
    }

    this.SalePaymentForm.controls['TransNo'].setValue(this.SaleHeader.TransNo);
    this.SalePaymentForm.controls['TransDate'].setValue(this.toolbox_service.ConvertToDateFormat(new Date(this.SaleHeader.TransDate)) );
    this.SalePaymentForm.controls['CustomerId'].setValue(this.Customer.CustomerId);
    this.SalePaymentForm.controls['CustomerName'].setValue(this.Customer.CustomerName);
    this.SalePaymentForm.controls['TotalAmount'].setValue((Number(this.SaleHeader.TotalAmount).toFixed(2)));
    this.SalePaymentForm.controls['Discount'].setValue(this.SaleHeader.Discount);
    this.SalePaymentForm.controls['DiscountValue'].setValue(this.SaleHeader.DiscountValue);
    this.SalePaymentForm.controls['DiscountType'].setValue(this.SaleHeader.DiscountType);
    this.ComputeTotalDue();
  }

  ComputeTotalDue(){
    var Discount:number      =this.SalePaymentForm.controls['Discount'].value;
    var DiscountValue:number =this.SalePaymentForm.controls['DiscountValue'].value;
    var DiscountType:string  =this.SalePaymentForm.controls['DiscountType'].value;
    var TotalAmount:number   =this.SalePaymentForm.controls['TotalAmount'].value;

    if(DiscountType == 'percent'){
          Discount  = (TotalAmount * DiscountValue/100);
    }
    else{
          Discount  = DiscountValue;
    }
    var TotalDue  = TotalAmount - Discount;

    this.SalePaymentForm.controls['Discount'].setValue(Number(Discount).toFixed(2));
    this.SalePaymentForm.controls['TotalDue'].setValue(Number(TotalDue).toFixed(2));
    this.ComputeChange();
  }

  ComputeChange(){
    var AmountPaid          = this.SalePaymentForm.controls['AmountPaid'].value;
    var TotalDue            = this.SalePaymentForm.controls['TotalDue'].value;
    var Change              = +AmountPaid - +TotalDue;
    this.SalePaymentForm.controls['Change'].setValue(Number(Change).toFixed(2));
  }

  onCheck1(check){
    if(check == true){
      this.SalePaymentForm.controls['DiscountType'].setValue('percent');
    }else{
      this.SalePaymentForm.controls['DiscountType'].setValue('amount');
    }
    this.ComputeTotalDue();
  }

  ValidateForm(){
    var TransDate               = this.toolbox_service.ConvertToDateFormat(new Date(this.SalePaymentForm.controls['TransDate'].value)) ;
    var CurrenDate              = this.toolbox_service.ConvertToDateFormat(new Date());
    var AmountPaid:number       = this.SalePaymentForm.controls['AmountPaid'].value;
    var TotalDue:number         = this.SalePaymentForm.controls['TotalDue'].value;
    var PaymentType             = this.SalePaymentForm.controls['PaymentType'].value;

    if (TransDate > CurrenDate){
      return this.notif.toastrWarning('Transaction Date must not be greater than current date.');
    }

    if (TotalDue > AmountPaid && PaymentType == 'CASH')
    {
      return this.notif.toastrWarning('Payment Should be greater than TotalDue.');
    }

    this.onSubmit();
  }

  onSubmit(){
    this.loading = true;
    this.SalePaymentForm.controls['TransDate'].setValue(this.toolbox_service.ConvertToDateFormat(this.SalePaymentForm.controls['TransDate'].value));
    console.log()
    this.st_service.UpdateSaleHeader(this.SalePaymentForm.getRawValue(), this.RecordStatus).subscribe({
      next:(res)=>{
        this.notif.toastrSuccess(res.message);
        this.dialogRef.close();
        this.loading = false;
      },
      error:(err)=>{
        this.notif.toastrError(err.error);
        this.loading = false;
      },
    });
  }
 
  onCheck(data: any) {
    if (data) {
      this.SalePaymentForm.controls['ReceiptNo'].disable();
      this.SalePaymentForm.controls['ReceiptNo'].setValue('generated');
    }
    else {
      this.SalePaymentForm.controls['ReceiptNo'].enable();
      this.SalePaymentForm.controls['ReceiptNo'].setValue('');
    }
  }



}
