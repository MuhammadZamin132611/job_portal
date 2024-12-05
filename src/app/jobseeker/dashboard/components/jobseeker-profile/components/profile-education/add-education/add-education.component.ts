import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AddEducatiomService } from '../services/add-education.service';
import { DatePipe } from '@angular/common';
import { educationDetails1 } from '../models/Education.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css'],
  providers: [
    DatePipe
  ]
})


export class AddEducationComponent implements OnInit {

  masterDataHigheatQualification: any;
  selected: boolean[] = [false, false, false, false, false, false, false, false];
  qualification: any = '';
  masterDatacourselist: any;
  masterDatacourselistFilter: any;
  errorMsgOfcourse: string;
  selectedcourse: any = ''
  replaceSelectedcours: string;
  masterDataSpecilazationlist: any;
  masterDataSpecilazationlistFilter: any;
  errorMsgOfSpecilazation: string;
  selectedSpecilization: any = ''
  SelectedEducationtype: string = "";
  SelectedUniversityName: any = ''
  displayForm: string;
  displayForm1: string;
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
  currentlyPursuing: boolean = false;
  startyear: any = '';
  endyear: any = '';
  educationDetails: educationDetails1 = new educationDetails1()
  jobSeekerDetailsId: string | null;
  displayForm2: string;
  isSubmitClicked = false;
  isValidUniversity: boolean = true
  isValidDegree: boolean = true
  isValideducationtype: boolean = true
  isValidSpecialization: boolean = true
  isValidEndYear: boolean = true
  isValidStartYear: boolean = true
  Universitymessage = "Please select your University"
  degreeMessage: string = "Please select your Degree";
  specializationMessage: string = "Please select your specialization";
  yearOfPassoutMessage: string = "Please select  Endyear";
  yearOfPassoutMessage1: string = "Please select  Startyear";
  educationtypeMessage: string = "Please select your Education type";
  masterDatauUiversity: any;
  masterDataUniversitylistFilter: any;
  errorMsgOfuniversity: string;
  isPopupVisible1 = false;
  isPopupVisible2 = false;
  dataOfBirthn: Date;
  Fulltimechecked: boolean = false;
  Parttimechecked: boolean = false;
  startDate: any;
  endDate: any;
  difference: number;
  differenceinyears: number;
  alerts99: string;



  constructor(private location1: Location, private api: AddEducatiomService, private datePipe: DatePipe, private router: Router) { }
  goBack(): void {
    this.location1.back();
  }

  ngOnInit(): void {
    this.getMaterdataUniversityName()
    this.getMasterDataHighestQualification()
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

  getMaterdataUniversityName() {
    this.api.getMasterDataUniversitylist().subscribe(data => {
      this.masterDatauUiversity = data
      console.log("getting highestqualificationlist from master data is --->", this.masterDatauUiversity)
      this.masterDataUniversitylistFilter = this.masterDatauUiversity
    });
  }
  getMasterDataHighestQualification() {
    this.api.getMasterDataHighestQualificationlist().subscribe(data => {
      this.masterDataHigheatQualification = data
      console.log("getting highestqualificationlist from master data is --->", this.masterDataHigheatQualification)

    });
  }

  skillSubmit1(data: any) {
    this.isSubmitClicked = true;
    console.log("data", data)
    if (data.valid) {
      console.log(data.vaild)
      console.log("hey nagivagte");
      this.dateDidderence()
      this.Proceed();

    }
  }

  HighestQualification(e: any) {
    this.qualification = e
    this.displayForm = '';
    this.displayForm1 = '';
    this.selectedcourse = ''
    this.selectedSpecilization = ''
    this.SelectedEducationtype = ''
    this.endyear = '';
    this.startyear = ''
    this.isValidDegree = true;
    this.isValidSpecialization = true;
    this.isValideducationtype = true;
    this.isValidEndYear = true
    this.isValidStartYear = true
    this.Fulltimechecked = false
    this.Parttimechecked = false
    console.log("the Highest qualification is=========>", this.qualification)

    for (let i = 0; i < this.selected.length; i++) {
      this.selected[i] = false
    }

    switch (this.qualification) {
      case "Doctorate":
        this.selected[0] = true;
        break;
      case "Post Graduation":
        this.selected[1] = true;
        break;
      case "Graduation":
        this.selected[2] = true;
        break;
      case "Diploma":
        this.selected[3] = true;
        break;
      case "ITI":
        this.selected[4] = true;
        break;
      case "12th Pass":
        this.selectedSpecilization = 'NA'
        this.displayForm1 = 'hidden';
        this.isValidSpecialization = false;
        this.selected[5] = true;
        break;

      case "10th Pass":
        this.selectedcourse = 'NA'
        this.selectedSpecilization = 'NA'
        this.displayForm1 = 'hidden';
        this.isValidDegree = false;
        this.isValidSpecialization = false;
        this.selected[6] = true;
        break;

      case "Below 10th":
        this.SelectedEducationtype = "FULLTIME"
        this.selectedcourse = 'NA'
        this.selectedSpecilization = 'NA'
        this.displayForm = 'hidden';
        this.isValidDegree = false;
        this.isValidSpecialization = false;
        this.isValideducationtype = false;
        this.isValidEndYear = false;
        this.isValidStartYear = false;
        this.selected[7] = true;
        break;

    }
    this.api.getMasterDatacourselist(this.qualification).subscribe(data => {
      this.masterDatacourselist = data
      // console.log("the courselist from master data is", this.masterDatacourselist)
      this.masterDatacourselistFilter = this.masterDatacourselist
    });

  }

  masterUniversityFilter(e: any) {

    console.log(e.value)
    this.masterDatauUiversity = [...this.masterDataUniversitylistFilter.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]

    if (this.masterDatauUiversity.length == 0) {
      this.errorMsgOfuniversity = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfuniversity = '';
    }

  }


  masterCourseFilter(e: any) {
    console.log(e.value)
    this.masterDatacourselist = [...this.masterDatacourselistFilter.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]

    if (this.masterDatacourselist.length == 0) {
      this.errorMsgOfcourse = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfcourse = '';
    }
  }

  onClickUniversity(e: any) {
    this.SelectedUniversityName = e
    this.isValidUniversity = false;
    console.log("the selected University name is", this.SelectedUniversityName)
  }

  onClickCourse(e: any) {
    this.selectedcourse = e;
    console.log("the selected course is", this.selectedcourse)
    this.replaceSelectedcours = this.selectedcourse.replace("/", "%2F");
    this.api.getMasterDataSpecilazationlist(this.replaceSelectedcours).subscribe(data => {
      this.masterDataSpecilazationlist = data
      this.isValidDegree = false;
      this.masterDataSpecilazationlistFilter = this.masterDataSpecilazationlist

    });

  }

  masterSpecilazationFilter(e: any) {
    console.log(e.value)
    this.masterDataSpecilazationlist = [...this.masterDataSpecilazationlistFilter.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))]

    if (this.masterDataSpecilazationlist.length == 0) {
      this.errorMsgOfSpecilazation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfSpecilazation = '';
    }
  }

  onClickSpecilization(e: any) {
    this.selectedSpecilization = e
    this.isValidSpecialization = false;
    console.log("the selected specilization is", this.selectedSpecilization)
  }

  onClickEducationtype(e: any) {
    this.SelectedEducationtype = e
    if (this.SelectedEducationtype == "FULLTIME") {
      this.Fulltimechecked = true
      this.Parttimechecked = false
    } else {
      this.Fulltimechecked = false
      this.Parttimechecked = true
    }
    this.isValideducationtype = false;
    console.log("the education type =========>", this.SelectedEducationtype)

  }
  checkbox() {
    this.currentlyPursuing = !this.currentlyPursuing
    this.isValidEndYear = true
    this.displayForm2 = '';
    this.endyear = '';
    if (this.currentlyPursuing == true) {
      this.isValidEndYear = false
      this.displayForm2 = 'hidden';
    }
    console.log(this.currentlyPursuing)
  }
  startYear(event: any) {
    this.startyear = event.target.value;
    this.startyear = this.datePipe.transform(this.startyear, "yyyy-MM-dd");
    console.log("the passing year is", this.startyear);
    this.isValidStartYear = false;

  }
  endYear(event: any) {
    this.endyear = event.target.value;
    this.endyear = this.datePipe.transform(this.endyear, "yyyy-MM-dd");
    console.log("the passing year is", this.endyear);
    this.isValidEndYear = false

    if (this.endyear < this.startyear) {
      this.alerts99 = "Leaving date must greater than joining date";
      console.log("date mismatch")
      // this.projectForm.controls['endDate'].setValidators([Validators.required]);
      // this.projectForm.controls['endDate'].updateValueAndValidity();
      return; 
    }
    else{
      console.log("Date is correct")
      // this.projectForm.controls['endDate'].setValidators(null);
      // this.projectForm.controls['endDate'].updateValueAndValidity();
    }
    // console.log(this.Enddate);
    // if (e.target.value) {
      // this.projectForm.controls['endDate'].setValidators(null);
      // this.projectForm.controls['endDate'].updateValueAndValidity();
      // this.currentlyWorking = true;
      // this.count = 1;
    // } else {
      // this.projectForm.controls['endDate'].setValidators([Validators.required,]);
      // this.projectForm.controls['endDate'].updateValueAndValidity();
      // this.currentlyWorking = false;
    // }
  }

  

  dateDidderence() {
    this.startDate = new Date(this.startyear)
    this.endDate = new Date(this.endyear)
    this.difference = Math.floor(this.endDate - this.startDate)
    console.log("=====>", this.difference)
    this.differenceinyears = Math.floor((this.difference / (1000 * 3600 * 24)) / 365);
    console.log("=====>", this.differenceinyears)
    if (this.differenceinyears < 0) {
      this.alerts99 = ' leaving date must greater than joining date';
      return;
    } else if (this.differenceinyears == 0) {
      this.alerts99 = 'leaving date should not equal to joining date ';
      return;
    } else {
      this.alerts99 = '';
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

  Proceed() {

    if (this.differenceinyears < 1) {
      this.alerts99 = " End date must greater than start date"
      return;
    }
    else {
      this.alerts99 = "";
    }

    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log(this.jobSeekerDetailsId)

    this.educationDetails.qualification = this.qualification;
    this.educationDetails.course = this.selectedcourse;
    this.educationDetails.specialization = this.selectedSpecilization;
    this.educationDetails.currentlyPursuing = this.currentlyPursuing
    this.educationDetails.startDate = this.selectDate
    this.educationDetails.endDate = this.seletedEndYear
    this.educationDetails.collegeName = this.SelectedUniversityName
    this.educationDetails.courseType = this.SelectedEducationtype

    console.log("education details are", this.educationDetails)
    this.api.postEducation(this.educationDetails, this.jobSeekerDetailsId)
      .subscribe((data: any) => {


      })
    this.router.navigate(['dashboard/profile'])
  }


  isPopupVisibleEducate = false;
  togglePopupEducate() {

    this.isPopupVisibleEducate = !this.isPopupVisibleEducate;

  }
  isPopupVisibleSpecial = false;
  togglePopupSpecial() {

    this.isPopupVisibleSpecial = !this.isPopupVisibleSpecial;

  }
  isPopupVisibleDegree = false;
  togglePopupDegree() {
    this.isPopupVisibleDegree = !this.isPopupVisibleDegree;
  }

  togglePopup1() {

    this.isPopupVisible1 = !this.isPopupVisible1;

  }
  togglePopup2() {

    this.isPopupVisible2 = !this.isPopupVisible2;

  }
  isPopupVisibleCollege = false
  togglePopupcollege() {
    this.isPopupVisibleCollege = !this.isPopupVisibleCollege;
  }


  

}



