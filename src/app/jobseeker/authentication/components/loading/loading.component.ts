/*
Name: Harish Babu
Date: 22/02/2023
What: In this components we have used angular components and necessary modules of Jobcheck components
Why: This is load the screen till the opt process was not completed
*/

// 1. Import required Angular modules
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// 2. Import the LoginEmailService from a custom service
import { LoginEmailService } from '../../services/login-email.service';

//3. In this Component we defined the HTML template that represents a part of the application's UI.
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoadingComponent implements OnInit {
  // Declare class properties to store variables
  gmail: any;
  sms: any;
  existUser1: string = '';

  // Define BehaviorSubjects and FormGroups
  private userDetails_ = new BehaviorSubject(undefined);
  public userDetails = this.userDetails_.asObservable();
  public userDetailsForm = new FormGroup({});
  private busy_ = new BehaviorSubject(true);
  public busy = this.busy_.asObservable();
  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();

  // 4. A class constructor with the neccessary injector like login email service, router, etc
  constructor(private auth: LoginEmailService, private router: Router, private http: HttpClient) {
    // Initialize variables from local storage
    this.gmail = localStorage.getItem('Email');
    this.sms = localStorage.getItem('sms');

  }

  ngOnInit() {
    // Call the getUserDetails method when the component initializes
    this.getUserDetails();
  }

  public async getUserDetails() {
    // Set busy flag and clear error message
    this.busy_.next(true);
    this.errorMessage_.next('');
    try {
      // Retrieve user details from the auth service
      const userDetails: any = await this.auth.getUserDetails();
      const list = (userDetails[2].Value);
      // Check if the user exists based on the retrieved details
      this.auth.getExistUser(list).pipe(
        catchError(error => {
          // Redirect to '/onBoarding/aboutMe' if the user is not found
          this.router.navigate(['/onBoarding/aboutMe']);
          return throwError('no user found');
        }))
        .subscribe((res: any) => {
          // Store the profileId and navigate to '/dashboard' if the user is found
          this.existUser1 = res.profileId;
          this.router.navigate(['/dashboard']);
        })
    }
    catch (err: any) {
      // this.errorMessage_.next(err.message || err);
    }
    finally {
      // Set busy flag to false
      this.busy_.next(false);
    }
  }
}
