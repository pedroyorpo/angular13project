import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from 'src/app/services/Files/customers.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';


@Component({
  selector: 'app-customers-ui',
  templateUrl: './customers-ui.component.html',
  styleUrls: ['./customers-ui.component.css']
})
export class CustomerUIComponent implements OnInit {

  btnSave     : string = "Save";
  loading     : boolean = false;
  CustomerForm = new FormGroup({
              id        : new FormControl(''),
              CustomerId    : new FormControl(''),
              CustomerName  : new FormControl(''),
              Address      : new FormControl(''),
              ContactNo     : new FormControl(0),
            
  });

  constructor(
    private dialog            : MatDialog,
    private dialogRef         : MatDialogRef<CustomerUIComponent>,
    private customersService      : CustomersService,
    private notificationService   : NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update

  ) { }

  ngOnInit(): void {
    if (this.data) {
      if(this.data.id){
        this.btnSave = "Update";
        this.CustomerForm.controls['CustomerId'].disable();
        this.GetItemFormData();
      }
    }else{
      this.onCheck(true);
    }
   
  }

  
  GetItemFormData(){
    if(this.data.id){
      this.CustomerForm.controls['id'].setValue(this.data.id);
      this.CustomerForm.controls['CustomerId'].setValue(this.data.CustomerId);
    }

    this.CustomerForm.controls['CustomerName'].setValue(this.data.CustomerName);
    this.CustomerForm.controls['Address'].setValue(this.data.Address);
    this.CustomerForm.controls['ContactNo'].setValue(this.data.ContactNo);
   
  }

  onSubmit(){
   
    this.loading = true;
    this.customersService.SaveEditCustomers(this.CustomerForm.getRawValue()).subscribe({
      next:(res)=>{
     //   this.notificationService.toastrSuccess(res.message);
       this.notificationService.popupSwalMixin("Successfuly Saved.");
        if(this.btnSave == 'Save'){
          this.ResetForm();
          this.loading = false;
        }
        if(this.btnSave == 'Update'){
          this.notificationService.popupSwalMixin("Successfuly Updated.");
          this.dialogRef.close();
          this.loading = false;
        }
        
      },
      error:(err)=> {
        this.notificationService.toastrError(err.error);
      },
    });
  }

  onCheck(data: any) {
    if (data) {
      this.CustomerForm.controls['CustomerId'].disable();
      this.CustomerForm.controls['CustomerId'].setValue('generated');
    }
    else {
      this.CustomerForm.controls['CustomerId'].enable();
      this.CustomerForm.controls['CustomerId'].setValue('');
    }
  }


  ResetForm(){
    this.CustomerForm.controls['id'].setValue('');
    this.CustomerForm.controls['CustomerId'].setValue('');
    this.CustomerForm.controls['CustomerName'].setValue('');
    this.CustomerForm.controls['Address'].setValue('');
 
    
  }

}
