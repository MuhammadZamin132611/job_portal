
/*
Name: Harish Babu
Date: 28/02/2023
What: In this components we have all the email related function and method
Why: This is for verify the email and send the otp on the email
*/

// 1. Import required Angular modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, fromEvent, Observable, Subscription, catchError, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { throwError } from 'rxjs';

// 2. Import the LoginEmailService from a custom service
import { LoginEmailService } from '../../services/login-email.service';
import { callbackUri } from 'src/app/linkedin.config';

// 3. Import Capacitor plugins for authentication 
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

// Initialize Facebook Login Id (Note: It's not fully implemented in this code)
FacebookLogin.initialize({ appId: '494324079582441' });

//4. In this Component we defined the HTML template that represents a part of the application's UI.
@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})

export class LoginEmailComponent implements OnInit {
  // Declare class properties to store variables
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  tick: boolean = true;
  existUser: string = '';
  divnotshow: boolean = true;
  submitted: boolean = false;
  sub: boolean = false;
  storage: string = '';
  loginForm!: FormGroup
  backButtonListener: any;
  isInputValid: boolean = false;

  // BehaviorSubjects and observables for handling asynchronous operations and UI states
  private busy_ = new BehaviorSubject(false);
  public busy = this.busy_.asObservable();
  private busys_ = new BehaviorSubject(false);
  public busys = this.busys_.asObservable();
  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();

  // User data observable
  user$ = this.linked.isAuthenticated$.pipe(switchMap(() =>
    this.linked.user$,
  ));
  fedemaill: any;

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
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$")]),
    })
    // Retrieve and store the email from local storage
    this.storage = JSON.parse(JSON.stringify(localStorage.getItem('Email')));
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
      })).subscribe((res: any) => {
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

onEmailInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const lowercaseValue = inputElement.value.toLowerCase();
    inputElement.value = lowercaseValue;
    this.loginForm.patchValue({ email: lowercaseValue }); // Update the form control with the lowercased value
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
      })).subscribe((res: any) => {
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
  get email() {
    return this.loginForm.get('email');
  }

  colour() {
    this.submitted = false;
    console.log(this.tick)
    if (this.loginForm.invalid) {
      this.isInputValid = false;
    } else if (this.loginForm.valid && this.tick) {
      this.isInputValid = true;
    }
    else {
      this.isInputValid = false;
    }
  }

  checkTick() {
    setTimeout(() => { this.colour() })
  }

  onback() {
    if (this.loginForm.value.email) {
      this.isInputValid = true;
      this.tick = true;
    }
  }

  // Email stored in session storage
  //auto filling the email when coming back to edit the email
  getEmail() {
    this.loginForm.setValue({ email: this.storage });
    this.onback();
  }

  // To close the app using this back button command
  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  // Is a event method call when the component initializes
  ngOnInit(): void {
    // App.addListener("backButton",()=>{
    //   if(window.confirm("Do you want to exit App"))
    //   {
    //     App.exitApp();
    //   }
    //   else{

    //   }
    // })
    this.tick = true;
    this.getEmail();
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

  // Action this is to validate the proceed button 
  onSubmit() {
    this.sub = true;
    if (this.loginForm.invalid) {
      return;
    }
    else if (this.loginForm.valid && !this.tick) {
      this.submitted = true;
      console.log(this.isInputValid)
      return
    }
    else {
      // this.doLogin();
      this.signIn();
    }
  }

  // authpush(){
  //   this.auth.emailpushaws(this.loginForm.value.email)

  // }

  // This async method to login or signup using Email
  public async signIn() {
    this.busy_.next(true);
    try {
      await this.auth.signInEmail(this.loginForm.value.email);
      this.router.navigate(['/emailVerification']);
      localStorage.setItem("Email", this.loginForm.value.email);
    } catch (err: any) {
      this.auth.signUpEmail(this.loginForm.value.email);
      this.router.navigate(['/emailVerification']);
      localStorage.setItem("Email", this.loginForm.value.email);
    }
    finally {
      this.busy_.next(false);
    }
  }


}
