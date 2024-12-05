

/*Name: Harish Babu
Date: 15/02/2023
Why: this component is primarily used to process user data and perform actions like fetching user details, 
profile images, and names based on provided email or phone number.
What:  It manages UI states and error handling during this process.
*/

// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// 1. Import Angular Framework and necessary modules
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// 2. Imports - JobCheck Services
import { LoginEmailService } from '../../services/login-email.service';
import { ExampleService } from 'src/app/jobseeker/dashboard/services/example.service';

// 3. In this Component we defined the HTML template that represents a part of the application's UI.
@Component({
  selector: 'app-auth-processing',
  templateUrl: './auth-processing.component.html',
  styleUrls: ['./auth-processing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AuthProcessingComponent implements OnInit {
  // Define class properties to store variables
  gmail: any;
  sms: any;
  logoutdata: string = '';
  existUser: string = '';
  verify: boolean = false;
  progressing: boolean = true;
  EmailVerify: boolean = false;
  PhoneNumberverify: boolean = false
  private userDetails_ = new BehaviorSubject(undefined);
  public userDetails = this.userDetails_.asObservable();
  public userDetailsForm = new FormGroup({});
  private busy_ = new BehaviorSubject(true);
  public busy = this.busy_.asObservable();
  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();
  existUser1: string = '';
  Data: any;
  sbucketName: string;
  imageName: any;
  IsShow: boolean;
  basicDetail: any;
  Imagedata: string;
  imageUri: string;
  letter: any;

  // 4. Constructor to initialize the class with services and retrieve values from session storage
  constructor(private auth: LoginEmailService, private router: Router, private http: HttpClient, private exampleService: ExampleService) {
    this.gmail = localStorage.getItem('Email');
    this.sms = localStorage.getItem('sms');
  }

  ngOnInit() {
    // Use a timeout to call getUserDetails after a delay
    setTimeout(() => {
      this.getUserDetails();
    }, 1000);
  }

  // 5. Method to retrieve user details
  public async getUserDetails() {
    this.busy_.next(true);
    this.errorMessage_.next('');
    try {
      // Check if the input is a phone number or an email
      if (/^\+91\d{10}$/.test(this.sms)) {
        this.PhoneNumberverify = true;
        console.log('This is a number');
      } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.gmail)) {
        this.EmailVerify = true;
        console.log('This is an email');
      } else {
        console.log('This variable is neither a number nor an email');
      }
      try {
        // Fetch user data based on phone number or email
        this.auth.getExistUser(this.sms).pipe(
          catchError(error => {
            // Handle errors and set flags
            this.progressing = false;
            this.verify = true;
            // Redirect to '/loading' after a delay
            setTimeout(() => {
              this.router.navigate(['/loading']);
            }, 2000);

            return throwError('no user found');
          }))
          .subscribe((res: any) => {
            // Handle successful response
            this.existUser1 = res.profileId;
            console.log("data", this.existUser1)
            this.progressing = false;
            this.verify = true;
            console.log(this.existUser1);
            localStorage.setItem('profileID', this.existUser1);
            this.getUserImage();
            this.getName();
            setTimeout(() => {
              this.router.navigate(['/loading']);
            }, 2000);
          })
      }
      catch {
        // Handle errors
        this.auth.getExistUser(this.gmail).pipe(
          catchError(error => {
            // Handle errors and set flags
            this.progressing = false;
            this.verify = true;
            setTimeout(() => {
              // Redirect to '/loading' after a delay
              this.router.navigate(['/loading']);
            }, 2000);

            return throwError('no user found');
          }))
          .subscribe((res: any) => {
            // Handle successful response
            this.existUser1 = res.id;
            this.progressing = false;
            this.verify = true;
            console.log(this.existUser1);
            localStorage.setItem('profileID', this.existUser1);
            this.getUserImage();
            this.getName();
            setTimeout(() => {
              this.router.navigate(['/loading']);
            }, 2000);
          })
      }
    }
    catch (err: any) {
      // Handle errors
      // this.errorMessage_.next(err.message || err);
    }
    finally {
      // Set busy flag to false
      this.busy_.next(false);
    }
  }

  // 6. Method to retrieve user image
  profileId!: string
  getUserImage() {
    this.profileId = this.existUser1
    console.log("processing profile id", this.profileId);
    this.exampleService.getImage(this.profileId).subscribe((resp: any) => {
      // Handle image retrieval
      this.Data = resp;
      this.sbucketName = "https://job-check.s3.ap-south-1.amazonaws.com/";
      this.imageName = JSON.parse(this.Data);
      localStorage.setItem("finalName", this.sbucketName + this.imageName.value)
      this.Imagedata = this.sbucketName + this.imageName.value
      this.imageUri = this.sbucketName + this.imageName.value;
      // if(typeof  this.imageName.value != 'string'){
      //   console.log('not string')
      // this.IsShow=true
      // }else{
      //   this.IsShow=false
      //   localStorage.setItem('imageUri', this.imageName.value);
      // }

    },
      (err: any) => {
        // Handle image retrieval errors
        console.log(err)
      })
  }

  // 7. Method to retrieve user name
  getName() {
    this.exampleService.apiJcProfile(this.profileId).subscribe((resp: any) => {
      // Handle name retrieval
      this.basicDetail = resp;
      this.letter = this.basicDetail.name.substr(0, 1).toUpperCase();
      localStorage.setItem("letter", this.letter);

    }
    )
  }
}


