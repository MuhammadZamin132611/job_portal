/*
Name: Harish Babu
Date: 07/03/2023
What: In this components we have all the mobile number related function and method
Why: This is for verify the mobile number and send the otp on the number
*/
// 1. Import required Angular modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Observable, Subscription, catchError, switchMap } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

// 2. Import the LoginEmailService from a custom service
import { LoginEmailService } from '../../services/login-email.service';

// 3. Import Capacitor plugins for authentication 
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';

import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { callbackUri } from 'src/app/linkedin.config';

// Initialize Facebook Login Id (Note: It's not fully implemented in this code)
FacebookLogin.initialize({ appId: '494324079582441' });

//4. In this Component we defined the HTML template that represents a part of the application's UI.
@Component({
  selector: 'app-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.css']
})

export class LoginMobileComponent implements OnInit {
  // Declare class properties to store variables
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any;
  show: boolean = false;
  tick: boolean = true;
  existUser: string = '';
  divnotshow: boolean = true;
  submitted: boolean = false;
  sub: boolean = false;
  storage: string = '';
  loginForm!: FormGroup
  data: string = '';
  validation: boolean = false;
  backButtonListener: any;
  isInputValid: boolean;

  // BehaviorSubjects and observables for handling asynchronous operations and UI states
  private busy_ = new BehaviorSubject(false);
  public busy = this.busy_.asObservable();
  private busys_ = new BehaviorSubject(false);
  public busys = this.busys_.asObservable();
  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();

  // User data observable
  user$ = this.linked.isAuthenticated$.pipe(switchMap(() => this.linked.user$));
  fedemail: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private linked: AuthService, private auth: LoginEmailService) {
    // Initialize Capacitor Back Button listener
    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });

    // Initialize Google Authentication
    GoogleAuth.initialize();
    // Initialize the login form with email validation
    this.loginForm = this.formBuilder.group({
      sms: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^(\+91[ -]?)?[6789]\d{9}$/)]),
    });
    // Retrieve and store the email from local storage
    this.storage = JSON.stringify(localStorage.getItem('sms'));
  }

  // This async method to login or signup using Google
  async googleSignin() {
    const user = await GoogleAuth.signIn();
    this.divnotshow = false
    this.busys_.next(true);
    console.log('beform', user.email);
    localStorage.setItem('fedemail', user.email);
    // Check if the user exists based on the retrieved email
    this.auth.getExistUser(user.email).pipe(
      catchError(error => {
        setTimeout(() => {
          localStorage.setItem('Email', user.email);
          this.busys_.next(false);
          this.router.navigate(['/onBoarding/aboutMe']);
        }, 2000);
        return throwError(error);
      }
      )
    ).subscribe((res: any) => {
      this.existUser = res;
      this.busys_.next(false);
      this.router.navigate(['/dashboard']);

    });
    // Push email to AWS
    this.auth.emailpushaws(user.email).pipe(
      catchError((err) => {
        console.log(err)
        return ''
      })).subscribe(res => {
        this.busys_.next(false);
        console.log(res);
      });
  }

  async signOut() {
    await GoogleAuth.signOut();
  }

  // This async method to login or signup using Facebook id (Note: It's not fully implemented in this code)
  async facebooklogin() {
    const FACEBOOK_PERMISSIONS = ['email'];
    const result = await (<FacebookLoginResponse><unknown>(
      FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
    ));
    if (result.accessToken) {
      console.log(`Facebook access token is ${result.accessToken.token}`);
      this.getprofile();
    }
  }


  // linkedinFedlogin(){
  //   if(this.linked.isAuthenticated$){
  //     this.user$.subscribe(res=>{
  //       this.fedemaill=res?.email;
  //       localStorage.setItem('fedemail',this.fedemaill);
  //       this.auth.getExistUser(this.fedemaill).pipe(
  //         catchError(error => {
  //       setTimeout(()=>{ this.router.navigate(['/onBoarding/aboutMe']);
  //     },2000);
  //     return throwError(error)
  //   }
  //     )
  //       ).subscribe((res:any)=>{
  //         this.existUser=res;
  //         this.router.navigate(['/dashboard']);
  //       });
  //       this.auth.emailpushaws(this.fedemaill).pipe(
  //       catchError((err)=>{
  //   console.log(err)
  //           return ''
  //         })

  //       ).subscribe(res=>{
  //         console.log(res);
  //       });

  //     })
  //     return true;

  //   }
  //  else {
  //   return  false;
  //  }
  // }

  // This async method to login or signup using Linkedin (Note: It's not fully implemented in this code)
  loginlinkedin() {
    this.linked
      .loginWithRedirect({
        async openUrl(url: string) {
          return Browser.open({ url, windowName: '_self' });
        }
      }).subscribe();
  }

  // This async method to login or signup using Linkedin (Note: It's not fully implemented in this code)
  logoutlinkedin() {
    this.linked
      .logout({
        logoutParams: {
          returnTo: callbackUri,
        },
        async openUrl(url: string) {
          return Browser.open({ url, windowName: '_self' });
        }
      }).subscribe();
  }

  async getprofile() {
    this.divnotshow = false
    this.busys_.next(true);
    const result = await FacebookLogin.getProfile<{
      email: string;
    }>({ fields: ['email'] });
    // localStorage.setItem('fedemail',user.email);
    localStorage.setItem('fedemail', result.email);
    // Check if the user exists based on the retrieved email
    this.auth.getExistUser(result.email).pipe(
      catchError(error => {
        setTimeout(() => {
          this.busys_.next(false);
          localStorage.setItem('Email', result.email);
          this.router.navigate(['/onBoarding/aboutMe']);
        }, 2000);
        return throwError(error)
      }
      )).subscribe((res: any) => {
        this.existUser = res;
        this.busys_.next(false);
        this.router.navigate(['/dashboard']);
      });
    this.auth.emailpushaws(result.email).pipe(
      catchError((err) => {
        console.log(err)
        return ''
      })).subscribe(res => {
        this.busys_.next(false);
        console.log(res);
      });
  }


  // Function for validation
  get sms() { return this.loginForm.get('sms') }

  colour() {
    this.submitted = false;
    if (this.loginForm.invalid) {
      this.isInputValid = false;
    }
    else if (this.loginForm.valid && this.tick) {
      this.isInputValid = true;
    } else {
      this.isInputValid = false;
    }
  }

  checkTick() {
    setTimeout(() => { this.colour() })
  }

  onback() {
    if (this.loginForm.value.sms) {
      this.isInputValid = true;
      this.tick = true;
    }
  }

  // For getting email back to input field when coming back to login mobile page from otp screen
  getEmail() {
    this.loginForm.setValue({ sms: this.storage.slice(4, 14) });
    this.onback();
  }

  // Is a event method call when the component initializes
  ngOnInit(): void {
    // App.addListener("backButton",()=>{
    //   if(window.confirm("Do you want to exit App"))
    //   {
    //     App.exitApp();
    //   }

    // })

    this.getEmail();
    //linkden
    // this.linkedinFedlogin();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';
      this.connectionStatus = 'online';
      setTimeout(() => {
        this.connectionStatusMessage = '';
        this.connectionStatus = '';
      }, 2000);
    }));
    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'No internet connection! ';
      this.connectionStatus = 'offline';

      console.log('Offline...');
    }));

  }

  screenhide1() {
    if (this.connectionStatus == 'true') {
      this.buttonName = 'Hide';
    }
  }

  ngOnDestroy(): void {
    this.backButtonListener.remove();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // Action this is to validate the proceed button 
  onSubmit() {
    this.sub = true;
    if (this.loginForm.invalid) {
      this.isInputValid;
      return
    }
    else if (this.loginForm.valid && !this.tick) {
      this.submitted = true;
      console.log(this.isInputValid)
      return
    } else {

      console.log('+91' + this.loginForm.value.sms)
      // this.doLogin();
      this.signIn();
    }
  }

  // This async method to login or signup using Mobile number
  public async signIn() {
    this.busy_.next(true);
    try {
      await this.auth.signInMobile('+91' + this.loginForm.value.sms);
      this.router.navigate(['/otpVerification']);
      localStorage.setItem("sms", '+91' + this.loginForm.value.sms);
    } catch (err: any) {
      this.auth.signUpMobile('+91' + this.loginForm.value.sms);
      this.router.navigate(['/otpVerification']);
      localStorage.setItem("sms", '+91' + this.loginForm.value.sms);
    }
    finally {
      this.busy_.next(false);
    }
  }

  
  phoneNumber = '917694075767';
  message = 'Hello';
  openWhatsApp() {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank');
  }
  screenhide() {
  }
}



