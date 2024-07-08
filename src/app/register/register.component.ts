import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpForm: FormGroup;
  hidePassword = true;
  loading     : boolean = false;
  btnSave     : string = "Register";
 
  constructor(private fb: FormBuilder,private authService:AuthService,private notificationService:NotificationsService) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // onSubmit(){
  //   console.log(this.signUpForm);
  //   this.authService.register(this.signUpForm).subscribe({
    
  //     next:(res)=>{
       
  //      this.notificationService.popupSwalMixin("Successfuly Saved."+ res);
  //     },
  //     error:(err)=> {
  //       this.notificationService.toastrError(err.error);
  //     },
  //   });
  // }
  // onSubmit() {
  //   if (this.signUpForm.valid) {
  //     //console.log(this.signUpForm)
  //     this.authService.register(this.signUpForm).subscribe({
    
  //       next:(res)=>{
         
  //        this.notificationService.popupSwalMixin("Successfuly Saved."+ res);
  //       },
  //       error:(err)=> {
  //         this.notificationService.toastrError(err.error);
  //       },
  //     });
  //   }
  //  }
  onSubmit() {
    if (this.signUpForm.valid) 
      {
        this.authService.register(this.signUpForm.getRawValue()).subscribe({
          next: (res) => {
            this.notificationService.popupSwalMixin("Successfully Saved. " + res.message);
          },
          error: (err) => {
            this.notificationService.toastrError(err.error.message);
          },
        });
     }
  }

}
