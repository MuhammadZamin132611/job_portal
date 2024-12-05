/*
Name: Sathvik
Date: 06-10-2023
Purpose: This component handles the personal bio section during the onboarding process.
Description: It collects and validates personal information such as name, email, gender, date of birth, city, and phone number.
*/

// Import necessary Angular and RxJS modules and services

// 1. Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// 2. Imports - Angular Forms - Mandatory
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// 3. Imports - JobCheck Services - Mandatory
import { OnboardingLocationService } from '../../services/onboarding-location.service';
import { OnboardingPersonalBioService } from '../../services/onboarding-personal-bio.service';
import { SharedService } from '../../services/shared.service';
import { LoginEmailService } from 'src/app/jobseeker/authentication/services/login-email.service';

// 3. Imports - JobCheck Models - Mandatory
import { dataModalNew } from '../../models/personal_bio';

// 4. Imports - RxJS - Mandatory
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
  throwError,
} from 'rxjs';

// 5. Imports - Capacitor (for mobile app) - Optional
import { App } from '@capacitor/app';
@Component({
  selector: 'app-onboarding-personal-bio',
  templateUrl: './onboarding-personal-bio.component.html',
  styleUrls: ['./onboarding-personal-bio.component.css'],
})

//6. Class - Mandatory
//Class to export a profile data. This class represents the component with form elements and actions to onboard a new candidate into the system
export class OnboardingPersonalBioComponent {
  DOBB: any;
  enterningdate: any;
  currentdate: any;
  difference: number;
  age: number;
  alerts99: string;
  backButtonListener: any;

  dob(e: any) {
    this.DOBB = new Date(e.detail.value.substring(0, 10))
      .toISOString()
      .substring(0, 10);
    this.enterningdate = this.DOBB;
    this.currentdate = new Date();
    this.difference = Math.floor(this.currentdate - this.enterningdate);
    this.age = Math.floor(this.difference / (1000 * 3600 * 24) / 365);
    if (this.age >= 18) {
      this.alerts99 = '';
    }
  }

  storedemail: string | null = '';
  storedsms: any = '';
  str: any = '';
  strsms: any = '';
  storeemail: string = '';
  isfieldeditiblephone: boolean;
  isfieldeditibleemail: boolean;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  existUser: string = '';
  Popup: any = false;
  isPopupVisible1 = false;
  isPopupVisible2 = false;

  // 7. Toggle popup for calander Start date
  togglePopup1() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }
  // 7.1 Toggle popup for calander end date
  togglePopup2() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }

  //8. Constructor - Mandatory
  constructor(
    private router: Router,
    private personalService: OnboardingPersonalBioService,
    private loginEmailService: LoginEmailService,
    private locationService: OnboardingLocationService,
    private http: HttpClient,
    private fb: FormBuilder,
    private shared: SharedService
  ) {
    this.storedemail =
      localStorage.getItem('Email') || localStorage.getItem('fedemail');
    this.storedsms = localStorage.getItem('sms');
    this.checkmail();
    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });
  }


  

  ngOnDestroy() {
    // 8.1 Remove the hardware back button listener when the component is destroyed
    this.backButtonListener.remove();
  }

  getnames() {
    this.personalBioForm.setValue({
      name: '',
      email: this.str,
      gender: '',
      dateOfBirth: '',
      city: '',
      phoneNumber: this.strsms.slice(3, 14),
    });
  }

  checkmail() {
    if (this.storedemail == null) {
      this.strsms = this.storedsms;
      this.isfieldeditiblephone = true;
    } else {
      this.str = this.storedemail;
      this.isfieldeditibleemail = true;
    }
  }

  minDate: string;
  // 9. Initialize the component
  ngOnInit() {
    // block future date

    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    this.minDate = currentDate.toISOString().split('T')[0];

    localStorage.setItem('currentPath', window.location.pathname);
    const formDataString = localStorage.getItem('profileData');
    if (formDataString !== null) {
      const parsedDataCity = JSON.parse(formDataString);
      this.tempLocation = parsedDataCity.cityn;

      this.setReactiveForm(formDataString);

      this.personalBioForm.controls['email'].valueChanges.subscribe((value) => {
        // Handle email input changes
        this.mainError = '';
      });

      this.personalBioForm.controls['phoneNumber'].valueChanges.subscribe(
        (value) => {
          // Handle phone number input changes
          this.mainError = '';
        }
      );
    } else {
      setTimeout(() => {
        this.getnames();
      }, 1000);
      this.createReactiveForm();
    }
    // 9.1 Get the list of cities for location selectio
    this.getCity();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
        this.connectionStatusMessage = 'connected';
        this.connectionStatus = 'online';
        setTimeout(() => {
          this.connectionStatusMessage = '';
          this.connectionStatus = '';
        }, 2000);
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.connectionStatusMessage = 'No internet connection! ';
        this.connectionStatus = 'offline';
      })
    );
  }
  // 9.2 Handle existing phone number check

  existingPhone(sms: any) {
    const smscheck = '+91' + sms.target.value;
    if (smscheck.length == 13) {
      this.loginEmailService
        .getExistUser(smscheck)
        .pipe(
          catchError((error) => {
            return throwError(error); // or re-throw the error to propagate it further
          })
        )
        .subscribe((data) => {
          this.personalBioForm.controls['phoneNumber'].setErrors({
            alreadyexist: true,
          });
        });
    }
  }
  // 9.3 Handle existing email check
  existingMail(Mail: any) {
    const mailcheck = Mail.target.value;
    if (mailcheck.includes('gmail.com'))
      this.loginEmailService
        .getExistUser(mailcheck)
        .pipe(
          catchError((error) => {
            return throwError(error); // or re-throw the error to propagate it further
          })
        )
        .subscribe((data) => {
          this.personalBioForm.controls['email'].setErrors({
            alreadyexistMail: true,
          });
        });
  }

  // defualt code
  b: boolean = false;
  errorMsgOfskills: string;

  close() {
    this.b = true;
  }

  // variables used
  personalBioForm!: FormGroup;
  mainLocationSend1: string; // main to send
  fulln: string;
  emailn: string;
  phonen: string; // number ?
  gendern: string;
  dataOfBirthn: string;
  cityn: string;
  errorMessageEmail: string = '';
  errorMessagePhone: string = '';
  tempLocation: string;
  firstLocationPost: string; // it will be updated and send only
  masterLocation: any = []; // copy of main location lists
  masterLocationCopy: any = [];
  searchQuery: string = '';
  isDivVisible: boolean = true;
  errorMsgOflocation: string = '';
  selectePrimaryLocation: any = ' ';
  temp4: string = '';
  myData: string = '';
  latitude: number;
  longitude: number;
  yourCityName!: string;
  phoneres: any = '';
  emailres: any = ' ';
  mainError: any = '';

  // 10.  Create the reactive form for personal information

  createReactiveForm() {
    this.personalBioForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+91[ -]?)?[6789]\d{9}$/),
          // Validators.pattern('^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$')
          Validators.minLength(10),
        ],
      ],
    });
  }

  formDataJSON: any;

  // 11. Set form field values from retrieved data
  setReactiveForm(formDataString: string) {
    //const formDataStringJSON = JSON.parse(formDataString);
    this.formDataJSON = JSON.parse(formDataString);
    const dataa = this.formDataJSON.dateOfBirthn
      .slice(0, 10)
      .replace('-', '/')
      .replace('-', '/')
      .split('/');
    const formtde = `${dataa[2]}/${dataa[1]}/${dataa[0]}`;
    // Remove "+91" prefix from phone number field, if present

    const phoneNumber = this.formDataJSON.phonen.startsWith('+91')
      ? this.formDataJSON.phonen.substring(3)
      : this.formDataJSON.phonen;
    this.personalBioForm = this.fb.group({
      name: [this.formDataJSON.fulln],
      email: [this.formDataJSON.emailn],
      gender: [this.formDataJSON.gendern],
      dateOfBirth: [formtde],
      city: [this.formDataJSON.cityn],
      phoneNumber: [phoneNumber],
    });
  }

  date_Of_Birth:any;
  seletDateOfBirth(event:any){
    this.date_Of_Birth = event.target.value;
    console.log("print date of birth", this.date_Of_Birth)
  }

  // getters functions for form validation
  get name() { return this.personalBioForm.get('name'); }
  get email() { return this.personalBioForm.get('email'); }
  get gender() { return this.personalBioForm.get('gender'); }
  get dateOfBirth() { return this.personalBioForm.get('dateOfBirth'); }
  get city() { return this.personalBioForm.get('city'); }
  get phoneNumber() { return this.personalBioForm.get('phoneNumber'); }

  // Submit personal information data
  submitData() {
    if (this.age < 18) {
      this.alerts99 = 'Age should not be less than 18 years ';
      return;
    } else {
      this.alerts99 = '';
    }
    if (this.personalBioForm.valid) {
      // patching phone number with +91
      let phoneNumber2 = this.personalBioForm.value.phoneNumber;
      let modifiedPhoneNumber = '+91' + phoneNumber2;
      this.personalBioForm.patchValue({ phoneNumber: modifiedPhoneNumber });
      const formData = this.personalBioForm.value;

      // creating an object here for the form dat

      // patching phone number with +91
      phoneNumber2 = this.personalBioForm.value.phoneNumber;
      modifiedPhoneNumber = phoneNumber2;
      if (phoneNumber2.startsWith('+91')) {
        modifiedPhoneNumber = phoneNumber2.replace('+91', '');
      } else {
        modifiedPhoneNumber = '+91' + phoneNumber2;
      }
      this.personalBioForm.patchValue({ phoneNumber: modifiedPhoneNumber });

      this.fulln = formData.name;
      this.emailn = formData.email;
      this.gendern = formData.gender;
      this.dataOfBirthn = formData.dateOfBirth;
      this.cityn = this.tempLocation;
      this.phonen = formData.phoneNumber;

      // setting city conditionls
      // Remove "+91" prefix from phone number field, if present

      const user = {
        fulln: formData.name,
        emailn: formData.email,
        gendern: formData.gender,
        dateOfBirthn: formData.dateOfBirth,
        cityn: this.tempLocation.toUpperCase(),
        phonen: formData.phoneNumber,
      };

      // set session storage for back and forth navigation
      localStorage.setItem('profileData', JSON.stringify(user));
      this.router.navigate(['onBoarding/skill&Education']);
      const data: dataModalNew = {
        name: this.fulln,
        email: this.emailn,
        gender: this.gendern,
        dateOfBirth: this.dataOfBirthn,
        city: this.cityn,
        phoneNumber: this.phonen,
      };
    } else {
      this.personalBioForm.markAllAsTouched();
    }
  }

  // Check if the user's age is greater than 18 for job application

  checkAge() {
    const dateOfBirth = new Date(this.enterningdate);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      this.personalBioForm.controls['dateOfBirth'].setErrors({
        invalidAge: true,
      });
    } else {
      this.personalBioForm.controls['dateOfBirth'].setErrors(null);
    }
    if (age == null) {
      this.personalBioForm.controls['dob'].setErrors({ required: true });
    }
  }

  // function for the location and geoocation

  getCity() {
    // console.log("Cities loaded in ngOninit")
    this.locationService.getLocation().subscribe((data) => {
      this.masterLocation = data;
      this.masterLocationCopy = data;
    });
  }

  // Search for cities based on user input
  searchCitys(e: any) {
    // show and hide div on query
    if (this.searchQuery.length > 0) {
      this.isDivVisible = false;
    } else {
      this.isDivVisible = true;
    }
    this.masterLocation = [
      ...this.masterLocationCopy.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];
    if (this.masterLocation.length == 0) {
      this.errorMsgOflocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflocation = '';
    }
  }

  // location 2 : selecting the location from the SVG icons
  sendValue(paragraph: HTMLParagraphElement) {
    this.selectePrimaryLocation = paragraph.textContent;
    this.tempLocation = this.selectePrimaryLocation;
    this.updateInput();
  }

  cityCheck() {
    if (this.myData.length == 0) {
      this.temp4 = 'Please select your city';
      this.personalBioForm.get('city')?.setErrors(null);
      this.personalBioForm.get('city')?.markAsTouched();
      return 'Please select your city';
    } else {
      this.temp4 = '';
      return '';
    }
  }

  cityCheck2() {
    setTimeout(() => {
      this.cityCheck();
    }, 3000);
  }

  //Set Data in input box
  updateInput() {
    this.myData = this.selectePrimaryLocation;
    this.mainLocationSend1 = this.myData;
    this.tempLocation = this.myData;
  }

  // Get the user's current location using geolocation
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // using service for city name;
        this.getCityName(this.latitude, this.longitude);
      });
    } else {
    }
  }

  // Convert coordinates to city name using Google Maps API
  getCityName(lat: any, long: any) {
    const latitude = lat;
    const longitude = long;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDj1fYIfpNsmypb14aIHpwm-w8FVF-KvJw`;
    this.http.get(url).subscribe((data: any) => {
      if (data.status === 'OK') {
        for (const result of data.results) {
          for (const component of result.address_components) {
            if (component.types.includes('locality')) {
              this.yourCityName = component.long_name;
              this.myData = component.long_name.toUpperCase();
              this.mainLocationSend1 = component.long_name;
              this.tempLocation = this.mainLocationSend1;
            }
          }
        }
      } else {
      }
    });
  }

  Token = {
    jobSeekerProfileId: '',
    fullName: '',
  };

  // Setting token ID for tokens
  ProfiletokenId(res: any) {
    this.Token.jobSeekerProfileId = res.profileId;
    this.Token.fullName = res.profileId;
    this.personalService.TokenId(this.Token).subscribe((res: any) => {
      localStorage.setItem('tokenId', res.tokenId);
    });
  }
}
