import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-ui',
  templateUrl: './user-profile-ui.component.html',
  styleUrls: ['./user-profile-ui.component.css']
})
export class UserProfileUIComponent implements OnInit {

  logout() {

    this.authService.logout(); 
    this.router.navigate(['/login']);
  
}
  userEmail: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
    this.userEmail = this.authService.getUserEmail();
  }

}
