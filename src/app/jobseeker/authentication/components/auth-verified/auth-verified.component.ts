

/*
Name: Harish Babu
Date: 22/02/2023
What: In this components we have used angular components and necessary modules of Jobcheck
Why: Main purpose of this is to get opt from AWS and verift it
*/

// 1. Import required Angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 2. Import the LoginEmailService from a custom service
import { LoginEmailService } from '../../services/login-email.service';

// 3. In this Component we defined the HTML template that represents a part of the application's UI.
@Component({
  selector: 'app-auth-verified',
  templateUrl: './auth-verified.component.html',
  styleUrls: ['./auth-verified.component.css']
})
export class AuthVerifiedComponent implements OnInit {
  // Declare class properties
  emailVariable: any;
  deleteVariable: any;
  emailid: any;
  phoneId: any;

  // 4. Constructor - Called when an instance of this class is created
  constructor(private auth: LoginEmailService, private router: Router) {
    this.emailVariable = sessionStorage.getItem('Email');
    this.deleteVariable = sessionStorage.getItem('sms');

  }

  ngOnInit(): void {
    // ngOnInit hook - Called after the component is initialized
  }

  // 5. Method to delete user by email
  deleteuser() {
    // Fetch user data by email
    this.auth.getExistUser(this.emailVariable).subscribe(res => {
      this.emailid = res;
      console.log(this.emailid);
      // Delete user using AWS service
      this.auth.deleteuseraws(res).subscribe(res => {
        console.log('deleted');
        // this.router.navigate(['/loginEmail']);

      });
    })
    // Clear localStorage and sessionStorage and navigate to '/loginEmail'
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/loginEmail']);
  }

  // 6. Method to delete user by phone number
  deletPhone() {
    // Fetch user data by phone number
    this.auth.getExistUser(this.deleteVariable).subscribe(res => {
      console.log(res);
      // Delete user using AWS service
      this.auth.deleteuseraws(res).subscribe(res => {
        console.log('deleted');
        // this.router.navigate(['/loginEmail']);

      });
    })
    // Clear localStorage and sessionStorage and navigate to '/loginEmail'
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/loginEmail']);
  }
}
