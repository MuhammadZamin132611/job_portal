/*
Name: Harish Babu
Date: 15/02/2023
What: In this components we imported authentication module's components
Why: Mainly used to give routing to each components
*/
// 1. Import required Angular modules 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 2. Import Jobcheck Components and authentication guards
import { IsAuthenticated, IsNotAuthenticated } from 'src/app/authentication.guard';
import { AuthLandingComponent } from './components/auth-landing/auth-landing.component';
import { AuthProcessingComponent } from './components/auth-processing/auth-processing.component';
import { AuthVerifiedComponent } from './components/auth-verified/auth-verified.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginEmailComponent } from './components/login-email/login-email.component';
import { LoginMobileComponent } from './components/login-mobile/login-mobile.component';
import { LoginOtpEmailComponent } from './components/login-otp-email/login-otp-email.component';
import { LoginOtpMobileComponent } from './components/login-otp-mobile/login-otp-mobile.component';

// 3. Define the routing configuration
const routes: Routes = [
  { path: '', component: AuthLandingComponent, canActivate: [IsNotAuthenticated] },
  { path: 'loginMobile', component: LoginMobileComponent, canActivate: [IsNotAuthenticated] },
  { path: 'otpVerification', component: LoginOtpMobileComponent, canActivate: [IsNotAuthenticated] },
  { path: 'verify', component: AuthVerifiedComponent, canActivate: [IsAuthenticated] },
  { path: 'loginEmail', component: LoginEmailComponent, canActivate: [IsNotAuthenticated] },
  { path: 'emailVerification', component: LoginOtpEmailComponent, canActivate: [IsNotAuthenticated] },
  { path: 'processing', component: AuthProcessingComponent, canActivate: [IsAuthenticated] },
  { path: 'loading', component: LoadingComponent, canActivate: [IsAuthenticated] },


];

// 4. Define a NgModule for the AuthenticationRoutingModule
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
