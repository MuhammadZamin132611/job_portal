// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationEnd } from '@angular/router';
import { LoginEmailService } from './jobseeker/authentication/services/login-email.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticated implements CanActivate {
gettingemail=localStorage.getItem('fedemail')
  constructor(private auth: LoginEmailService, private router: Router) {}
endpoint:string |undefined ;

verifyemail(){
  if(this.gettingemail == null){
    return false;
  }
  else{
   return true
  }
}

allowedEndpoints(){
  
this.endpoint = location.href
// alert(this.endpoint)
  if(this.endpoint?.includes('/dashboard/job-profile')){
  return true
  }
  else
  return false
}


 

  async canActivate(): Promise<boolean> {
    if (await this.auth.isAuthenticated() || this.allowedEndpoints() || this.verifyemail()) {
      return true;
    }
    // alert(this.endpoint)
    this.router.navigate(['']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticated implements CanActivate {
  gettingemail=localStorage.getItem('fedemail')

  constructor(private auth: LoginEmailService, private router: Router) { }
  verifyemail(){
    if(this.gettingemail == null){
      return true;
    }
    else{
     return false
    }
  }
  async canActivate(): Promise<boolean> {
    if (!await this.auth.isAuthenticated() || !this.verifyemail()) {
      return true;
    }
    this.router.navigate(['/loading']);
    return false;
  }
}
