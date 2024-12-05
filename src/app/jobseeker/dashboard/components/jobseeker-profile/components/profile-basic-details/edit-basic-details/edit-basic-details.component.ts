import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { dataModalNew, dataNew } from '../model/edit-details';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { EditBasicDetailsService } from '../services/edit-basic-details.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-basic-details',
  templateUrl: './edit-basic-details.component.html',
  styleUrls: ['./edit-basic-details.component.css'],
  providers: [
    DatePipe,
  ]
})
export class EditBasicDetailsComponent implements OnInit {
  DOBB: any;
  mainLocationSend1: string; // main to send
  fulln: string;
  emailn: string;
  phonen: string; // number ?
  gendern: string;
  dataOfBirthn: Date;
  cityn: string;
  errorMessageEmail: string = '';
  errorMessagePhone: string = '';
  tempLocation: string;
  firstLocationPost: string; // it will be updated and send only
  masterLocation: any = []; // copy of main location lists
  // masterLocation1: any = []; // copy of main location lists
  masterLocationCopy: any;
  searchQuery: string = '';
  isDivVisible: boolean = true;
  errorMsgOflocation: string = '';
  selectePrimaryLocation: any = ' ';
  temp4: string = "";
  myData: string = '';
  latitude: number;
  longitude: number;
  yourCityName !: string;
  phoneres: any = '';
  emailres: any = ' ';
  mainError: any = '';
  enterningdate: any;
  currentdate: any;
  difference: number;
  age: number;
  alerts99: string;
  isfieldeditiblephone: boolean = true;
  isfieldeditibleemail: boolean = true;
  storedemail: string | null = "";
  storedsms: any = "";
  str: any = '';
  strsms: any = '';
  storeemail: string = "";
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
  personalBioForm !: FormGroup;
  pincodes: string;
  isValid = true;
  isValidS = true;
  isValidO = true;
  secLocation: any = ' ';
  pinCode: string;

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private location: Location, private editBasicDetailsService: EditBasicDetailsService, private datePipe: DatePipe) {
    // this.Data = this.editBasicDetailsService.temp;
    this.Data = {} as dataNew
  }

  goBack(): void {
    this.location.back();
  }
  Data: dataNew;


  minDate: string;
  date:string
  ngOnInit(): void {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    this.minDate = currentDate.toISOString().split('T')[0];

    
    this.createReactiveForm()
    this.getBasicDetail()
    this.getCity(); // to get location
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';
      this.connectionStatus = 'online';
      console.log('Online...');
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'No internet connection! ';
      this.connectionStatus = 'offline';

      console.log('Offline...');
    }));
  }
  // defualt code
  b: boolean = false
  errorMsgOfskills: string;
  formattedEnteringDate: string;

  close() {
    this.b = true
  }

  dob(e: any) {
    console.log(e.detail.value);
    this.DOBB = e.detail.value;
    console.log("Hiii : ", this.DOBB);
    this.enterningdate = new Date(this.DOBB);
    this.currentdate = new Date();
    this.selectDate = this.enterningdate.toISOString().substr(0, 10);
    console.log("FORAMTED DATE : ", this.selectDate);
    this.difference = Math.floor(this.currentdate - this.enterningdate)
    this.age = Math.floor((this.difference / (1000 * 3600 * 24)) / 365);
    console.log("=======>", this.age)
    if (this.age >= 18) {
      this.alerts99 = ''
    }
    if (this.age < 18) {
      this.alerts99 = "Age should not be less than 18 years";
    }
  }
  getnames() {
    this.personalBioForm.setValue({ name: '', email: this.str, gender: '', dateOfBirth: '', city: '', phoneNumber: this.strsms.slice(3, 14) });
  }
  togglePopup1() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }
  togglePopup2() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }
  isPopupVisiblelocation = false;
  togglePopuplocation() {
    this.isPopupVisiblelocation = !this.isPopupVisiblelocation;
  }

  checkduration() {
    const dateOfBirth = new Date(this.personalBioForm.controls['dateOfBirth'].value);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.personalBioForm.controls['dateOfBirth'].setErrors({ invalidAge: true });
    } else {
      this.personalBioForm.controls['dateOfBirth'].setErrors(null);
    }
    if (age == null) {
      this.personalBioForm.controls['dob'].setErrors({ required: true });
    }
  }

  // create reactive form
  createReactiveForm() {
    this.personalBioForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+91[ -]?)?[6789]\d{9}$/)
        , Validators.minLength(13)]]

    });
  }

  // getters functions for form validation
  get name() { return this.personalBioForm.get('name'); }
  get email() { return this.personalBioForm.get('email'); }
  get gender() { return this.personalBioForm.get('gender'); }
  get dateOfBirth() { return this.personalBioForm.get('dateOfBirth'); }
  get city() { return this.personalBioForm.get('city'); }
  get phoneNumber() { return this.personalBioForm.get('phoneNumber'); }

  // submit function
  submitData() {
    console.log("SUbmit Function callled.....@@@@");
    if (this.age < 18) {
      this.alerts99 = "Age should not be less than 18 years "
      return;
    }
    else {
      this.alerts99 = "";
    }

    // data ready to submit
    const masterData = {
      name: this.personalBioForm.value.name,
      email: this.personalBioForm.value.email,
      phoneNumber: this.personalBioForm.value.phoneNumber,
      dateOfBirth: this.selectDate,
      city: this.tempLocation,
      gender: this.personalBioForm.value.gender,
      pincode: this.personalBioForm.value.pinCode,

    }

    console.log("Maset Data to submit : ", masterData);
    // console.log("Invalid Complete Data: ", this.personalBioForm.value);
    console.log("Submit data initializing...");
    if (this.personalBioForm.valid) {
      console.log("Form is valid ...");

      let ID = localStorage.getItem('profileID');

      this.editBasicDetailsService.updateJcProfile(ID, masterData).subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/dashboard/profile'])
      });

      //putting pin code
      // this.editBasicDetailsService.updatepincodelocation(ID, masterData.pinCode).subscribe(res => {
      //   console.log("Pincode updated successfully", res);
      // });

      // patching phone number with +91
      // let phoneNumber2 = this.personalBioForm.value.phoneNumber;
      // let modifiedPhoneNumber = "+91" + phoneNumber2;
      // this.personalBioForm.patchValue({ phoneNumber: modifiedPhoneNumber });

      const formData = this.personalBioForm.value;
      console.log("Complete Data: ", formData);
      this.fulln = formData.name;
      this.emailn = formData.email;
      this.gendern = formData.gender;
      this.dataOfBirthn = this.enterningdate;
      this.cityn = this.tempLocation;
      this.phonen = formData.phoneNumber;
      this.pinCode = formData.pinCode;
      console.log("Posting Data started ...");
      // this.router.navigate(["/dashboard/profile"]);
    }
    else {
      console.log('Form is invalid');
      this.personalBioForm.markAllAsTouched();
    }
  }
  //Sec input box
  mySecData: string = 'eg : Kerala';
  updateSecInput() {
    this.mySecData = this.secLocation;
    let pin = document.getElementById("PinCode") as HTMLInputElement;
    this.pincodes = pin.value;
    console.log("pin code", pin.value);
    if (this.mySecData.length > 0) {
      this.isValidS = false;
    }
  }
  // Check if the entered PIN code is exactly 6 digits
  // isValidPin: boolean = false;
  // validatePin() {
  //   this.isValidPin = /^\d{6}$/.test(this.pinCode);
  // }
  //data get from SVG for other City
  otherSelectLocation: any = ' ';
  sendOtherCity(paragraph: HTMLParagraphElement) {
    this.otherSelectLocation = paragraph.textContent;
    console.log(this.otherSelectLocation);
    // call the update value for send data to input box.
    this.updateOthInput();
  }

  //show data in other Input box
  pinData: any = ''
  myOthData: string = 'eg : New Delhi';
  updateOthInput() {
    this.myOthData = this.otherSelectLocation;
    if (this.myOthData.length > 0) {
      this.isValidO = false;
    }
  }

  public inputValidator1(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*[,]$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9,]/g, "");
      console.log(event.target.value);
      if (event.target.value.length == 6) {
        this.pinData = event.target.value;

      }
    }
  }

  getCity() {
    console.log("Cities loaded in ngOninit")
    this.editBasicDetailsService.getLocation().subscribe(data => {
      this.masterLocation = data;
      // this.masterLocation = this.masterLocation1.values;
      this.masterLocationCopy = data;
    })
  }
  //function to check the user's age is greater than 18 and valid for applying for the jobs
  checkAge() {
    console.log("calling the checkAge method by blur");
    const dateOfBirth = new Date(this.personalBioForm.controls['dateOfBirth'].value);
    console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    // if (age < 18) {
    //   this.personalBioForm.controls['dateOfBirth'].setErrors({ invalidAge: true });
    // } else {
    //   this.personalBioForm.controls['dateOfBirth'].setErrors(null);
    // }
    // if (age == null) {
    //   this.personalBioForm.controls['dob'].setErrors({ required: true });
    // }
  }

  // location 1 : searching the location in the modal function
  searchCitys() {
    // show and hide div on query
    if (this.searchQuery.length > 0) {
      this.isDivVisible = false;
    } else {
      this.isDivVisible = true;
    }

    this.masterLocationCopy = this.masterLocation;
    this.masterLocationCopy = this.masterLocationCopy.filter((data: any) => {
      return data.toLowerCase().includes(this.searchQuery.toLowerCase());
    });

    if (this.masterLocationCopy.length == 0) {
      console.log("no search is there ")
      this.errorMsgOflocation = 'assets/images/amico.svg';
    }
    else {
      this.errorMsgOflocation = '';
    }

  }

  // location 2 : selecting the location from the SVG icons
  sendValue(paragraph: HTMLParagraphElement) {
    this.selectePrimaryLocation = paragraph.textContent;
    // console.log("SVG Location", this.selectePrimaryLocation);
    this.tempLocation = this.selectePrimaryLocation;
    // call the update value for send data to input box.
    console.log("SVG Location in sendValue method : ", this.tempLocation)
    this.updateInput();
  }

  cityCheck() {
    // console.log("check city length")
    // console.log(this.myData.length);
    if (this.myData.length == 0) {
      this.temp4 = "Please select your city";
      // Set city field to valid
      this.personalBioForm.get('city')?.setErrors(null);
      this.personalBioForm.get('city')?.markAsTouched();
      return 'Please select your city';
    }
    else {
      this.temp4 = '';
      return '';
    }
  }

  cityCheck2() {
    setTimeout(() => {
      this.cityCheck();
    }, 3000)
  }

  //Set Data in input box
  updateInput() {
    // console.log(this.myData.length)
    console.log("#############", this.myData);

    this.myData = this.selectePrimaryLocation;
    this.mainLocationSend1 = this.myData;
    this.tempLocation = this.myData;
  }
  // current live location:
  // get latitude and longitude
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
        // using service for city name;
        this.getCityName(this.latitude, this.longitude);

      });
    } else {
      console.log("Geolocation is not supported by this browser.========++++++");
    }
  }

  // location coordinates to city

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
              console.log("Live Location :", this.mainLocationSend1.toUpperCase());
              this.tempLocation = this.mainLocationSend1;
              console.log("inside getCityName: ##############", this.tempLocation);

            }
          }
        }
      } else {
        console.log(`Geocoding failed with status ${data.status}`);
      }
    });
  }

  // Get Method call

  basicDetail: any;
  startYear: any;
  getBasicDetail() {

    let ID = localStorage.getItem('profileID');

    this.editBasicDetailsService.apiJcProfile(ID).subscribe((resp: any) => {
      console.log("YYYYYY", resp, resp.name, resp.city, resp.date_of_birth, resp.gender, resp.pincode)


      this.startYear = this.datePipe.transform(resp.date_of_birth, "dd/MM/yyyy");

      this.personalBioForm.patchValue({ name: resp.name });
      this.personalBioForm.patchValue({ phoneNumber: resp.phoneNumber });
      this.personalBioForm.patchValue({ email: resp.email });
      this.personalBioForm.patchValue({ gender: resp.gender });
      this.personalBioForm.patchValue({ dateOfBirth: this.startYear });
      this.personalBioForm.patchValue({ city: resp.city });
      this.personalBioForm.patchValue({ pinCode: resp.pincode });

      this.selectDate = resp.date_of_birth;
      this.tempLocation = resp.city;

      // this.basicDetail = resp
      // this.personalBioForm = new FormGroup({
      //   name: new FormControl(resp['name']),
      //   email: new FormControl(resp['email']),
      //   phoneNumber: new FormControl(resp['phoneNumber']),
      //   gender: new FormControl(resp['gender']),
      //   dateOfBirth: new FormControl(resp['dateOfBirth']),
      //   city: new FormControl(resp['city']),
      //   pinCode : new FormControl(resp['pinCode']),

      // })

    });
  }

  selectDate:any
  selectDateOfBirth(event:any){
    this.selectDate = event.target.value
    console.log("print date of birth ==>", this.selectDate)
  }

  //Update Method call

  formValidFlag: boolean = true;
  update() {

    console.log("FORM VALUES : ", this.personalBioForm.value);
    this.formValidFlag = true;
    const accountStatus: string = "ACTIVE";
    this.Data.name = this.personalBioForm.value.name
    this.Data.email = this.personalBioForm.value.email
    this.Data.phoneNumber = this.personalBioForm.value.phoneNumber
    this.Data.gender = this.personalBioForm.value.gender
    this.Data.pinCode = this.personalBioForm.value.pincode
    this.Data.city = this.tempLocation;
    if (this.Data.city === null || this.Data.city === undefined) {
      this.Data.city = this.personalBioForm.value.city;
    }
    this.Data.dateOfBirth = this.selectDate;

    if (this.personalBioForm.value.dateOfBirth) {
      this.Data.dateOfBirth = this.personalBioForm.value.dateOfBirth;
    }

    //  this.Data.pinCode =this.personalBioForm.value.pinCode

    // this.Data.accountStatus = accountStatus
    let ID = localStorage.getItem('profileID');
    if (this.personalBioForm.valid) {
      console.log("FORM IS VALID 1 ######################");
      console.log("Data Ready to Update : ", this.Data);
      console.log("Form is Valid now................");
      console.log("Personal Bio Data : ", this.personalBioForm.value);
      console.log("Sending Data : ", this.Data);
      this.editBasicDetailsService.updateJcProfile(ID, this.Data).subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/dashboard/profile'])
      });
    }

    // if(this.Data.dateOfBirth !== null && this.Data.city !== null && this.Data.dateOfBirth !== undefined && this.Data.city !== undefined){

    //   console.log("FORM IS VALID 2 ###################### his.Data.dateOfBirth !== null && this.Data.city !== null");

    //   console.log("Data Ready to Update : ",this.Data);

    //   this.editBasicDetailsService.updateJcProfile(ID, this.Data).subscribe((resp) => {
    //     console.log(resp);
    //     this.router.navigate(['/dashboard/profile'])
    //   });

    // }

    else {
      console.log("FOrm is not valid @@@@@@@@@@@@@@@@@");
      this.formValidFlag = false;
      console.log(this.personalBioForm.errors);


    }
  }

}













