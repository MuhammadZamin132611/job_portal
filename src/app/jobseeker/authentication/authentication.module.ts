/*
Name: Harish Babu
Date: 15/02/2023
What: In this components we importing necessary components
Why: Mainly used to import components modules and declared here
*/

// 1. Import required Angular modules 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';

// 2. Import the routing module for authentication
import { AuthenticationRoutingModule } from './authentication-routing.module';

// 3. Import authentication-related components
import { AuthLandingComponent } from './components/auth-landing/auth-landing.component';
import { AuthProcessingComponent } from './components/auth-processing/auth-processing.component';
import { AuthVerifiedComponent } from './components/auth-verified/auth-verified.component';
import { LoginMobileComponent } from './components/login-mobile/login-mobile.component';
import { LoginOtpMobileComponent } from './components/login-otp-mobile/login-otp-mobile.component';
import { LoginOtpEmailComponent } from './components/login-otp-email/login-otp-email.component';
import { LoginEmailComponent } from './components/login-email/login-email.component';
import { LoadingComponent } from './components/loading/loading.component';

// 4. Import the SharedModule, if available
import { SharedModule } from '../shared/shared.module';

@NgModule({
  // Declare the components that belong to this module
  declarations: [
    AuthLandingComponent,
    AuthProcessingComponent,
    AuthVerifiedComponent,
    LoginMobileComponent,
    LoginOtpMobileComponent,
    LoginOtpEmailComponent,
    LoginEmailComponent,
    LoadingComponent,

  ],
  // Import necessary modules
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    FormsModule,
    SharedModule


  ]
})
export class AuthenticationModule { }
