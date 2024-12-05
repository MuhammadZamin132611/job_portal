import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { JobExperienceService } from '../../../Services/job-experience.service';
import { workDetails2 } from '../models/addWorkExperience';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css'],
  providers: [
    DatePipe,
    CurrencyPipe
  ]
})
export class AddExperienceComponent implements OnInit {
  length: number = 0;
  text: string = '';
  DOBB: any;
  DOBB1: any;
  Popup: any = false;
  workExperience !: FormGroup;

  isSubmitted: boolean = false;
  profileID: any;
  startYear: any;
  endYear: any;
  errorMsgOfIndustry: string;
  errorMsgOfLocation: string;
  errorMsgOfRole: string;


  constructor(private formbuilder: FormBuilder, private location1: Location, private currencyPipe: CurrencyPipe, private router: Router, private datePipe: DatePipe, private service: JobExperienceService) { }
  goBack(): void {
    this.location1.back();
  }

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
  isPopupVisible1 = false;
  isPopupVisible2 = false;
  DurationForm !: FormGroup;
  dataOfBirthn: Date;
  isPopupVisiblejobRole = false;
  isPopupVisibleIndustry = false;
  isPopupVisibleLocation = false;
  showEndDate: boolean = true;
  alerts99: string;

  ngOnInit(): void {
    // this.getSummary();

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



    this.workExperience = this.formbuilder.group(
      {
        companyName: new FormControl('', [Validators.required]),
        jobRole: new FormControl('', [Validators.required]),
        department: new FormControl('', [Validators.required]),
        industryType: new FormControl('', [Validators.required]),
        jobLocation: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        salaryType: new FormControl('', [Validators.required]),
        currentMonthlySalary: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        employmentType: new FormControl('', [Validators.required]),
        noticePeriod: new FormControl(''),
        description: new FormControl('', [Validators.required]),
      });

    this.getindustriesfromservice();
    this.getRolefromservice();
    this.getLocations();


  }

  get form() {
    return this.workExperience.controls;
  }

  selectNewStartDate: any
  printStartDate(value: any) {
    this.selectNewStartDate = value
    console.log('Clicked on the input. Date: ', value);
  }

  selectNewEndDate: any
  printEndDate(value: any) {
    this.selectNewEndDate = value
    console.log('Clicked on the input. Date: ', value);
  }

  // formattedAmount: any;
  // amount: any;

  // transformAmount(element: any) {

  //   this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '₹ ');
  //   element.target.value = this.formattedAmount;
  //   console.log("====>currency", this.formattedAmount);
  //   console.log(this.amount, "amount");


  // }

  // transformAmount1(event: any) {

  //   const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
  //   this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, ' ₹ ');
  //   const numericValue = Number(value); // Convert the value to a number
  //   this.amount = numericValue; // Assign the numeric value to the component property
  //   event.target.value = this.formattedAmount;
  //   console.log(this.amount, "amount");

  // }

  formattedAmount: any;
  amount: any;

  transformAmount1(event: any) {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const numericValue = Number(value); // Convert the value to a number
    this.amount = numericValue; // Assign the numeric value to the component property
    this.formattedAmount = this.currencyPipe.transform(this.amount, '₹ ');

    // Format the number without decimal places
    this.formattedAmount = this.formattedAmount.replace(/(\.\d{2})$/, '');

    event.target.value = this.formattedAmount;
    console.log(this.amount, "amount");
  }





  public inputValidator1(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*[,]$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9,]/g, '');
      // invalid character, prevent input
    }
  }


  companyname: string;
  jobrole: string;
  industryType: string;
  currentlyWorking: boolean = false;
  startDate: string;
  endDate: String;
  salaryType: string;
  currentSalary: string;
  workExpId: any;
  description: string;
  location: string;
  Department: string;
  employmentType: string;
  noticePeriod: string;



  workDetails1: workDetails2 = new workDetails2();
  submitForm() {
    console.log("form data =====+++>>> top ", this.workExperience.value);


    this.dateDidderence();

    if (this.differenceinyears < 1 && this.differenceinmonths < 1) {
      this.alerts99 = " End date must grater than start date"
      return;
    }
    else {
      this.alerts99 = "";
    }

    this.profileID = localStorage.getItem('profileID');
    console.log('id================>> ', this.profileID);
    this.isSubmitted = true;
    console.log('valid', this.workExperience.valid);
    if (!this.workExperience.valid) {
      console.log('invalid');

      return false;
    } else {
      this.profileID = localStorage.getItem('profileID');
      console.log('id================>> ', this.profileID);

      const formData = this.workExperience.value;
      console.log("form data =====+++>>>", this.workExperience);
      this.companyname = formData.companyName;
      this.jobrole = this.jobsType;
      this.industryType = this.selectePrimaryIndustry;
      this.currentlyWorking = this.currentlyWorking;
      this.startDate = formData.startDate;
      this.endDate = formData.endDate;
      this.salaryType = formData.salaryType;
      this.currentSalary = this.amount;
      this.description = formData.description;
      this.location = this.selectedLocation;
      this.employmentType = formData.employmentType;
      this.noticePeriod = formData.noticePeriod;
      this.Department = formData.department;

      localStorage.setItem('formValues', JSON.stringify(formData));

      const userWorkExperience = {
        companyname: formData.companyName,
        jobrole: this.jobsType,
        industryType: this.selectePrimaryIndustry,
        currentlyWorking: this.currentlyWorking,
        startDate: formData.startDate,
        endDate: formData.endDate,
        salaryType: formData.salaryType,
        currentSalary: this.amount,
        description: formData.description,
        location: this.selectedLocation,
        employmentType: formData.employmentType,
        noticePeriod: formData.noticePeriod,
        department: formData.department
      };

      console.log('work experience value =====>', userWorkExperience);


      this.workDetails1.companyName = userWorkExperience.companyname;
      this.workDetails1.jobTitle = userWorkExperience.jobrole;
      this.workDetails1.industryType = userWorkExperience.industryType;
      this.workDetails1.currentlyWorking = userWorkExperience.currentlyWorking;
      this.workDetails1.salaryType = userWorkExperience.salaryType;
      this.workDetails1.currentSalary = userWorkExperience.currentSalary;
      this.workDetails1.startDate = userWorkExperience.startDate;
      this.workDetails1.endDate = userWorkExperience.endDate;
      this.workDetails1.description = userWorkExperience.description;
      this.workDetails1.location = userWorkExperience.location;
      this.workDetails1.empType = userWorkExperience.employmentType;
      this.workDetails1.period = userWorkExperience.noticePeriod;
      this.workDetails1.department = userWorkExperience.department;

      this.service
        .postWorkExperience(this.profileID, this.workDetails1)
        .subscribe((res) => {
          console.warn('success=======>', res);
        });



      localStorage.setItem(
        'experienceData',
        JSON.stringify(userWorkExperience)
      );


      this.router.navigate(['dashboard/profile'])

      return true;
    }
  }

  togglePopupjobRole() {
    this.isPopupVisiblejobRole = !this.isPopupVisiblejobRole;
  }

  togglePopupIndustry() {
    this.isPopupVisibleIndustry = !this.isPopupVisibleIndustry;
  }

  togglePopupLocation() {
    this.isPopupVisibleLocation = !this.isPopupVisibleLocation;
  }
  togglePopup1() {

    this.isPopupVisible1 = !this.isPopupVisible1;

  }
  togglePopup2() {

    this.isPopupVisible2 = !this.isPopupVisible2;

  }
  checkduration() {
    //console.log("USING BLUE TO CALL THIS METHOD")
    const dateOfBirth = new Date(this.workExperience.controls['startDate'].value);
    //console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.workExperience.controls['startDate'].setErrors({ invalidAge: true });
    } else {
      this.workExperience.controls['startDate'].setErrors(null);
    }
    if (age == null) {
      this.workExperience.controls['startDate'].setErrors({ required: true });
    }
  }
  checkduration1() {
    //console.log("USING BLUE TO CALL THIS METHOD")
    const dateOfBirth = new Date(this.workExperience.controls['endDate'].value);
    //console.log("TODSDAJK", dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.workExperience.controls['endDate'].setErrors({ invalidAge: true });
    } else {
      this.workExperience.controls['endDate'].setErrors(null);
    }
    if (age == null) {
      this.workExperience.controls['endDate'].setErrors({ required: true });
    }
  }


  dob(e: any) {
    console.log(e.detail.value);
    this.DOBB = e.detail.value;
    this.startYear = this.datePipe.transform(this.DOBB, "yyyy-MM-dd");
    console.log("the Start year", this.startYear);
    console.log(this.DOBB);
  }
  dob1(e: any) {
    console.log(e.detail.value);
    this.DOBB1 = e.detail.value;
    this.endYear = this.datePipe.transform(this.DOBB1, "yyyy-MM-dd");
    console.log("the end year", this.endYear);
    console.log(this.endYear);
  }

  startdate: any;
  enddate: any;
  difference: any;
  differenceinyears: any;
  differenceinmonths: any;

  dateDidderence() {
    this.startdate = new Date(this.startYear)
    this.enddate = new Date(this.endYear)
    this.difference = Math.floor(this.enddate - this.startdate)
    console.log("=====>", this.difference)
    this.differenceinyears = Math.floor((this.difference / (1000 * 3600 * 24)) / 365);
    console.log("=====>", this.differenceinyears)
    this.differenceinmonths = Math.floor((this.difference / (1000 * 3600 * 24)) / 30);
    console.log("==months===>", this.differenceinmonths)
  }

  industries: any = [];
  industryFilter: any = [];
  getindustriesfromservice() {
    this.service.fetchindustryfromMasterdata().subscribe((data: any) => {
      this.industries = data;
      console.log(this.industries, 'Industries');
      this.industryFilter = this.industries;
    });
  }

  jobRolesFilter: any = [];
  jobRoles: any = [];
  getRolefromservice() {
    this.service.rolesfromMasterdata().subscribe((data: any) => {
      this.jobRoles = data;
      console.log(this.jobRoles, 'jobRoles');
      this.jobRolesFilter = this.jobRoles;
    });
  }
  locations: any = [];

  getLocations() {
    this.service.getLocation().subscribe((data: any) => {
      this.locations = data;
      console.log(this.locations, 'locatio');
      this.locationFilter = this.locations;
    });
  }

  rolesFilter: any;
  locationFilter: any;

  // searchIdustry(e: any) {
  //   this.industryFilter = this.industries;
  //   this.industries = [
  //     ...this.industryFilter.filter((user: any) =>
  //       user.toLowerCase().includes(e.value.toLowerCase())
  //     ),
  //   ];
  //   console.log(
  //     'master data filter industries is are ---> ',
  //     this.industries
  //   );
  //   if (this.industries.length == 0) {
  //     this.errorMsgOfIndustry = 'assets/images/amico.svg';
  //   } else {
  //     this.errorMsgOfIndustry = ' ';
  //   }
  // }
  searchIndustry(e: any) {
    console.log(e.value)
    this.industries = [...this.industryFilter.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]

    if (this.industries.length == 0) {
      this.errorMsgOfIndustry = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfIndustry = '';
    }
  }


  searchRoles(e: any) {
    this.rolesFilter = this.jobRoles;
    this.jobRoles = [
      ...this.rolesFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];
    console.log(
      'master data filter Areaof interest is are ---> ',
      this.industries
    );
    if (this.jobRoles.length == 0) {
      this.errorMsgOfIndustry = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfIndustry = ' ';
    }
  }
  // filterRole
  filterRole(e: any) {
    console.log(e.value)
    this.jobRoles = [...this.jobRolesFilter.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]

    if (this.jobRoles.length == 0) {
      this.errorMsgOfRole = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfRole = '';
    }
  }
  searchLocaion(e: any) {
    this.locationFilter = this.locations;
    this.locations = [
      ...this.locationFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];
    console.log(
      'master data filter Areaof interest is are ---> ',
      this.location
    );
    if (this.locations.length == 0) {
      this.errorMsgOfLocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfLocation = ' ';
    }
  }
  searchLocation(e: any) {
    console.log(e.value)
    this.locations = [...this.locationFilter.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]

    if (this.locations.length == 0) {
      this.errorMsgOfLocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfLocation = '';
    }
  }


  selectePrimaryIndustry: any = ' ';
  jobsType: any = ' ';
  selectedLocation: any = ' ';
  sendValue(paragraph: HTMLParagraphElement) {
    this.selectePrimaryIndustry = paragraph.textContent;
    console.log('Industry', this.selectePrimaryIndustry);
    // this.tempLocation = this.selectePrimaryIndustry;
    // call the update value for send data to input box.
    this.updateInput();
  }

  send(paragraph: HTMLParagraphElement) {
    this.jobsType = paragraph.textContent;
    console.log('jobrole', this.jobsType);
    // this.tempLocation = this.selectePrimaryIndustry;
    // call the update value for send data to input box.
    this.update();
  }

  sendLoc(paragraph: HTMLParagraphElement) {
    this.selectedLocation = paragraph.textContent;
    console.log('location', this.selectedLocation);
    // this.tempLocation = this.selectePrimaryIndustry;
    // call the update value for send data to input box.
    this.updateLoc();
  }




  myData: string = '';
  jobs: string = '';
  locData: string = '';

  updateInput() {
    console.log(this.myData.length);
    this.myData = this.selectePrimaryIndustry;
    // this.mainIndustrySend1 = this.myData;
    // this.tempIndustry = this.myData;
  }

  update() {
    console.log(this.jobs.length);
    this.jobs = this.jobsType;
    // this.mainIndustrySend1 = this.myData;
    // this.tempIndustry = this.myData;
  }

  updateLoc() {
    console.log(this.locData.length);
    this.locData = this.selectedLocation;
    // this.mainIndustrySend1 = this.myData;
    // this.tempIndustry = this.myData;
  }





  temp4: string;
  industryCheck() {
    console.log('check Industry type length');
    console.log(this.myData.length);
    if (this.myData.length == 0) {
      this.temp4 = 'Industry type is required*';
      this.workExperience.get('industryType')?.setErrors(null);
      this.workExperience.get('industryType')?.markAsTouched();
      return 'Industry type is required';
    } else {
      this.temp4 = '';
      return '';
    }
  }


  temp5: string;
  jobRoleCheck() {
    console.log('check Job Role length');
    console.log(this.jobs.length);
    if (this.jobs.length == 0) {
      this.temp5 = 'Job Role is required*';
      // Set city field to valid
      this.workExperience.get('jobRole')?.setErrors(null);
      this.workExperience.get('jobRole')?.markAsTouched();
      return 'Job Role is required';
      console.log('It is 0');
    } else {
      this.temp5 = '';
      return '';
    }
  }



  temp6: string;
  locationCheck() {
    console.log('check location length');
    console.log(this.locData.length);
    if (this.locData.length == 0) {
      this.temp6 = 'location is required*';
      // Set city field to valid
      this.workExperience.get('jobLocation')?.setErrors(null);
      this.workExperience.get('jobLocation')?.markAsTouched();
      return 'location is required';
      console.log('It is 0');
    } else {
      this.temp6 = '';
      return '';
    }
  }


  showDate() {
    this.showEndDate = !this.showEndDate;
    this.currentlyWorking = !this.currentlyWorking

    if (this.showEndDate) {
      this.workExperience.controls['noticePeriod'].setValidators(null);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();
    } else {
      this.workExperience.controls['noticePeriod'].setValidators([Validators.required,]);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();
    }
  }

  checkbox(e: any) {
    if (e.target.checked) {
      this.workExperience.controls['endDate'].setValidators(null);
      this.workExperience.controls['endDate'].updateValueAndValidity();

    } else {
      this.workExperience.controls['endDate'].setValidators([Validators.required,]);
      this.workExperience.controls['endDate'].updateValueAndValidity();

    }
  }

  checkBox() {

    if (this.showEndDate) {
      this.workExperience.controls['noticePeriod'].setValidators(null);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();
    } else {
      this.workExperience.controls['noticePeriod'].setValidators([Validators.required,]);
      this.workExperience.controls['noticePeriod'].updateValueAndValidity();
    }

  }

}
