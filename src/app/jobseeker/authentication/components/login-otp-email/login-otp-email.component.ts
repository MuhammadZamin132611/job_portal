
/*
Name: Harish Babu
Date: 28/02/2023
What: In this components we are getting opt on the input box and verifying it
Why: To verify the opt with the given email address
*/
// 1. Import required Angular modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

// 2. Import the LoginEmailService from a custom service
import { LoginEmailService } from '../../services/login-email.service';

// 3. Import Capacitor plugins for authentication 
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { App } from '@capacitor/app';

// Initialize Facebook Login Id (Note: It's not fully implemented in this code)
FacebookLogin.initialize({ appId: '494324079582441' });

//4. In this Component we defined the HTML template that represents a part of the application's UI.
@Component({
  selector: 'app-login-otp-email',
  templateUrl: './login-otp-email.component.html',
  styleUrls: ['./login-otp-email.component.css']
})

export class LoginOtpEmailComponent implements OnInit {
  // Declare class properties to store variables
  otp: string;
  data = localStorage.getItem('Email');
  answer: string;
  existUser: string = '';
  // BehaviorSubjects and observables for handling asynchronous operations and UI states
  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();
  private busy_ = new BehaviorSubject(false);
  public busy = this.busy_.asObservable();
  // Configuration for OTP input
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '56px',
      'height': '40px',
      // 'border':'2px solid #D0D5DD',
      'border-radius': '8px',
      'outline': 'none'
    },
    inputClass: 'each_input',
  };

  // Variables for managing OTP resend and display
  secondemail: any;
  display: any;
  resendtime: boolean = false;
  isInputValid: boolean;
  backButtonListener: any;

  constructor(private auth: LoginEmailService, private router: Router) {
    // Initialize Google Authentication
    GoogleAuth.initialize();
    // Retrieve and store SMS data from local storage
    this.secondemail = localStorage.getItem("Email");
    // Initialize Capacitor Back Button listener
    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });
  }

  // Lifecycle hook called when the component is destroyed
  ngOnDestroy() {
    this.backButtonListener.remove();
  }
  // Lifecycle hook called when the component is initialized
  ngOnInit(): void {
    this.timer(1);
  }

  // Function for Google sign-in
  async googleSignin() {
    const user = await GoogleAuth.signIn();
    console.log('beform', user.email);
    localStorage.setItem('fedemail', user.email);
    // Check if the user exists based on the retrieved email
    this.auth.getExistUser(user.email).pipe(
      catchError(error => {
        setTimeout(() => {
          localStorage.setItem('Email', user.email);
          this.router.navigate(['/onBoarding/aboutMe']);
        }, 2000);
        return throwError(error);
      }
      )
    ).subscribe((res: any) => {
      this.existUser = res;
      this.router.navigate(['/dashboard']);

    });
    // Push email to AWS
    this.auth.emailpushaws(user.email).pipe(
      catchError((err) => {
        console.log(err)
        return ''
      })).subscribe(res => {
        console.log(res);
      });
  }

  // Function for Facebook login
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

  // Function to get Facebook profile data
  async getprofile() {
    const result = await FacebookLogin.getProfile<{
      email: string;
    }>({ fields: ['email'] });
    // localStorage.setItem('fedemail',user.email);
    localStorage.setItem('fedemail', result.email);
    // Check if the user exists based on the retrieved email
    this.auth.getExistUser(result.email).pipe(
      catchError(error => {
        setTimeout(() => {
          localStorage.setItem('Email', result.email);
          this.router.navigate(['/onBoarding/aboutMe']);
        }, 2000);
        return throwError(error)
      })).subscribe((res: any) => {
        this.existUser = res;
        this.router.navigate(['/dashboard']);
      });
    this.auth.emailpushaws(result.email).pipe(
      catchError((err) => {
        console.log(err)
        return ''
      })).subscribe(res => {
        console.log(res);
      });
  }

  // Function to sign out from Google
  async signOut() {
    await GoogleAuth.signOut();
  }

  // Timer for OTP resend
  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 30;
    let textSec: any = "0";
    let statSec: number = 30;
    const prefix = minute < 10 ? "0" : "";
    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 29;
      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;
      this.display = `${prefix}${Math.floor(seconds / 30)}:${textSec}`;
      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
        this.resendtimef();
      }
    }, 1000);
  }

  // Resend OTP function
  resendtimef() {
    this.resendtime = true;
  }

  // Function called when OTP input changes
  onOtpChange(otp: any) {
    this.answer = otp;
    if (this.answer.length == 4) {
      this.isInputValid = true;
      this.submit();
    }
    else {
      this.isInputValid = false;
    }
  }
 
  // Function to handle form submission
  public async submit() {
    try {
      this.busy_.next(true);
      const loginSucceeded = await this.auth.answerCustomChallenge(this.answer);
      console.log(this.answer.length);
      console.log(loginSucceeded);
      if (loginSucceeded) {
        this.router.navigate(['/processing']);
      } else {
        this.errorMessage_.next('Incorrect OTP. Please enter correct OTP');
        setTimeout(() => {
          this.errorMessage_.next('')
        }, 3000);
      }
    } catch (err: any) {
      this.errorMessage_.next('Please enter OTP');
      setTimeout(() => {
        this.errorMessage_.next('')
      }, 3000);
    } finally {
      this.busy_.next(false);
    }
  }

// Function to handle sign-in with Email
  public async signIn() {
    this.busy_.next(true);
    this.errorMessage_.next('');
    try {
      await this.auth.signInEmail(this.secondemail);
      this.resendtime = false;
      this.timer(1);
      // this.router.navigate(['/verify']);
      // localStorage.setItem("email",this.email.value);
    } catch (err: any) {
      this.errorMessage_.next(err.message || err);
    } finally {
      this.busy_.next(false);
    }
  }
}
