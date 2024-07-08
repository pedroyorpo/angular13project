import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuppliersService } from 'src/app/services/Files/suppliers.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';


@Component({
  selector: 'app-suppliers-ui',
  templateUrl: './suppliers-ui.component.html',
  styleUrls: ['./suppliers-ui.component.css']
})
export class SuppliersUiComponent implements OnInit {

  btnSave     : string = "Save";
  loading     : boolean = false;
  SupplierForm = new FormGroup({
              id        : new FormControl(''),
              SupplierId    : new FormControl(''),
              SupplierName  : new FormControl(''),
              Address        : new FormControl(''),
              ContactNo  : new FormControl(''),
              ContactPerson  : new FormControl(''),
  });

  constructor(
    private dialog            : MatDialog,
    private dialogRef         : MatDialogRef<SuppliersUiComponent>,
    private suppliersService      : SuppliersService,
    private notificationService   : NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update

  ) { }

  ngOnInit(): void {
    if (this.data) {
      if(this.data.id){
        this.btnSave = "Update";
        this.SupplierForm.controls['SupplierId'].disable();
        this.GetItemFormData();
      }
    }
   
  }

  
  GetItemFormData(){
    if(this.data){
      this.SupplierForm.controls['id'].setValue(this.data.id);
      this.SupplierForm.controls['SupplierId'].setValue(this.data.SupplierId);
    }

    this.SupplierForm.controls['SupplierName'].setValue(this.data.SupplierName);
    this.SupplierForm.controls['Address'].setValue(this.data.Address);
    this.SupplierForm.controls['ContactNo'].setValue(this.data.ContactNo);
    this.SupplierForm.controls['ContactPerson'].setValue(this.data.ContactPerson);
    
  }

  onSubmit(){
   
    this.loading = true;
    this.suppliersService.SaveEditSuppliers(this.SupplierForm.getRawValue()).subscribe({
      next:()=>{
       this.notificationService.popupSwalMixin("Successfuly Saved.");
        if(this.btnSave == 'Save'){
          this.ResetForm();
          this.loading = false;
        }
        else if(this.btnSave == 'Update'){
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
      this.SupplierForm.controls['SupplierId'].disable();
      this.SupplierForm.controls['SupplierId'].setValue('generated');
    }
    else {
      this.SupplierForm.controls['SupplierId'].enable();
      this.SupplierForm.controls['SupplierId'].setValue('');
    }
  }


  ResetForm(){
    this.SupplierForm.controls['id'].setValue('');
    this.SupplierForm.controls['SupplierId'].setValue('');
    this.SupplierForm.controls['SupplierName'].setValue('');
    this.SupplierForm.controls['Address'].setValue('');
    this.SupplierForm.controls['ContactPerson'].setValue('');
    
  }

}
