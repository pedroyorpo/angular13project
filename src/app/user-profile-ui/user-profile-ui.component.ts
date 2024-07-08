import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-profile-ui',
  templateUrl: './user-profile-ui.component.html',
  styleUrls: ['./user-profile-ui.component.css']
})
export class UserProfileUIComponent implements OnInit {
  email: string = '';
  users : any=[];


  constructor() { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user); // Debugging line
    if (user && user.firstName && user.lastname) {
      this.users = user.firstName + ' ' + user.lastname;
      this.email = user.email;
    } else {
      console.error('User data is not properly stored in localStorage.');
    }
   
  }

}
