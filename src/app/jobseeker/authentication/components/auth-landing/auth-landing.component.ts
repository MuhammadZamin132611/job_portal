/*
Name: Harish Babu 
Date: 15/02/2023
What: This is the controller ts file for authentication landing in job seeker.
Why: This is provided to login and onboard themselves on the App
 */

//1. Import Angular Framworks
import { OnInit, Component } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { switchMap, catchError, throwError } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

//2.Imports - JobCheck Services
import { LoginEmailService } from '../../services/login-email.service';
import { AuthlandingService } from '../../services/authlanding.service';

//3. Plugins of Ionic capacitor 
import { Plugins } from '@capacitor/core';
import { App } from '@capacitor/app';
const { StatusBar } = Plugins;

//4. In this Component we defined the HTML template that represents a part of the application's UI.
@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})

//5. This class represents the component with form elements and actions to direct to the login page
export class AuthLandingComponent implements OnInit {
  current = 0;
  errorMsgOfSpecialization: string;
  img_list = [
    'assets/images/deliveryboy.svg',
    'assets/images/engineer.svg',
    'assets/images/teacher.svg',
    'assets/images/Operator.svg',
    'assets/images/fresher.svg',
  ];
  userSelectedLanguages: any[] = [];
  selectedLanguages: string[] = []
  Language: any = ' ';
  searchLanguage: string[] = [...this.Language];
  queryLanguage: string = '';
  errorMsgOflanguage: string;
  selectedLanguage: string = "English";
  backButtonListener: any;
  user$ = this.linked.isAuthenticated$.pipe(switchMap(() => this.linked.user$));
  fedemaill: any = '';

  //6. A class constructor with the neccessary injector like authlandingservice, login email service etc
  constructor(private location: AuthlandingService, private linked: AuthService, private auth: LoginEmailService, private router: Router) {
    StatusBar['setStyle']({ style: 'light' });
    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });
  }

  // To close the app using this back button command
  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  //7. Is a event method
  ngOnInit(): void {
    this.linkedinFedlogin();

    let profileId = localStorage.getItem('profileID');
    setInterval(() => {
      this.current = ++this.current % this.img_list.length;
    }, 2000);
    if (profileId) {
      this.router.navigate(['/dashboard'])
    }
    this.getLanguage()
  }

  // Action for changing the images on landing screen
  animationChange(number: number) {
    this.current = number;
  }

  // Action for selecting the language in input field
  onClickLanguage(e: any) {
    this.selectedLanguage = e
  }

  // For language Popup this feature is Removed
  getLanguage() {
    this.location.getLanguage().subscribe((data) => {
      this.Language = data;
      this.searchForlanguage();
    });
  }

// To search the language this feature is removed
  searchForlanguage() {
    this.searchLanguage = this.Language.filter((data: any) => {
      return data.toLowerCase().includes(this.queryLanguage.toLowerCase());
    });
    if (this.searchLanguage.length == 0) {
      this.errorMsgOflanguage = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflanguage = '';
    }
  }

  //Function for Linkedin integration for back button Pending
  existUser: string = '';
  linkedinFedlogin() {
    if (this.linked.isAuthenticated$) {
      this.user$.subscribe(res => {
        this.fedemaill = res?.email;
        if (this.fedemaill == undefined) {
          // localStorage.setItem('fedemail',this.fedemaill);
        }
        else {
          localStorage.setItem('fedemail', this.fedemaill);
        }
        this.auth.getExistUser(this.fedemaill).pipe(
          catchError(error => {
            this.router.navigate(['/onBoarding/aboutMe'])
            //   setTimeout(()=>{ this.router.navigate(['/onBoarding/aboutMe']);
            // },2000);
            return throwError(error)
          })).subscribe((response: any) => {
            this.existUser = response;
            this.router.navigate(['/dashboard']);
          });
        this.auth.emailpushaws(this.fedemaill).pipe(
          catchError((err) => {
            console.log(err)
            return ''
          })
        ).subscribe(response => {
          console.log(response);
        });
      })
      return true;
    }
    else {
      return false;
    }
  }
}
