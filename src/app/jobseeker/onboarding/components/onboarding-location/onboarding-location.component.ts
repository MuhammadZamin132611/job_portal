/*
Name: Sathvik
Date: 06-10-2023
Purpose: This is the controller ts file for the "OnboardingLocationComponent" in the onboarding module. 
Description: This component handles user location selection during onboarding, including primary, secondary, and other preferred locations, as well as language and fluency selection.
*/

// Import necessary Angular and RxJS modules and services

// 1. Imports - Angular Framework - Mandatory
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// 2. Imports - Angular Forms and Form Elements - Mandatory
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgForm, NgModel } from '@angular/forms';

// 3. Imports - JobCheck Services - Mandatory
import { OnboardingLocationService } from '../../services/onboarding-location.service';
import { SharedService } from '../../services/shared.service';

// 4. Imports - JobCheck Models - Mandatory
import { locationDetails } from '../../models/location';

// 5. Imports - RxJS - Mandatory
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';

// 6. Imports - Capacitor (for mobile app) - Optional
import { App } from '@capacitor/app';

@Component({
  selector: 'app-onboarding-location',
  templateUrl: './onboarding-location.component.html',
  styleUrls: ['./onboarding-location.component.css'],
})
export class OnboardingLocationComponent implements OnInit {
  // Observables for online and offline events
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  // Variables to manage UI state
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  existUser: string = '';
  Popup: any = false;
  // Location details and SVG city names
  locationDetails: locationDetails = new locationDetails();
  SvgHideP: boolean = false;
  SvgHideS: boolean = false;
  SvgHideO: boolean = false;
  errorMsgOflocation: string = ' ';
  errorMsgOflocationS: string = ' ';
  errorMsgOflocationO: string = ' ';
  svgDelhi = 'Delhi';
  svgMumbai = 'Mumbai';
  svgBangalore = 'Bengaluru/Bangalore';
  svgSurat = 'Surat';
  svgPanjab = 'Punjab';
  svgKerla = 'Kerala';
  svgLucknow = 'Lucknow';
  svgAgra = 'Agra';
  // User profile and location data
  profileId: string;
  pincodes: string;
  jobSeekerDetailsId: any;
  // Popup visibility flags
  isPopupVisible1 = false;
  isPopupVisible2 = false;
  isPopupVisible3 = false;
  isPopupVisible4 = false;
  backButtonListener: any;

  // Toggle the first popup for primary location
  togglePopup1() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }
  isprimary = false;
  ErrorMessage = '';
  showBtn12:boolean=false;
  showBtn13:boolean=false;

  // Toggle the first popup for secondary location
  togglePopup2() {
    if (this.myData != 'eg : Mumbai') {
      this.isprimary = false;
      this.isPopupVisible2 = !this.isPopupVisible2;
    } else {
      this.isprimary = true;
      this.ErrorMessage = 'Kindly choose Primary location ';
      this.isPopupVisible2 = false;
    }
  }
  isSec = false;
  erroeMessage2 = '';

  //Toggle the first popup for other location

  togglePopup3() {
    // mySecData: string = 'eg : Kerala'
    if (this.myData != 'eg : Mumbai') {
      if (this.mySecData != 'eg : Kerala') {
        this.isSec = false;
        this.isPopupVisible3 = !this.isPopupVisible3;
      } else {
        this.erroeMessage2 = 'Kindly choose secondary location ';
        this.isSec = true;
      }
    } else {
      this.isSec = true;
      this.erroeMessage2 =
        'Kindly choose Primary location and secondary location';
      this.isPopupVisible3 = false;
    }
  }
  // filteredCities: string[] = [];
  // togglePopup3() {
  //   if (this.myData !== 'eg : Mumbai') {
  //     if (this.mySecData !== 'eg : Kerala') {
  //       this.isSec = false;
  //       // Filter the cities based on the search query if there is one
  //       if (this.searchQuery) {
  //         this.filteredCities = this.searchOthCity.filter(city =>
  //           city.toLowerCase().includes(this.searchQuery.toLowerCase())
  //         );
  //       } else {
  //         // If no search query, display all cities
  //         this.filteredCities = this.searchOthCity;
  //       }
  //       this.isPopupVisible3 = !this.isPopupVisible3;
  //     } else {
  //       this.erroeMessage2 = 'Kindly choose secondary location';
  //       this.isSec = true;
  //     }
  //   } else {
  //     this.isSec = true;
  //     this.erroeMessage2 = 'Kindly choose Primary location and secondary location';
  //     this.isPopupVisible3 = false;
  //   }
  // }
  

  // Toggle the fourth popup for other language you speak
  togglePopup4() {
    this.isPopupVisible4 = !this.isPopupVisible4;
    this.showBtn12 = !this.showBtn12
  }

  constructor(
    private loction: OnboardingLocationService,
    private sharedService: SharedService,
    private router: Router
  ) {
    // Set the current path in local storage
    localStorage.setItem('currentPath', window.location.pathname);
    // Initialize the backButtonListener
    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });
  }
  // Clean up the backButtonListener
  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  // OnInit - Mandatory

  ngOnInit(): void {
    // Fetch location and language data
    this.TogetLocation();
    this.toGetLanguage();
    // Initialize online and offline event observables
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    // Subscribe to online and offline events
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
  close() {
    this.Popup = true;
  }

  //validation
  isValid = true;
  isValidS = true;
  isValidO = true;
  isValidLanguage = true;
  isSubmitClicked = false;
  selectedFluency: string;
  validation() {
    if (this.selecetedLanguages.length > 0) {
      this.isValidLanguage = false;
    } else {
      this.isValidLanguage = true;
    }
  }

  //Validation with data post

  locattionValidate(form: NgForm) {
    if (form.valid && this.selectedFluency) {
      this.submitLocation();
      this.router.navigate(['/onBoarding/progress']);
      const locationData = {
        primaryLication: this.myData,
        pinCode: this.pinData,
        secondarylocation: this.mySecData,
        otherLocation: this.myOthData,
        language: this.selecetedLanguages,
        eFluency: this.fluency,
      };
      localStorage.setItem('LocationData', JSON.stringify(locationData));
    } else {
      this.isSubmitClicked = true;
    }
  }
  PrimaryLocation: any = '';
  masterCityCopy2: string[] = [];
  TogetLocation() {
    const SecCity = this.secLocation.replace(/\s/g, '');
    const trdCity = this.otherSelectLocation.replace(/\s/g, '');
    this.loction.getLocation().subscribe((data) => {
      this.PrimaryLocation = data;
      this.masterCityCopy2 = [...this.PrimaryLocation];
      this.masterCityCopy2 = this.masterCityCopy2.filter(
        (city) =>
          city.toLowerCase() != SecCity.toLowerCase() &&
          city.toLowerCase() !== trdCity.toLowerCase()
      );
      this.searchCitys();
    });
  }

  //get data from SVG and List Box

  selectePrimaryLocation: any = '';
  sendValue(paragraph: HTMLParagraphElement) {
    this.selectePrimaryLocation = paragraph.textContent;
    this.isprimary = false;
    this.erroeMessage2 = 'kindly Choose Secondary Location';
    this.updateInput();
  }

  //Search City

  searchPrimaryCity: string[] = [...this.masterCityCopy2];
  searchQuery: string = '';
  countForSvg: any = 0;
  searchCitys() {
    this.searchPrimaryCity = this.PrimaryLocation.filter((data: any) => {
      if (this.searchQuery.length > 0) {
        this.SvgHideP = true;
      } else {
        this.SvgHideP = false;
      }
      this.countForSvg = data
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      return data.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
    if (this.searchPrimaryCity.length == 0) {
      this.errorMsgOflocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflocation = '';
    }
  }

  //Set Data in input box

  myData: string = 'eg : Mumbai';
  updateInput() {
    this.myData = this.selectePrimaryLocation;
    if (this.myData.length > 0) {
      this.isValid = false;
    }
  }

  //Sec location
  masterCityCopy: string[] = [];
  secLocationFunction() {
    const SecCity = this.selectePrimaryLocation.replace(/\s/g, '');
    const trdCity = this.otherSelectLocation.replace(/\s/g, '');
    this.masterCityCopy = [...this.PrimaryLocation];
    this.masterCityCopy = this.masterCityCopy.filter(
      (city: string) =>
        city.toLowerCase() != SecCity.toLowerCase() &&
        city.toLowerCase() !== trdCity.toLowerCase()
    );
    this.searchSecCitys();
    this.TogetLocation();
  }

  //Sec SVG

  secLocation: any = '';
  otherLocation: any = '';
  sendSecCity(paragraph: HTMLParagraphElement) {
    this.secLocation = paragraph.textContent;
    this.isSec = false;
    // call the update value for send data to input box.
    this.updateSecInput();
  }

  //Search  button for Sec City

  searchSecCity: string[] = [...this.masterCityCopy];
  searchSecQuery: string = '';
  searchSecCitys() {
    this.searchSecCity = this.masterCityCopy.filter((data: any) => {
      if (this.searchSecQuery.length > 0) {
        this.SvgHideS = true;
      } else {
        this.SvgHideS = false;
      }
      return data.toLowerCase().includes(this.searchSecQuery.toLowerCase());
    });
    if (this.searchSecCity.length == 0) {
      this.errorMsgOflocationS = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflocationS = '';
    }
  }
  //Sec input box
  mySecData: string = 'eg : Kerala';
  updateSecInput() {
    this.mySecData = this.secLocation;
    let pin = document.getElementById('pincode') as HTMLInputElement;
    this.pincodes = pin.value;
    if (this.mySecData.length > 0) {
      this.isValidS = false;
    }
  }

  //Other Location

  masterCityCopy1: string[] = [];
  otherLocationFunction() {
    const SecCity = this.secLocation.replace(/\s/g, '');
    const prmCity = this.selectePrimaryLocation.replace(/\s/g, '');
    this.masterCityCopy1 = [...this.masterCityCopy];
    this.masterCityCopy1 = this.masterCityCopy1.filter(
      (city: string) =>
        city.toLowerCase() != SecCity.toLowerCase() &&
        city.toLowerCase() !== prmCity.toLowerCase()
    );
    this.TogetLocation();
    this.secLocationFunction();
  }

  //data get from SVG for other City

  otherSelectLocation: any = '';
  sendOtherCity(paragraph: HTMLParagraphElement) {
    this.otherSelectLocation = paragraph.textContent;
    this.updateOthInput();
  }

  //Search  button for Other City

  searchOthCity: string[] = [...this.masterCityCopy1];
  searchOthQuery: string = '';
  searchOthCitys() {
    this.searchOthCity = this.masterCityCopy1.filter((data: any) => {
      if (this.searchOthQuery.length > 0) {
        this.SvgHideO = true;
      } else {
        this.SvgHideO = false;
      }
      return data.toLowerCase().includes(this.searchOthQuery.toLowerCase());
    });
    if (this.searchOthCity.length == 0) {
      this.errorMsgOflocationO = 'assets/images/amico.svg';
    } else {
      this.errorMsgOflocationO = '';
    }
  }

  //show data in other Input box
  pinData: any = '';
  myOthData: string = 'eg : New Delhi';
  updateOthInput() {
    this.myOthData = this.otherSelectLocation;
    if (this.myOthData.length > 0) {
      this.isValidO = false;
    }
  }

  public inputValidator1(event: any) {
    const pattern = /^[0-9]*[,]$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9,]/g, '');
      // console.log(event.target.value);
      if (event.target.value.length == 6) {
        this.pinData = event.target.value;
      }
      // invalid character, prevent input
    }
  }

  //get Languages

  Language: any = ' ';
  toGetLanguage() {
    this.loction.getLanguage().subscribe((data) => {
      this.Language = data;
      this.languageSearch();
    });
  }

  //Search language

  searchLanguage: string[] = [...this.Language];
  queryLanguage: string = '';
  languageSearch() {
    this.searchLanguage = this.Language.filter((data: any) => {
      return data.toLowerCase().includes(this.queryLanguage.toLowerCase());
    });
  }

  //get selected  language
  selecetedLanguages: string[] = [];
  OnSelectLanguages(e: any) {
    if (e.target.checked) {
      this.selecetedLanguages.push(e.target.value);
      this.validation();
    } else {
      const index = this.selecetedLanguages.indexOf(e.target.value);
      this.selecetedLanguages.splice(index, 1);
      this.validation();
    }
  }
  //Remove Selected Language

  userSelectedLanguages: any[] = [];
  removeLanguage(e: any) {
    const index = this.selecetedLanguages.indexOf(e);
    this.selecetedLanguages.splice(index, 1);
    this.userSelectedLanguages.length = this.Language.length;
    for (let j = 0; j < this.Language.length; j++) {
      if (this.Language[j] == e) {
        this.userSelectedLanguages[j] = false;
      }
      this.validation();
    }
  }
  //get value for speking fluency

  fluency: any = ' ';
  spekingFluency(paragraph: HTMLParagraphElement) {
    this.fluency = paragraph.textContent;
    this.updateOthInput();
  }

  //Change Icon color
  textColor = 'red';

  //Submit the data from location component
  submitLocation() {
    this.jobSeekerDetailsId = this.jobSeekerDetailsId;
    this.locationDetails.primaryLocation = this.selectePrimaryLocation;
    this.locationDetails.secondaryLocation = this.secLocation;
    this.locationDetails.otherPreferedLocation = this.otherSelectLocation;
  }

  toggle() {
    this.show = !this.show;

    // Change the name of the button.
    if (this.show) this.buttonName = 'Hide';
    else this.buttonName = 'Show';
  }
}
