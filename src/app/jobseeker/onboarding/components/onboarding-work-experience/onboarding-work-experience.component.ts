// 1. Imports - Angular Framework - Mandatory
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
import { DatePipe } from '@angular/common';

// 2. Imports - JobCheck Modules - Optional
// None

// 3. Imports - JobCheck Services - Mandatory
import { SharedService } from './../../services/shared.service'; // Import SharedService
import { OnboardingWorkExperienceService } from './../../services/onboarding-work-experience.service'; // Import OnboardingWorkExperienceService
import { workExp } from './../../models/work_Exp'; // Import workExp
// Add missing imports related to JobCheck services and models here

// 4. Imports - Exception Classes - Optional
// None

// 5. Imports - Config Files - Optional
// None

// 6. Imports - Utilities - Optional
// None

// 7. Imports - Others (External Integrations, APIs, Services) - Optional
// None

@Component({
  selector: 'app-onboarding-work-experience',
  templateUrl: './onboarding-work-experience.component.html',
  styleUrls: ['./onboarding-work-experience.component.css'],
  providers: [DatePipe],
})
export class OnboardingWorkExperienceComponent implements OnInit {
  DOBB: any;
  Enddate: any;
  joiningdate: any;
  endingdate: any;
  difference: number;
  differenceindays: any;
  alerts99: string;
  count = 0;
  backButtonListener: any;

    // Function to handle the selection of an end date.
  end(e: any) {
    this.Enddate = e.target.value;
    this.endYear = this.datePipe.transform(this.Enddate, "yyyy-MM-dd");
    console.log("the end year", this.endYear);
    if (this.endYear < this.startYear) {
      this.alerts99 = "Leaving date must greater than joining date";
      console.log("date mismatch")
      this.workExperience.controls['endDate'].setValidators([Validators.required]);
      this.workExperience.controls['endDate'].updateValueAndValidity();
      return; 
    }
    else{
      console.log("Date is correct")
      this.workExperience.controls['endDate'].setValidators(null);
      this.workExperience.controls['endDate'].updateValueAndValidity();
    }
    console.log(this.Enddate);
    // if (e.detail.value) {
    //   this.workExperience.controls['endDate'].setValidators(null);
    //   this.workExperience.controls['endDate'].updateValueAndValidity();
    //   this.currentWorkStatus = true;
    //   this.count = 1;
    // } else {
    //   this.workExperience.controls['endDate'].setValidators([Validators.required,]);
    //   this.workExperience.controls['endDate'].updateValueAndValidity();
    //   this.currentWorkStatus = false;
    // }
    this.dateDidderence();
  }
  startYear: any;
  endYear: any;
  
  // Function to handle the selection of a date of birth.

  dob(e: any) {
    this.DOBB = e.target.value;
    console.log("vaish", this.DOBB)
    this.startYear = this.datePipe.transform(this.DOBB, "yyyy-MM-dd");
    console.log("the Start year", this.startYear);
    const date = new Date(this.dateCheck)
    const date1 = new Date(this.startYear)
    date.setFullYear(date.getFullYear() + 15);
    const year = date.getFullYear();
    const birthYear=date1.getFullYear();
    console.log(this.dateCheck)
    console.log("yerrrrr",year,"ghjkl",birthYear)
   
    // console.log(this.DOBB);
    // console.log("click e d", this.DOBB)
    // console.log("click e d", typeof (this.DOBB))
    if (year>=birthYear){
      //this.alerts99='Please enter valid start date'
      this.workExperience.controls['startDate'].setValidators([Validators.required,]);
      this.workExperience.controls['startDate'].updateValueAndValidity();
      
      
    } else {
      this.workExperience.controls['startDate'].setValidators(null);
      this.workExperience.controls['startDate'].updateValueAndValidity();
    
    }
    this.dateDidderence();
  }

   // Calculate the date difference between joining and leaving dates.

  dateDidderence() {
    this.joiningdate = new Date(this.DOBB);
    this.endingdate = new Date(this.Enddate);
    this.difference = Math.floor(this.endingdate - this.joiningdate);
    this.differenceindays = Math.floor(this.difference / (1000 * 3600 * 24));
     // Check and set appropriate alerts based on the date difference.
    if (this.differenceindays < 0) {
      this.alerts99 = ' leaving date must greater than joining date';
      return;
    } else if (this.differenceindays == 0) {
      this.alerts99 = 'leaving date should not equal to joining date ';
      return;
    } else {
      this.alerts99 = '';
    }
  }

  isPopupVisible1 = false;
   // Function to toggle visibility of satrt date pop-up 1.
  togglePopup1() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }

  isPopupVisible2 = false;
   // Function to toggle visibility of end-date pop-up 2.
  togglePopup2() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }
  isPopupVisible3 = false;
   // Function to toggle visibility of industry pop-up 3.
  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3;
  }

  workExperience1!: FormGroup;
  work: any;
  show_fresher: boolean = false;
  show_experience: boolean = false;
  show_noNotice: boolean = false;
  show_15: boolean = false;
  show_30: boolean = false;
  show_45: boolean = false;
  show_60: boolean = false;
  show_90: boolean = false;
  noticeperiod: any;
  employmenttype: any;
  show_internship: boolean = false;
  show_contract: boolean = false;
  show_part: boolean = false;
  show_full: boolean = false;
  messageForCurrency: string = '';
  id: any;
  temp: any;
  currency: any;
  currncyLength = 0;
  joindataaa: any;
  leavedataaa: any;
  joindate: Date | undefined;
  leaveDate: Date | undefined;
  diff!: number;
  alerts4: string = '';
  errorMsgOfIndustry: string = '';
  selecetedIndustry: any = '';
  areaofInterestCount: number = 0;
  tempIndustry: string;
  mainIndustrySend1: string;
  tempLocation: any;
  profileID: any;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any;
  show: boolean = false;
  tick: boolean = false;
  existUser: string = '';
  storage: any;
  dateCheck: any;
  myvar: any;
  my2: any;

  constructor(
    private formbuilder: FormBuilder,
    private service: OnboardingWorkExperienceService,
    private shared: SharedService,
    private router: Router,
    private location: Location,
    private datePipe: DatePipe
  ) {


    this.myvar = localStorage.getItem('profileData')
    console.log(this.myvar)
    this.my2 = JSON.parse(this.myvar)
    this.dateCheck = this.my2.dateOfBirthn;
    console.log(this.my2)
    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });

  }

  workExperience!: FormGroup;
  isSubmitted: boolean = false;
  submittedValue: any;
  displayForm: string = ' hidden';
  formStatus: any = '';
  submitWorkStatus: boolean = false;
  btnshowgray: boolean = true;
  btnshowgreen: boolean = false;
  btnStatus: string = '';
  values: boolean = true;
  value: boolean = true;
  togglebutton: boolean = true;
  currentWorkStatus: boolean = false;
  profileId: string;
  workExp1: workExp = new workExp();
  jobRoles: any = [];


 // Lifecycle hook: ngOnDestroy is called when the component is destroyed.

  async ngOnDestroy() {
    this.backButtonListener.remove();
  }

   // Lifecycle hook: ngOnInit is called when the component is initialized.

  ngOnInit(): void {

    // Set up the form with default values and validators.
    // Initialize other variables and subscribe to online/offline events.
    // Note: Some code is omitted for brevity.
    localStorage.setItem('currentPath', window.location.pathname);
    let getCheckedRadio = null;
    this.SALARY_TYPE.forEach((o) => {
      if (o.checked) getCheckedRadio = o.value;
    });
    // Define the form structure and validators using FormBuilder.
    this.workExperience = this.formbuilder.group(
      {
        salaryType: new FormControl(getCheckedRadio, Validators.required),
        companyName: new FormControl('', [Validators.required]),
        jobRole: new FormControl('', [Validators.required]),
        industryType: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required, this.jobStartDateValidator(this.dateCheck)]),
        endDate: new FormControl('', [Validators.required]),
        currentMonthlySalary: new FormControl('', [Validators.required]),
        employmentType: new FormControl('', [Validators.required]),
        noticePeriod: new FormControl('', [Validators.required]),
        defaultradio: new FormControl('', Validators.required),
       // validator: this.dateLessThan('startDate', 'endDate') 
      },
      // { validator: this.dateLessThan('startDate', 'endDate') }
    );

      // Get the user's profile ID.
    this.profileId = this.shared.getProfileId();
      // Initialize other variables and perform necessary setup.
    this.currency = this.workExperience.get('currentMonthlySalary');
    this.temp;
    this.currncyLength = 0;
    this.changeToCurrency('text');
    this.getindustriesfromservice();
    this.getRolefromservice();
    this.calculateDiff();
    //  this.validDate1();
    //   const formdata = JSON.parse(localStorage.getItem('workExperienceData'));
    //   if (formdata) {
    //   this.workExperience.setValue(formdata);
    //   this.isSubmitted = true;
    // }

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
         // Handle online event.
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

  checkDateDuration: string
  checkDifferenceStartdateAndEnddate() {
    if (this.startDate > this.endDate) {
      this.checkDateDuration = 'Please enter greater end date'
      return;
    }
    else{
      return '';
    }
  }

  // This function check validation
  get form() {
    return this.workExperience.controls;
  }
// Define SALARY_TYPE array for radio buttons .
  SALARY_TYPE = [
    { name: 'Monthly', value: 'MONTHLY', checked: false },
    { name: 'Yearly', value: 'YEARLY', checked: false },
  ];
// Declare variables to store form data.
  workStatus: string;
  companyname: string;
  jobrole: string;
  industryType: string;
  currentlyWorking: boolean;
  startDate: string;
  endDate: String;
  salaryType: string;
  currentSalary: string;
  employmentType: string;
  noticePeriod: string;
  workExpId: any;
  dates: string;
// Create an instance of the workExp class for storing work experience data.
  workexperience: workExp = new workExp();
   submitForm() {
    this.profileID = localStorage.getItem('profileID');
    this.isSubmitted = true;
    console.log("status",this.currentWorkStatus)
    if (!this.workExperience.valid) {
      this.submittedValue = undefined;
      return false;
    } else {
      this.profileID = localStorage.getItem('profileID');
      const formData = this.workExperience.value;
       // Assign form data to variables.
      this.workStatus = formData.defaultradio;
      this.companyname = formData.companyName;
      this.jobrole = formData.jobRole;
      this.industryType = this.selectePrimaryIndustry;
      this.currentlyWorking = this.currentWorkStatus;
      this.startDate = this.startYear;
      this.endDate = this.endYear;
      this.salaryType = formData.salaryType;
      this.currentSalary = formData.currentMonthlySalary;
      this.employmentType = formData.employmentType;
      this.noticePeriod = formData.noticePeriod;
      // Store form data in local storage.
      localStorage.setItem('formValues', JSON.stringify(formData));
       // Create an object to store user's work experience data.
      const userWorkExperience = {
        workStatus: formData.defaultradio,
        companyname: formData.companyName,
        jobRole: formData.jobRole,
        industryType: this.selectePrimaryIndustry,
        currentlyWorking: this.currentWorkStatus,
        startDate: this.startDate,
        endDate: this.endDate,
        salaryType: formData.salaryType,
        currentSalary: formData.currentMonthlySalary,
        employmentType: formData.employmentType,
        noticePeriod: formData.noticePeriod,
      };

      console.log('work experience value =====>', userWorkExperience);
      // Store user's work experience data in local storage.
      localStorage.setItem(
        'experienceData',
        JSON.stringify(userWorkExperience)
      );
      // Navigate to the next pag
      this.router.navigate(['onBoarding/location']);
      return true;
    }
  }

   // Array to store industry data fetched from the service.

  industries: any = [];
  industryFilter: any = [];
    // Function to fetch industries from the service.
  getindustriesfromservice() {
    this.service.fetchindustryfromMasterdata().subscribe((data: any) => {
      this.industries = data;
      console.log(this.industries, 'Industries');
      this.industryFilter = this.industries;
    });
  }
  // Array to store job roles fetched from the service.
  jobRolesFilter: any = [];
  // Function to fetch job roles from the service.
  getRolefromservice() {
    this.service.rolesfromMasterdata().subscribe((data: any) => {
      this.jobRoles = data;
      console.log(this.jobRoles, 'jobRoles');
      this.jobRolesFilter = this.jobRoles;
    });
  }

  // Function to search for industries based on user input.
  searchIndustry(e: any) {
    this.industries = [
      ...this.industryFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];
    if (this.industries.length == 0) {
      this.errorMsgOfIndustry = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfIndustry = ' ';
    }
  }

  // Function to select the primary industry and update the input.

  selectePrimaryIndustry: any = ' ';
  jobsType: any = ' ';
  sendValue(paragraph: HTMLParagraphElement) {
    this.selectePrimaryIndustry = paragraph.textContent;
    // call the update value for send data to input box.
    this.updateInput();
  }
  send(paragraph: HTMLParagraphElement) {
    this.jobsType = paragraph.textContent;
    // call the update value for send data to input box.
    this.update();
  }

  // Functions to check if industry and job role fields are empty.

  temp4: string;
  industryCheck() {
    if (this.myData.length == 0) {
      this.temp4 = 'Industry type is required*';
      // Set city field to valid
      this.workExperience.get('industryType')?.setErrors(null);
      this.workExperience.get('industryType')?.markAsTouched();
      return 'Industry type is required';
      // console.log('It is 0');
    } else {
      this.temp4 = '';
      return '';
    }
  }

  temp5: string;
  jobRoleCheck() {
    // console.log('check job rolelength');
    // console.log(this.jobs.length);
    if (this.jobs.length == 0) {
      this.temp5 = 'Job role is required*';
      // Set city field to valid
      this.workExperience.get('jobRole')?.setErrors(null);
      this.workExperience.get('jobRole')?.markAsTouched();
      return 'job role is required';
      // console.log('It is 0');
    } else {
      this.temp5 = '';
      return '';
    }
  }
// Functions to update selected industry and job role.
  myData: string = '';
  jobs: string = '';
  updateInput() {
    // console.log(this.myData.length);
    this.myData = this.selectePrimaryIndustry;
    // this.mainIndustrySend1 = this.myData;
    // this.tempIndustry = this.myData;
  }
  update() {
    this.jobs = this.jobsType;
  }

  // defualt code
  b: boolean = false;
// Function to close a popup.
  close() {
    this.b = true;
  }
// Event handlers for various form fields.
  industrytype(e: any) {
  }
  jobroletype(e: any) {
    // console.log('jobrole=====>', e.target.value);
  }

  salarytype(e: any) {
    // console.log('salaryType=====>', e.target.value);
  }
  workExp(e: any) {
    // console.log('workStatus=====>', e.target.value);
  }
  Noticeperiod(e: any) {
    this.noticeperiod = e.target.value;
    // console.log('Noticeperiod=====>', this.noticeperiod);
  }
  Employmenttype(e: any) {
    // console.log('Employmenttype=====>', e.target.value);
  }
// Function to handle checkbox state changes. 
  checkbox(e: any) {
    if (e.target.checked) {
      this.workExperience.controls['endDate'].setValidators(null);
      this.workExperience.controls['endDate'].updateValueAndValidity();
    } else {
      this.workExperience.controls['endDate'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['endDate'].updateValueAndValidity();
    }
  }
// Function to handle checkbox state changes.
  checkbox1() {
    // console.log("click s", this.Enddate)
    // console.log("click s", typeof (this.Enddate))
    if (this.Enddate > 1) {
      this.workExperience.controls['startDate'].setValidators(null);
      this.workExperience.controls['startDate'].updateValueAndValidity();
    } else {
      this.workExperience.controls['startDate'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['startDate'].updateValueAndValidity();
    }
  }

  checkbox2() {
    console.log('drgfhjkhgfdrgh');
    this.currentWorkStatus = true;
  }


  // Input validation functions for alphabetic characters and numeric characters.

  public inputValidator(event: any) {
    const pattern = /^[a-zA-Z]*[ ]$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z  ]/g, '');
      // invalid character, prevent input
    }
  }

  public inputValidator1(event: any) {
    const pattern = /^[0-9]*[,]$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9,]/g, '');
      // invalid character, prevent input
    }
  }

  // Function to change currency text to a proper format.

  changeToCurrency(currencyTextRef: any) {
    const currency = this.workExperience.get('endDate');
    this.currncyLength = this.currency.value.length;
    let a = this.currency.value;
    a = a.replace(/,/g, '');
    if (a && !isNaN(+a)) {
      let num: number = +a;
      let temp = new Intl.NumberFormat('en-IN').format(num); //inplace of en-IN you can mention your country's code
      temp = temp ? temp.toString() : '';
      this.currency.setValue(temp);
    }
    if (this.currncyLength == 9) {
      this.messageForCurrency = 'Please enter correct endDate';
      return;
    } else {
      this.messageForCurrency = '';
    }
  }

  leavingDate(event: any) {
    this.leavedataaa = event.target.value;
    // console.log('=========>', this.leavedataaa);
  }
  joiningDate(event: any) {
    this.joindataaa = event.target.value;
    console.log(',,,,,,,,,,', this.joindataaa);
    this.calculateDiff();
    this.validDate1();
  }

  calculateDiff() {
    this.joindate = new Date(this.joindataaa);
    this.leaveDate = new Date(this.leavedataaa);

    if (this.joindate.getMonth >= this.leaveDate.getMonth) {
      // console.log('........', false);
      return false;
    } else {
      // alert('please select valid start and end date')
      // console.log('........', true);
      return true;
    }

    // this.diff = Math.floor((Date.UTC(this.leaveDate.getFullYear(), this.leaveDate.getMonth(), this.leaveDate.getDate()) - Date.UTC(this.joindate.getFullYear(), this.joindate.getMonth(), this.joindate.getDate()) ) /(1000 * 60 * 60 * 24));
    // console.log ("difference between the issedate and expiration date is the",this.diff)
  }
  formattedDate: any;
  invalidExprange: any
  validDate1() {
    console.log("helloooo")
    const date2 = new Date(this.joindataaa);
    const date = new Date(this.dateCheck);
    console.log("job", this.joindataaa)
    date.setFullYear(date.getFullYear() + 15);
    // Format the resulting date back into the desired format (yyyy-MM-dd)
    //const year1 = date2.getFullYear();
    const year = date.getFullYear();
    console.log("formated date", year)
    //console.log("formated date",year1)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    console.log("formated date", this.formattedDate)
    this.formattedDate = `${year}-${month}-${day}`;
    if (this.joindataaa < year) {
      return false
    }
    else {
      return true;
    }
  }
  StartdateValidator()  {
    let ldStartDate = this.workExperience.value['startDate'];
    const date = new Date(this.dateCheck);
    date.setFullYear(date.getFullYear() + 15);
    // Format the resulting date back into the desired format (yyyy-MM-dd)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    this.formattedDate = `${year}-${month}-${day}`;
    if (ldStartDate < this.formattedDate) {
      return this.workExperience.controls['endDate'].setErrors({
        invalidExprange: true,
      });
    }
  }
  comparisonEnddateValidator(): any {
    let ldStartDate = this.workExperience.value['startDate'];
    let ldEndDate = this.workExperience.value['endDate'];
    let startnew = new Date(ldStartDate);
    let endnew = new Date(ldEndDate);
    if (startnew > endnew) {
      return this.workExperience.controls['endDate'].setErrors({
        invaliddaterange: true,
      });
    }
    let oldvalue = startnew;
    this.workExperience.controls['startDate'].reset();
    this.workExperience.controls['startDate'].patchValue(oldvalue);
    return this.workExperience.controls['startDate'].setErrors({
      invaliddaterange: false,
    });
  }
  comparisonStartdateValidator(): any {
    let ldStartDate = this.workExperience.value['startDate'];
    let ldEndDate = this.workExperience.value['endDate'];
    let startnew = new Date(ldStartDate);
    let endnew = new Date(ldEndDate);
    if (startnew > endnew) {
      return this.workExperience.controls['startDate'].setErrors({
        invaliddaterange: true,
      });
    }
    let oldvalue = endnew;
    this.workExperience.controls['endDate'].reset();
    this.workExperience.controls['endDate'].patchValue(oldvalue);
    return this.workExperience.controls['endDate'].setErrors({
      invaliddaterange: false,
    });
  }

  workstatus(e: any) {
    this.work = e;
    // console.log('========', this.work);
    this.show_fresher = false;
    this.show_experience = false;
    if (this.work == 'fresher') {
      this.show_fresher = true;
    } else {
      this.show_experience = true;
    }
  }

  NoticePeriod(e: any) {
    this.noticeperiod = e;
    // console.log('Notice Period is--------->', this.noticeperiod);
    this.show_noNotice = false;
    this.show_15 = false;
    this.show_30 = false;
    this.show_45 = false;
    this.show_60 = false;
    this.show_90 = false;

    switch (this.noticeperiod) {
      case 'NoNotice':
        this.show_noNotice = true;
        break;
      case '15days':
        this.show_15 = true;
        break;
      case '30days':
        this.show_30 = true;
        break;
      case '45days':
        this.show_45 = true;
        break;
      case '60days':
        this.show_60 = true;
        break;
      case '90days':
        this.show_90 = true;
        break;
    }
  }

  EmploymentType(e: any) {
    this.employmenttype = e;
    // console.log('Employment type is--------->', this.employmenttype);
    this.show_full = false;
    this.show_part = false;
    this.show_contract = false;
    this.show_internship = false;

    switch (this.employmenttype) {
      case 'fulltime':
        this.show_full = true;
        break;
      case 'parttime':
        this.show_part = true;
        break;
      case 'contract':
        this.show_contract = true;
        break;
      case 'internship':
        this.show_internship = true;
        break;
    }
  }

  disable() {
    this.togglebutton = !this.togglebutton;


    if (this.togglebutton) {
      console.log('111111');
      this.currentWorkStatus = false;
    } else {
      console.log('222222');
      this.currentWorkStatus = true;
    }
    // this.currentWorkStatus = !this.currentWorkStatus;
    // console.log(this.currentWorkStatus);

    // console.log(this.togglebutton);
  }

  text(value: boolean) {
    this.submitWorkStatus = value;
    if (value == false) {
      // this.formValue.value.currentlyWorking='';
      this.workExperience.value.jobTitle = '';
      this.workExperience.value.companyName = '';
      this.workExperience.value.joiningDate = '';
      this.workExperience.value.leavedataaa = '';
      this.workExperience.value.salary = '';
      this.workExperience.value.noticePeriod = '';
      this.formStatus = 'hidden';
      this.btnStatus = '';
      this.alerts4 = '';
    } else {
      this.formStatus = '';
      this.btnStatus = 'hidden';
      if ((value = !true)) {
        this.alerts4 = 'Please select a value';
      } else {
        this.alerts4 = '';
      }
    }
  }
  btnChange1() {
    this.btnshowgray = false;
    this.btnshowgreen = true;
    localStorage.setItem('Exp', 'No')
  }
  btnChange2(){
    this.btnshowgray= true;
    this.btnshowgreen=false;
    localStorage.setItem('Exp','Yes')
  }
  // Function to handle the display of work status based on a boolean value.
  onWorkStatusDisplay(value: boolean) {
    this.submitWorkStatus = value;
    // If value is false, hide the form and show the button.
    if (value == false) {
      this.displayForm = 'hidden';
      this.btnStatus = '';
      
    } else {
      // If value is true, show the form and hide the button, and set validators for form controls.
      this.displayForm = '';
      this.btnStatus = 'hidden';
      // Set validators for various form controls.
      this.workExperience.controls['companyName'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['companyName'].updateValueAndValidity();
      // Set validators for various form controls.
      this.workExperience.controls['jobRole'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['jobRole'].updateValueAndValidity();
      // Set validators for various form controls.
      this.workExperience.controls['industryType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['industryType'].updateValueAndValidity();

      this.workExperience.controls['startDate'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['startDate'].updateValueAndValidity();

      this.workExperience.controls['endDate'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['endDate'].updateValueAndValidity();

      this.workExperience.controls['noticePeriod'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();

      this.workExperience.controls['currentMonthlySalary'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls[
        'currentMonthlySalary'
      ].updateValueAndValidity();

      this.workExperience.controls['employmentType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['employmentType'].updateValueAndValidity();

      this.workExperience.controls['salaryType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['salaryType'].updateValueAndValidity();
    }
    this.text(value);
  }

  // Function to handle radio button click for "Fresher."

  fresherRadioBtn() {
    this.values = false;
    // If values is false, remove validators for form controls.
    if (this.values == false) {
      this.workExperience.controls['companyName'].setValidators(null);
      this.workExperience.controls['companyName'].updateValueAndValidity();

      this.workExperience.controls['defaultradio'].setValidators(null);
      this.workExperience.controls['defaultradio'].updateValueAndValidity();

      this.workExperience.controls['jobRole'].setValidators(null);
      this.workExperience.controls['jobRole'].updateValueAndValidity();

      this.workExperience.controls['industryType'].setValidators(null);
      this.workExperience.controls['industryType'].updateValueAndValidity();

      this.workExperience.controls['startDate'].setValidators(null);
      this.workExperience.controls['startDate'].updateValueAndValidity();

      this.workExperience.controls['endDate'].setValidators(null);
      this.workExperience.controls['endDate'].updateValueAndValidity();

      this.workExperience.controls['noticePeriod'].setValidators(null);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();

      this.workExperience.controls['currentMonthlySalary'].setValidators(null);
      this.workExperience.controls[
        'currentMonthlySalary'
      ].updateValueAndValidity();

      this.workExperience.controls['employmentType'].setValidators(null);
      this.workExperience.controls['employmentType'].updateValueAndValidity();

      this.workExperience.controls['salaryType'].setValidators(null);
      this.workExperience.controls['salaryType'].updateValueAndValidity();
    }
  }

  // Function to handle radio button click for "Experienced."

  experiencedRadioBtn() {
    if (this.values) {
      this.workExperience.controls['companyName'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['companyName'].updateValueAndValidity();

      this.workExperience.controls['defaultradio'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['defaultradio'].updateValueAndValidity();

      this.workExperience.controls['jobRole'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['jobRole'].updateValueAndValidity();

      this.workExperience.controls['industryType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['industryType'].updateValueAndValidity();

      this.workExperience.controls['startDate'].setValidators(null);
      this.workExperience.controls['startDate'].updateValueAndValidity();

      this.workExperience.controls['endDate'].setValidators(null);
      this.workExperience.controls['endDate'].updateValueAndValidity();

      this.workExperience.controls['noticePeriod'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();

      this.workExperience.controls['currentMonthlySalary'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls[
        'currentMonthlySalary'
      ].updateValueAndValidity();

      this.workExperience.controls['employmentType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['employmentType'].updateValueAndValidity();

      this.workExperience.controls['salaryType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['salaryType'].updateValueAndValidity();
    }
  }

  // Function to handle working status.

  workingstatus() {
    this.values = true;
    // If values is true, set validators for form controls.
    if (this.values == true) {
      this.workExperience.controls['companyName'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['companyName'].updateValueAndValidity();

      this.workExperience.controls['jobRole'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['jobRole'].updateValueAndValidity();

      this.workExperience.controls['industryType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['industryType'].updateValueAndValidity();

      this.workExperience.controls['startDate'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['startDate'].updateValueAndValidity();

      this.workExperience.controls['endDate'].setValidators(null);
      this.workExperience.controls['endDate'].updateValueAndValidity();

      this.workExperience.controls['noticePeriod'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();

      this.workExperience.controls['currentMonthlySalary'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls[
        'currentMonthlySalary'
      ].updateValueAndValidity();

      this.workExperience.controls['employmentType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['employmentType'].updateValueAndValidity();

      this.workExperience.controls['salaryType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['salaryType'].updateValueAndValidity();
    } else {
      // If values is false, set validators for form controls.
      this.workExperience.controls['companyName'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['companyName'].updateValueAndValidity();

      this.workExperience.controls['jobRole'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['jobRole'].updateValueAndValidity();

      this.workExperience.controls['industryType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['industryType'].updateValueAndValidity();

      this.workExperience.controls['startDate'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['startDate'].updateValueAndValidity();

      this.workExperience.controls['endDate'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['endDate'].updateValueAndValidity();

      this.workExperience.controls['noticePeriod'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();

      this.workExperience.controls['currentMonthlySalary'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls[
        'currentMonthlySalary'
      ].updateValueAndValidity();

      this.workExperience.controls['employmentType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['employmentType'].updateValueAndValidity();

      this.workExperience.controls['salaryType'].setValidators([
        Validators.required,
      ]);
      this.workExperience.controls['salaryType'].updateValueAndValidity();
    }
  }

  //  dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
  //   const dob = new Date(control.value);
  //   const jobStartDate = new Date();

  //   // Calculate the minimum allowed date for job starting (15 years from DOB)
  //   const minJobStartDate = new Date(dob);
  //   minJobStartDate.setFullYear(minJobStartDate.getFullYear() + 15);

  //   if (jobStartDate < minJobStartDate) {
  //     return { dateOfBirthValidator: true };
  //   }

  //   return null;
  // }
  jobStartDateValidator(dateOfBirth: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const jobStartDate = new Date(control.value);
      console.log('heloooooooo');
      // Calculate the minimum allowed date for job starting (15 years from dateOfBirth)
      const minJobStartDate = new Date(dateOfBirth);
      minJobStartDate.setFullYear(minJobStartDate.getFullYear() + 15);

      if (jobStartDate < minJobStartDate) {
        return { jobStartDateValidator: true };
      }

      return null;
    };
  
  }
}
