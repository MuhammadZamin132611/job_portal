import { Component, OnInit } from '@angular/core';
import { AddProjectService } from '../services/add-project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { Project } from '../model/projects.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css'],
  providers: [
    DatePipe
  ]
})
export class EditProjectsComponent implements OnInit {
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

  constructor(private navigate: Router, private router: ActivatedRoute, private addProjectService: AddProjectService, private datePipe: DatePipe, private location: Location) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("userId", this.jobSeekerDetailsId)
  }

  projectVariables: Project | any = new Project();
  projectForm = new FormGroup({
    projectName: new FormControl("", Validators.required),
    associatedWith: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    startDate: new FormControl(""),
    endDate: new FormControl(""),
    projectDescription: new FormControl("", Validators.required),
    projectUrl: new FormControl("", Validators.required),
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
  projectId: any;
  ngOnInit(): void {
    this.toGetskills();
    this.toGetJobRoles();
    this.toGetLocation();
    this.router.queryParams.subscribe((res: any) => {
      console.log('project id reg', res)
      this.projectId = res.projectId;
      this.addProjectService.getSingleProjects(this.jobSeekerDetailsId, this.projectId).subscribe((dat: any) => {
        // this.startYear=dat.startDate;
        // this.endYear=dat.endDate;
        this.projectForm.controls['projectName'].setValue(dat.projectName);
        this.projectForm.controls['associatedWith'].setValue(dat.associatedWith);
        this.projectForm.controls['client'].setValue(dat.client);
        this.projectForm.controls['startDate'].setValue(dat.startDate);
        this.projectForm.controls['endDate'].setValue(dat.endDate);
        this.projectForm.controls['projectDescription'].setValue(dat.projectDescription);
        this.projectForm.controls['projectUrl'].setValue(dat.projectUrl);
        this.projectForm.controls['location'].setValue(dat.location);
        this.projectForm.controls['currentlyWorking'].setValue(dat.currentlyWorking);
        this.projectForm.controls['empType'].setValue(dat.empType);
        this.projectForm.controls['workType'].setValue(dat.workType);
        this.projectForm.controls['projectSite'].setValue(dat.projectSite);
        this.projectForm.controls['role'].setValue(dat.role);
        this.projectForm.controls['roleDescription'].setValue(dat.roleDescription);
        this.selecetNewSkills = dat.skillsUsed

        console.log("hellooo",this.projectForm.controls['startDate'])
        console.log("hellooo",this.startYear)
      })
    })
  }
  var: any
  submitted: boolean = false;
  get validator() {
    return this.projectForm.controls
  }

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
      this.updateProject();
    }
  }

  addProject() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid && this.selecetNewSkills.length > 0 && this.selecetNewJobRoles.length > 0 && this.selecetNewLocation.length > 0 && this.count == 1 && this.count1 == 1) {
      console.log('post data')
      // this.addNewProject();
      this.updateProject()
    }
    else {
      console.log('not post data')
      this.updateProject()

    }
    console.log(this.projectVariables, "role check")
    console.log(this.selecetNewSkills.length, "this.selecetNewSkills.length<=0")

  }


  updateProject() {
    console.log('clicked')
    console.log("staret",this.startYear)
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
    this.addProjectService.updateSingleProjectDetails(this.jobSeekerDetailsId, this.projectId, this.projectVariables).subscribe((res: any) => {
      console.log('data updated !!', this.projectForm, res)
      this.navigate.navigate(['/dashboard/profile']);
      // this.navigate.navigate(['/dashboard/profile/achievements/showall-achievement'])

    })
  }

  isPopupVisible3 = false;
  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3;
  }
  deleteProjects() {
    this.addProjectService.deleteProject(this.jobSeekerDetailsId, this.projectId).subscribe((resp) => {
      console.log(resp);
      this.navigate.navigate(['dashboard/profile/projects/showall-project'])

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

  removeLanguage(e: any) {
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
  dob(e: any) {
    console.log(e.detail.value);
    this.DOBB = e.detail.value;
    this.startYear = this.datePipe.transform(this.DOBB, "yyyy-MM-dd");
    console.log("the Start year", this.startYear, typeof (this.startYear));
    console.log(this.DOBB);
    if (this.startYear != 'string') {
      this.isVaild = true;
    } else {
      this.isVaild = false;
    }
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
      this.count = 0
    } else {
      this.isDiv = true
      this.count = 1
    }
  }

  dateDidderence() {
    this.startdate = new Date(this.startYear)
    this.enddate = new Date(this.endYear)
    this.difference = Math.floor(this.enddate - this.startdate)
    console.log("=====>", this.difference)
    this.differenceinyears = Math.floor((this.difference / (1000 * 3600 * 24)) / 365);
    console.log("=====>", this.differenceinyears)
  }

}
