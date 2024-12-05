import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobExperienceService } from '../../../Services/job-experience.service';
import { workDetails1 } from '../models/workExperience';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';



@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css'],
  providers: [
    DatePipe
  ]
})
export class EditExperienceComponent implements OnInit {
  text: string = '';
  showEditPage: boolean = false;
  hideData: boolean = true;
  DOBB: any;
  DOBB1: any;
  Popup: any = false;
  personalBioForm !: FormGroup;
  isPopupVisiblejobRole = false;
  isPopupVisibleIndustry = false;
  isPopupVisibleLocation = false;
  jobSeekerDetailsId: any;
  workExperienceId: any;
  workExperienceById!: FormGroup;
  errorMsgOfIndustry: string;
  rolesFilter: any;
  SelectedIndustry: any = "";
  isValidIndustry: boolean;

  workDetails1: workDetails1 = new workDetails1()
  startYear: any;
  endYear: any;
  SelectedJobRoles: any;
  locationFilter: any;
  workId: any;
  isSubmitClicked = false;

  setdata: any = [];
  isValidEndYear: boolean = true;
  displayForm2: string;
  currentlyWorking: boolean = false;
  alerts99: string;
  isSubmitted: boolean = false;
  errorMsgOfRole: string;


  constructor(private service: JobExperienceService,
    private formbuilder: FormBuilder, private datePipe: DatePipe, private router: Router, private location1: Location) {
    this.jobSeekerDetailsId = localStorage.getItem('profileID')
    this.workExperienceId = localStorage.getItem('workExperienceId')
  }
  goBack(): void {
    this.location1.back();
  }

  noticePeriodOptions: any[] = [
    { id: 'NA', label: 'No Notice Period' },
    { id: '15', label: '15 days' },
    { id: '30', label: '30 days' },
    { id: '45', label: '45 days' },
    { id: '60', label: '60 days' },
    { id: '90', label: '90 days' },
  ];

  isChecked: boolean = false;



  ngOnInit(): void {
    // this.getWorkExperienceById();
    this.getWorkExperience();


    this.workExperienceById = this.formbuilder.group({
      companyName: new FormControl('', [Validators.required]),
      jobRole: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      industryType: new FormControl('', [Validators.required]),
      jobLocation: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      noticePeriod: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      currentlyWorking: new FormControl(),
    });


    this.getindustriesfromservice();
    this.getRolefromservice();
    this.getLocations();


  }

  get form() {
    return this.workExperienceById.controls;
  }


  workExperience: any = [];

  getWorkExperience() {
    this.service.getWorkExperience(this.jobSeekerDetailsId).subscribe((data: any) => {
      this.workExperience = data;
      this.workExperienceCount = this.workExperience.length;
      console.log('the count of workExperience', this.workExperienceCount);
      console.log(this.workExperience, 'Work Experience');
      for (let i = 0; i < this.workExperience.length; i++) {
        this.workExperience[i].condition = this.workExperience[i].companyName.substr(0, 1).toUpperCase();
        console.warn(this.workExperience[i].condition);
      }
    });
  }


  workExperience1: any = [];
  workExperienceCount: number = 0;

  // getWorkExperienceById() {
  //   this.service.getWorkExperienceById(this.jobSeekerDetailsId, this.workExperienceId).subscribe((data: any) => {
  //     this.workExperience1 = data;
  //     console.log(this.workExperience1, 'Work Experience by id');
  //   });
  // }

  getId(value: any) {
    console.log("----------->", value);
    localStorage.setItem('workExperienceId', value);
  }


  onClickJobRoles(e: any) {
    this.SelectedJobRoles = e
    // this.isValidUniversity=false;
    console.log("the selected Job Roles is", this.SelectedJobRoles)
  }

  onClickIndustry(e: any) {
    this.SelectedIndustry = e
    // this.isValidUniversity=false;
    console.log("the selected industry is", this.SelectedIndustry)
  }

  onClickLocation(e: any) {
    this.selectedLocation = e
    // this.isValidUniversity=false;
    console.log("the selected location name is", this.selectedLocation)
  }


  companyName: any;
  department: any;
  noticePeriod: any;
  description: any;
  // startYear: any;
  // EndYear: any;
  EditWork(e: any) {

    this.workId = e
    console.log("this education Id is===>", this.workId)
    this.showEditPage = !this.showEditPage
    for (let i = 0; i < this.workExperience.length; i++) {

      if (this.workExperience[i].workExperienceId == this.workId) {
        console.log("------------------------------+++++++++++++", this.workExperience[i])
        this.setdata = this.workExperience[i]
        console.log("====++++++=======", this.setdata, this.setdata.startDate)
        this.companyName = this.setdata.companyName
        this.department = this.setdata.department
        this.noticePeriod = this.setdata.noticePeriod
        this.description = this.setdata.description
        this.SelectedJobRoles = this.setdata.jobTitle
        this.onClickJobRoles(this.setdata.jobTitle)
        this.SelectedIndustry = this.setdata.industryType
        this.onClickIndustry(this.setdata.industryType)
        this.selectedLocation = this.setdata.location
        this.onClickLocation(this.setdata.location)
        this.seletedEndYear = this.setdata.endDate
        this.selectDate = this.setdata.startDate
        this.currentlyWorking = this.setdata.currentlyWorking
        if (this.currentlyWorking == true) {
          this.isValidEndYear = false
          this.displayForm2 = 'hidden';
        }

      }
    }
  }


  checkbox() {
    this.currentlyWorking = !this.currentlyWorking
    // this.isChecked = !this.isChecked
    this.displayForm2 = '';
    this.endYear = '';
    if (this.currentlyWorking == true) {
      this.displayForm2 = 'hidden';

      this.workExperience.controls['endDate'].setValidators(null);
      this.workExperience.controls['endDate'].updateValueAndValidity();

    } else {
      this.workExperience.controls['endDate'].setValidators([Validators.required,]);
      this.workExperience.controls['endDate'].updateValueAndValidity();

      console.log(this.currentlyWorking)

    }

  }

  selectDate:any
  selectStartDate(event:any){
    this.selectDate = event.target.value
    console.log("print start date ==>", this.selectDate)
  }

  seletedEndYear:any
  selectedEndDate(event:any){
    this.seletedEndYear = event.target.value
    console.log("print start date ==>", this.seletedEndYear)
  }



  editedWork() {

    if (this.differenceinmonths < 1) {
      this.alerts99 = " End date must grater than start date"
      return;
    }
    else {
      this.alerts99 = "";
    }

    this.workDetails1.companyName = this.companyName;
    this.workDetails1.jobTitle = this.SelectedJobRoles;
    this.workDetails1.department = this.department;
    this.workDetails1.industryType = this.SelectedIndustry;
    this.workDetails1.currentlyWorking = this.currentlyWorking
    this.workDetails1.startDate = this.selectDate
    this.workDetails1.endDate = this.seletedEndYear
    this.workDetails1.location = this.selectedLocation
    this.workDetails1.description = this.description
    this.workDetails1.period = this.noticePeriod
    console.log("======+++++>", this.workDetails1)

    this.service.updateWorkExperienceId(this.jobSeekerDetailsId, this.workId, this.workDetails1)
      .subscribe((resp) => {
        console.log('/////', resp)
      });
    this.router.navigate(['dashboard/profile'])
  }


  skillSubmit1() {
    this.isSubmitClicked = true;
    // console.log("data", data)
    if (this.workExperienceById.valid) {
      //console.log(data.vaild)
      console.log("hey nagivagte");
      this.editedWork();
    } else {
      console.log("not able to update work experience");
      console.log(this.workExperienceById.value, "data is missing")

      // return false

    }
  }


  DeleteEdu() {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("===>", this.jobSeekerDetailsId)
    console.log(this.workId)
    this.service.DeleteWorkExperience(this.jobSeekerDetailsId, this.workId)
      .subscribe(res => {
        // alert("Employee Deleted");

      })
    this.router.navigate(['dashboard/profile'])
  }

  isPopupVisible3 = false;
  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3;
  }

  isPopupVisible1 = false;
  isPopupVisible2 = false;
  DurationForm !: FormGroup;
  dataOfBirthn: Date;


  togglePopupjobRole() {
    this.isPopupVisiblejobRole = !this.isPopupVisiblejobRole;
  }

  togglePopupIndustry() {
    this.isPopupVisibleIndustry = !this.isPopupVisibleIndustry;
  }

  togglePopupLocation() {
    this.isPopupVisibleLocation = !this.isPopupVisibleLocation;
  }

  editWorkExp() {
    this.showEditPage = !this.showEditPage
    this.hideData = !this.hideData
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
    console.log("=====>", this.differenceinmonths)
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




  // User Filtering industry are
  searchIndustry(e: any) {
    this.industryFilter = this.industries;
    this.industries = [
      ...this.industryFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];
    console.log(
      'master data filter industries is are ---> ',
      this.industries
    );
    if (this.industries.length == 0) {
      this.errorMsgOfIndustry = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfIndustry = ' ';
    }
  }


  searchRoles(e: any) {
    // this.rolesFilter = this.jobRoles;
    this.jobRoles = [
      ...this.rolesFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      )
    ];
    console.log(
      'master data filter Areaof interest is are ---> ',
      this.industries
    );
    if (this.jobRoles.length == 0) {
      this.jobRoles;
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
  searchLocation(e: any) {
    this.locationFilter = this.locations;
    this.locations = [
      ...this.locationFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];
    console.log(
      'master data filter Areaof interest is are ---> ',
      this.locations
    );
    if (this.locations.length == 0) {
      this.locations;
      this.errorMsgOfIndustry = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfIndustry = ' ';
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
}





