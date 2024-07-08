import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/Files/items.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';


@Component({
  selector: 'app-item-ui',
  templateUrl: './item-ui.component.html',
  styleUrls: ['./item-ui.component.css']
})
export class ItemUIComponent implements OnInit {

  btnSave     : string = "Save";
  loading     : boolean = false;
  ItemForm = new FormGroup({
              id        : new FormControl(''),
              ItemId    : new FormControl('generated'),
              ItemName  : new FormControl(''),
              Cost      : new FormControl(0),
              Price     : new FormControl(0),
              Available : new FormControl(0),
              UM        : new FormControl(''),
              Category  : new FormControl(''),
  });
  Item: any;

  constructor(
    private dialog            : MatDialog,
    private dialogRef         : MatDialogRef<ItemUIComponent>,
    private itemsService      : ItemsService,
    private notificationService   : NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update

  ) { }
  ngOnInit(): void {
    if (this.data) {
      this.Item = this.data;
      this.btnSave = "Update";
      this.ItemForm.controls['ItemId'].disable();
      this.GetItemFormData();
    }else{
      this.onCheck(true);
    }
  }


  
  GetItemFormData(){
    if(this.data.id){
      this.ItemForm.controls['id'].setValue(this.data.id);
      this.ItemForm.controls['ItemId'].setValue(this.data.ItemId);
    }

    this.ItemForm.controls['ItemName'].setValue(this.data.ItemName);
    this.ItemForm.controls['Cost'].setValue(this.data.Cost);
    this.ItemForm.controls['Price'].setValue(this.data.Price);
    this.ItemForm.controls['Available'].setValue(this.data.Available);
    this.ItemForm.controls['UM'].setValue(this.data.UM);
    this.ItemForm.controls['Category'].setValue(this.data.Category);
  }

  onSubmit(){
   
    this.loading = true;
    this.itemsService.SaveEditItems(this.ItemForm.getRawValue()).subscribe({
      next:(res)=>{
   ///     this.notificationService.TO(res.message);
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
  


  ResetForm(){
    this.ItemForm.controls['id'].setValue('');
    this.ItemForm.controls['ItemId'].setValue('');
    this.ItemForm.controls['ItemName'].setValue('');
    this.ItemForm.controls['Cost'].setValue('');
    this.ItemForm.controls['Price'].setValue('');
    this.ItemForm.controls['Available'].setValue('');
    this.ItemForm.controls['UM'].setValue('');
    this.ItemForm.controls['Category'].setValue('');
    
  }
  onCheck(data: any) {
    if (data) {
      this.ItemForm.controls['ItemId'].disable();
      this.ItemForm.controls['ItemId'].setValue('generated');
    }
    else {
      this.ItemForm.controls['ItemId'].enable();
      this.ItemForm.controls['ItemId'].setValue('');
    }
  }


}
