import {Component} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { Router } from '@angular/router';


/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  loginForm: FormGroup;
  hidePassword: any;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService:NotificationsService,
    private router: Router,
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit() 
  {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.notificationService.popupSwalMixin(res.message);
          this.router.navigate(['/navbar/dashboard']); // Redirect to login if no token found
      },
      error: (err) => {
        this.notificationService.toastrError(err.error.error.message);
      }
    });
  }
  Reset()
  {
    this.loginForm.controls['email'].setValue('');
    this.loginForm.controls['password'].setValue('');
    
   
  }

}
