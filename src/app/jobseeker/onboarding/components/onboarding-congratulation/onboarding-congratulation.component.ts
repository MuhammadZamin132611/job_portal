/*
Name: Sathvik
Date: 06-10-2023
What: This is the controller ts file for the OnboardingCongratulation component.
Why: This file contains the component logic and functionality for the OnboardingCongratulation page.
*/

// Import necessary Angular and RxJS modules and services

// 1. Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 2. Imports - Angular Animations - Optional (Only if you're using animations)
import { trigger, transition, animate, style } from '@angular/animations';

// 3. Imports - Angular Forms and Form Elements - Mandatory
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// 4. Imports - RxJS - Mandatory
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';

// 5. Imports - Capacitor (for mobile app) - Mandatory
import { App } from '@capacitor/app';

// 6. Imports - JobCheck Services - Mandatory (Assuming the service is used in the component)
import { OnboardingLocationService } from '../../services/onboarding-location.service';
import { OnboardingPersonalBioService } from '../../services/onboarding-personal-bio.service';
import {notification} from '../../models/notification.model'

@Component({
  selector: 'app-onboarding-congratulation',
  templateUrl: './onboarding-congratulation.component.html',
  styleUrls: ['./onboarding-congratulation.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})

/**
 * OnboardingCongratulationComponent represents the component responsible for congratulating users
 * upon completing the onboarding process.
 *
 * This component handles online/offline events, user interactions, and navigation.
 *
 * @class OnboardingCongratulationComponent
 * @implements {OnInit}
 */
export class OnboardingCongratulationComponent implements OnInit {
  // Declare class properties
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any;
  storedsms: any = '';
  show: boolean = false;
  tick: boolean = false;
  existUser: string = '';
  backButtonListener: any;
  detailsForNotification: notification
  // Constructor
  constructor(
    private router: Router,private personalService: OnboardingPersonalBioService,
    private onboardingLocationService: OnboardingLocationService
  ) {
    // Initialize class properties
    localStorage.setItem('currentPath', window.location.pathname);
    this.storedsms = localStorage.getItem('sms');

    // Register a back button listener
    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });
    this.detailsForNotification = {} as notification
  }

  // Lifecycle hook when the component is destroyed
  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  ngOnInit(): void {
    // Initialize online and offline event observables
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    // Subscribe to online and offline events
    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
        this.connectionStatusMessage = 'Connected';
        this.connectionStatus = 'Online';

        // Clear the connection status message after 2 seconds
        setTimeout(() => {
          this.connectionStatusMessage = '';
          this.connectionStatus = '';
        }, 2000);
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.connectionStatusMessage = 'No internet connection!';
        this.connectionStatus = 'Offline';
      })
    );
  }

  // Method to delete local storage data and navigate to the dashboard
  deletinglocalstor() {
    localStorage.removeItem('profileData');
    localStorage.removeItem('skill&Education');
    localStorage.removeItem('formValues');
    localStorage.removeItem('experienceData');
    localStorage.removeItem('currentPath');
    localStorage.removeItem('LocationData');
    this.router.navigate(['/dashboard']);
    // this.SMSOnboarded();
  }

  // Method to send onboarded SMS
  // SMSOnboarded() {
  //   this.onboardingLocationService
  //     .Onboardedsms(this.storedsms)
  //     .subscribe((res) => {
  //       console.log('Successfully sent onboarded message');
  //     });
  // }

 Profiledata: any = localStorage.getItem('profileData');
  detailsForPost=JSON.parse(this.Profiledata)
  profileIDget: any=localStorage.getItem('profileID')
  
  postDataForNotification(){

    this.detailsForNotification.jobSeekerProfileId = this.profileIDget,
    this.detailsForNotification.name = this.detailsForPost.fulln,
    this.detailsForNotification.phoneNumber = this.detailsForPost.phonen,
    this.detailsForNotification.email = this.detailsForPost.emailn,
    this.personalService.TokenId(this.detailsForNotification).subscribe((res: any) => {
    console.log('Notification posted');
    console.log("dataaaa",this.detailsForNotification)
    console.log("dataaaa myutyfyhg" ,res)
    this.deletinglocalstor()
  })
  }

}
