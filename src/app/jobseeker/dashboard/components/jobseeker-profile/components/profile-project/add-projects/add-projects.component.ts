import { Component, OnInit } from '@angular/core';
import { AddProjectService } from '../services/add-project.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Project } from '../model/projects.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css'],
  providers: [
    DatePipe
  ]
})
export class AddProjectsComponent implements OnInit {
  isPopupVisibleSkills = false
  skills: any = [];
  startYear: any;
  isPopupVisible1 = false;
  isPopupVisible2 = false;
  // projectForm !: FormGroup;
  startdate: any;
  endYear: any;
  enddate: any;
  difference: any;
  differenceinyears: any;
  DOBB: any;
  DOBB1: any;
  Popup: any = false;
  isSubmitted: boolean = false;
  profileID: any;
  showEndDate: boolean = true;
  jobSeekerDetailsId: any;
  ProjectDescription: string = '';
  RoleDescription: string = '';
  plcaholderDate:'eg: 20/10/2023'

  constructor(private navigate: Router, private addProjectService: AddProjectService, private datePipe: DatePipe, private location: Location) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("userId", this.jobSeekerDetailsId)
  }

  projectVariables: Project | any = new Project();
  projectForm = new FormGroup({
    projectName: new FormControl("", Validators.required),
    associatedWith: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    projectDescription: new FormControl("", ),
    projectUrl: new FormControl(""),
    location: new FormControl(""),
    currentlyWorking: new FormControl(""),
    empType: new FormControl("", Validators.required),
    workType: new FormControl("", Validators.required),
    projectSite: new FormControl("", Validators.required),
    role: new FormControl(""),
    roleDescription: new FormControl("", Validators.required),
    skillsUsed: new FormControl(""),
  })


  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.toGetskills();
    this.toGetJobRoles();
    this.toGetLocation();
  }
  submitted: boolean = false;
  get validator() {
    return this.projectForm.controls
  }
  // createReactiveForm() {
  //   this.personalBioForm = this.fb.group({
  //     name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
  //     email: ['', [Validators.required, Validators.email]],
  //     gender: ['', Validators.required],
  //     dateOfBirth: ['', Validators.required],
  //     city: ['', [Validators.required]],
  //     phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+91[ -]?)?[6789]\d{9}$/)
  //       , Validators.minLength(10)]]
  //   });
  // }
  get projectName() { return this.projectForm.get('startDate'); }
  data: any = { date: undefined };
  vadidation() {
    this.submitted = true
    console.log(this.projectForm.value);
    if (this.projectForm.valid) {
      console.log("this form is valid")
      this.addProject();
    }
    else {
      console.log("this form is not valid")
    }
  }

  addProject() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid && this.selecetNewSkills.length > 0 && this.selecetNewJobRoles.length > 0 && this.selecetNewLocation.length > 0) {
      console.log('post data')
      this.addNewProject();
    }
    else {
      console.log('not post data')
    }
    console.log(this.projectVariables, "role check")
    console.log(this.selecetNewSkills.length, "this.selecetNewSkills.length<=0")

  }

  printStartDate(value: any) {
    console.log('Clicked on the input. Date: ', value);
  }
  printEndDate(value: any) {
    console.log('Clicked on the input. Date: ', value);
  }

  addNewProject() {
    this.projectVariables.projectName = this.projectForm.value.projectName;
    this.projectVariables.associatedWith = this.projectForm.value.associatedWith;
    this.projectVariables.client = this.projectForm.value.client;
    this.projectVariables.startDate = this.projectForm.value.startDate;
    this.projectVariables.endDate = this.projectForm.value.endDate;
    this.projectVariables.projectDescription = this.projectForm.value.projectDescription;
    this.projectVariables.projectUrl = this.projectForm.value.projectUrl;
    this.projectVariables.location = this.selecetNewLocation;
    this.projectVariables.currentlyWorking = this.projectForm.value.currentlyWorking;
    this.projectVariables.empType = this.projectForm.value.empType;
    this.projectVariables.workType = this.projectForm.value.workType;
    this.projectVariables.projectSite = this.projectForm.value.projectSite;
    this.projectVariables.role = this.selecetNewJobRoles;
    this.projectVariables.roleDescription = this.projectForm.value.roleDescription;
    this.projectVariables.skillsUsed = this.selecetNewSkills;
    console.log(this.jobSeekerDetailsId, "ID check")
    // this.addProjectService.addNewProjectDetails(this.projectVariables, this.jobSeekerDetailsId).subscribe();


    this.addProjectService.addNewProjectDetails(this.projectVariables, this.jobSeekerDetailsId).subscribe((data) => {
      console.log("Iddd", this.jobSeekerDetailsId)
      console.log("data, data")
      this.navigate.navigate(['dashboard/profile'])

    });
  }


  locations: any = [];

  toGetLocation() {
    this.addProjectService.getLocation().subscribe((data) => {
      this.locations = data;
      console.log("Job Roles ", data)
      this.locationSearch();
      console.log("break")
    });
  }
  errorMsgOfLocation: string;
  searchLocation: string[] = [...this.locations]
  queryLocation: string = '';
  locationSearch() {
    this.searchLocation = this.locations.filter((data: any) => {
      return data.toLowerCase().includes(this.queryLocation.toLowerCase());
    });
    if (this.searchLocation.length == 0) {
      this.errorMsgOfLocation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfLocation = '';
    }
  }

  selecetNewLocation: string = '';
  OnSelectLocation(e: any) {
    console.log(e.target, "element")
    if (e.target.checked) {
      this.selecetNewLocation = e.target.name;
      console.log("selecet New JobRoles  ", this.selecetNewLocation);
    }
    else {
      const index = this.selecetNewLocation.indexOf(e.target.value)
    }
  }

  jobsRoles: any = [];
  toGetJobRoles() {
    this.addProjectService.getJobs().subscribe((data) => {
      this.jobsRoles = data;
      console.log("Job Roles ", data)
      this.jobsSearch();
      console.log("break")
    });
  }
  errorMsgOfJobrole: string;
  queryJobs: string = '';
  searchJobRoles: string[] = [...this.jobsRoles]
  jobsSearch() {
    this.searchJobRoles = this.jobsRoles.filter((data: any) => {
      return data.toLowerCase().includes(this.queryJobs.toLowerCase());
    });
    if (this.searchJobRoles.length == 0) {
      this.errorMsgOfJobrole = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfJobrole = '';
    }
  }
  selecetNewJobRoles: string = '';
  OnSelectJobRole(e: any) {
    console.log(e.target, "element")
    if (e.target.checked) {
      this.selecetNewJobRoles = e.target.name;
      console.log("selecet New JobRoles  ", this.selecetNewJobRoles);
    }
    else {
      const index = this.selecetNewJobRoles.indexOf(e.target.value)
    }
  }

  toGetskills() {
    this.addProjectService.getSkills().subscribe((data) => {
      this.skills = data;
      console.log("data get ", data)
      this.skillsSearch();
      console.log("break")
    });
  }
  errorMsgOfskills: string;

  searchSkillsss: string[] = [...this.skills]
  querySkills: string = '';
  skillsSearch() {
    this.searchSkillsss = this.skills.filter((data: any) => {
      return data.toLowerCase().includes(this.querySkills.toLowerCase());
    });
    if (this.searchSkillsss.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }

  }

  selecetNewSkills: string[] = []
  userSelectedSkill: any[] = [];

  OnSelectSkills(e: any) {
    if (e.target.checked) {
      this.selecetNewSkills.push(e.target.value)
      console.log("selecet New Skills  ", this.selecetNewSkills);
    } else {
      const index = this.selecetNewSkills.indexOf(e.target.value)
      this.selecetNewSkills.splice(index, 1)
    }
  }

  removeSkills(e: any) {
    const index = this.selecetNewSkills.indexOf(e)
    this.selecetNewSkills.splice(index, 1);
    this.userSelectedSkill.length = this.skills.length
    for (let j = 0; j < this.skills.length; j++) {
      if (this.skills[j] == e) {
        this.userSelectedSkill[j] = false
        console.log(this.userSelectedSkill[j], 'remove');
      }
    }
  }

  isPopupVisibleJobs = false;
  togglePopupJobs() {
    this.isPopupVisibleJobs = !this.isPopupVisibleJobs
  }
  isPopupVisibleLocation = false;
  togglePopupLocation() {
    this.isPopupVisibleLocation = !this.isPopupVisibleLocation
  }
  togglePopupSkills() {
    this.isPopupVisibleSkills = !this.isPopupVisibleSkills
  }
  togglePopup1() {

    this.isPopupVisible1 = !this.isPopupVisible1;

  }
  togglePopup2() {

    this.isPopupVisible2 = !this.isPopupVisible2;

  }
  checkduration() {
    let date: any = this.projectForm.controls['startDate'].value
    const dateOfBirth = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.projectForm.controls['startDate'].setErrors({ invalidAge: true });
    } else {
      this.projectForm.controls['startDate'].setErrors(null);
    }
    if (age == null) {
      this.projectForm.controls['startDate'].setErrors({ required: true });
    }
  }
  checkduration1() {
    let date: any = this.projectForm.controls['endDate'].value
    const dateOfBirth = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      this.projectForm.controls['endDate'].setErrors({ invalidAge: true });
    } else {
      this.projectForm.controls['endDate'].setErrors(null);
    }
    if (age == null) {
      this.projectForm.controls['endDate'].setErrors({ required: true });
    }
  }

  isVaild = true;
  count1 = 0
  click1 = () => {
    console.log("hwy date clicked")
    this.count1 = 1
  }
  
  count = 0
  click = () => {
    console.log("hwy date clicked")
    this.count = 1
  }

  dob1(e: any) {

    console.log(e.detail.value);
    this.DOBB1 = e.detail.value;
    this.endYear = this.datePipe.transform(this.DOBB1, "yyyy-MM-dd");
    console.log("the end year", this.endYear);
    console.log(this.endYear, typeof (this.endYear));
  }
  isDiv = false;
  Ischeck = (event: any) => {
    console.log("hey event", event)

    if (this.isDiv) {
      this.isDiv = false
      this.startdate = 1
    } else {
      this.isDiv = true
      this.enddate = 0
    }
  }

  dateDidderence() {
    this.startdate = new Date(this.startYear)
    this.enddate = new Date(this.endYear)
    this.difference = Math.floor(this.enddate - this.startdate)
    console.log("=====>", this.difference)
    this.differenceinyears = Math.floor((this.difference / (1000 * 3600 * 24)) / 365);
    console.log("=====>", this.differenceinyears)
    if (this.differenceinyears < 0) {
      this.alerts99 = ' leaving date must greater than joining date';
      return;
    } else if (this.differenceinyears == 0) {
      this.alerts99 = '';
      return;
    } else {
      this.alerts99 = '';
    }
  }

  checkDateDuration: string
  checkDifferenceStartdateAndEnddate() {
    // if (this.startDate > this.endDate) {
    //   this.checkDateDuration = 'Please enter greater end date'
    //   return;
    // }
    // else{
    //   return '';
    // }
  }

  dob(e: any) {
    console.log(e.target.value);
    this.DOBB = e.target.value;
    this.startYear = this.datePipe.transform(this.DOBB, "yyyy-MM-dd");
    console.log("the Start year", this.startYear, typeof (this.startYear));
    console.log(this.DOBB);
    if (this.startYear != 'string') {
      this.isVaild = true;
    } else {
      this.isVaild = false;
    }
  }

  checkDateValidation: boolean = false
  alerts99:string
  Enddate:any
  end(e: any) {
    this.Enddate = e.target.value;
    this.endYear = this.datePipe.transform(this.Enddate, "yyyy-MM-dd");
    console.log("the end year", this.endYear);
    if (this.checkDateValidation==this.endYear < this.startYear) {
      this.checkDateValidation=true
      this.alerts99 = "";
      console.log("date mismatch")
      this.projectForm.controls['endDate'].setValidators([Validators.required]);
      this.projectForm.controls['endDate'].updateValueAndValidity();
      return; 
    }
    else{
      console.log("Date is correct")
      this.projectForm.controls['endDate'].setValidators(null);
      this.projectForm.controls['endDate'].updateValueAndValidity();
    }
    console.log(this.Enddate);
    if (e.target.value) {
      this.projectForm.controls['endDate'].setValidators(null);
      this.projectForm.controls['endDate'].updateValueAndValidity();
      // this.currentlyWorking = true;
      this.count = 1;
    } else {
      this.projectForm.controls['endDate'].setValidators([Validators.required,]);
      this.projectForm.controls['endDate'].updateValueAndValidity();
      // this.currentlyWorking = false;
    }
    this.dateDidderence();

  }
  

}
