/*
Name: OnboardingSkillEducationComponent - Authered by Sathvik
Date: 06-10-2023
Purpose: This component handles the skill and education information during the onboarding process.
Description: It allows users to input their skills, educational qualifications, and related details.
*/

//1. Imports - Angular Framework - Mandatory
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

//2. Imports - JobCheck Modules - Optional
//None

//3. Imports - JobCheck Services - Mandatory
import { educationDetails } from '../../models/education.model';
import { OnboardingSkillEducationService } from '../../services/onboarding-skill-education.service';
import { SharedService } from '../../services/shared.service';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';
import { skill } from '../../models/skills.model';
import { App } from '@capacitor/app';

//3. Imports - JobCheck Models - Mandatory
//None

//4. Imports - Exception Classes - Optional
//None

//5. Imports - Config Files - Optional
//None

//6. Imports - Utilities - Optional
//None

//7. Imports - Others (External Integrations, APIs, Services) - Optional
//None

@Component({
  selector: 'app-onboarding-skill-education',
  templateUrl: './onboarding-skill-education.component.html',
  styleUrls: ['./onboarding-skill-education.component.css'],
})
export class OnboardingSkillEducationComponent implements OnInit {
  // Declare class properties here...
  DOBB: any;
  c1: HTMLParagraphElement;
  backButtonListener: any;
  dob(e: any) {
    // console.log(e.detail.value);
    this.DOBB = e.detail.value;
    // console.log(this.DOBB);
  }

  degreeMessage: string = 'Please select your Degree';
  specializationMessage: string = 'Please select your specialization';
  yearOfPassoutMessage: string = 'Please select your year of passout';
  isSubmitClicked = false;
  currentlyPursuingM: boolean = false;
  isValidSkill: boolean = true;
  isValidDegree: boolean = true;
  isValidSpecialization: boolean = true;
  isValid: boolean = true;
  profileId: string;
  qualification: any = '';
  show_docterate: boolean = false;
  show_Graduation: boolean = false;
  show_postGraduation: boolean = false;
  show_Diploma: boolean = false;
  show_ITI: boolean = false;
  show_12thPass: boolean = false;
  show_10thPass: boolean = false;
  show_10thBelow: boolean = false;
  masterDataskills: any = [];
  masterDataskillsFilter: any = [];
  masterDataInterest: any = [];
  masterDataInterestFilter: any = [];
  selecetedSkills: any = [];
  selecetedInterest: any = [];
  errorMsgOfskills: string = '';
  errorMsgOfInterst: string = '';
  masterDataHigheatQualification: any;
  masterDatacourselist: any;
  masterDatacourselistFilter: any;
  selectedcourse: any = '';
  errorMsgOfCourse: string;
  skillDetails: skill = new skill();
  masterDataSpecilazationlist: any;
  educationDetails: educationDetails = new educationDetails();
  selected: any = [
    this.show_10thPass,
    this.show_12thPass,
    this.show_10thBelow,
    this.show_Diploma,
    this.show_docterate,
    this.show_Graduation,
    this.show_ITI,
    this.show_postGraduation,
  ];
  selectedSpecilization: any = '';
  replaceSelectedcours: number;
  userselctedskill: any = [];
  userselectedInterest: any = [];
  displayForm: string;
  displayForm1: string;
  areaofInterestCount: number = 0;
  skillCount: number = 0;
  passingyear: string = '';
  jobSeekerDetailsId: any;
  currentlyPursuing: boolean = false;
  edetails: any = [];
  errorMsgOfcourse: string;
  masterDataSpecilazationlistFilter: any;
  errorMsgOfSpecilazation: string;
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
  setdata: any;
  userselectedcourse: any = [];
  userselectedspecillazation: any = [];
  isPopupVisibleaoi = false;
  isPopupVisibleskills = false;
  isPopupVisibleDegree = false;
  isPopupVisibleSpecli = false;
  isDatevisible = false;
  isValidEndYear: boolean = true;
  displayForm2: string;
  showbtn12: boolean = false;
  showbtn13: boolean = false;
  // Togglepopup for area of interest
  togglePopup1aoi() {
    this.isPopupVisibleaoi = !this.isPopupVisibleaoi;
    this.showbtn12 = !this.showbtn12
  }
  // Togglepopup for adding skills
  togglePopupaddskills() {
    this.isPopupVisibleskills = !this.isPopupVisibleskills;
    this.showbtn13 = !this.showbtn13
  }
  // Togglepopup for Degree
  togglePopupDegree() {
    this.isPopupVisibleDegree = !this.isPopupVisibleDegree;
  }
  // Toggle specialization popup...
  togglePopupSpecli() {
    this.isPopupVisibleSpecli = !this.isPopupVisibleSpecli;
  }
  // Toggle date popup...
  togglePopup1() {
    this.isDatevisible = !this.isDatevisible;
  }

  //@ViewChild('Yop') Yop: NgModel;
  constructor(
    private api: OnboardingSkillEducationService,
    private shared: SharedService,
    private elRef: ElementRef,
    private router: Router
  ) {
    let jobSeekerDetailsId = localStorage.getItem('profileID');
    this.backButtonListener = App.addListener('backButton', () => {
      if (window.confirm('Do you want to exit App?')) {
        App.exitApp();
      }
    });
  }
  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  ngOnInit(): void {
    localStorage.setItem('currentPath', window.location.pathname);

    this.profileId = this.shared.getProfileId();
    // console.log("id", this.profileId);
    // this.geteducation()
    this.getMasterDataSkills();
    this.getMasterDataAreaofinterest();
    this.getMasterDataHighestQualification();

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

        // console.log('Offline...');
      })
    );
  }

  checkboxValue = false;
  // Handle checkbox change...
  onCheckboxChange() {
    this.checkboxValue = !this.checkboxValue;
  }
  // Handle skill submission...
  skillSubmit1(data: any) {
    this.isSubmitClicked = true;
    if (data.valid) {
      const skillData = {
        AOI: this.selecetedInterest,
        Skill: this.selecetedSkills,
        Qualification: this.qualification,
        Degree: this.selectedcourse,
        Specilization: this.selectedSpecilization,
        currentlyPursuing: this.currentlyPursuing,
        PassingYear: this.selectedDate,
      };
      localStorage.setItem('skill&Education', JSON.stringify(skillData));
      this.router.navigate(['/onBoarding/workExperience']);
    }
  }

  selectedDate: string;

  onDateSelected(event: any) {
    console.log('Selected Date (Event Value):', event);
    this.selectedDate = event
    console.log('Selected Date:', this.selectedDate);
  }

  isQulified = false;
  isSpecialize = false;
  degmsg = ' ';
  // Validate qualification selection...
  validateQualification() {
    if (this.qualification.length > 0) {
      this.isQulified = false;
      this.togglePopupDegree();
    } else {
      this.isQulified = true;
    }
  }
  // Validate specialization selection...
  validateSpecialize() {
    if (this.qualification.length > 0) {
      if (this.selectedcourse.length > 0) {
        this.isSpecialize = false;
        this.togglePopupSpecli();
      } else {
        this.isSpecialize = true;
        this.degmsg = 'Please select your degree';
      }
    } else {
      this.isSpecialize = true;
      this.degmsg = 'Please select your hightest qualification';
    }
  }
  // Handle highest qualification selection...
  HighestQualification(e: any) {
    this.isQulified = false;
    this.degmsg = 'Please select your degree';
    this.qualification = e;
    this.displayForm = '';
    this.displayForm1 = '';
    this.selectedcourse = '';
    this.selectedSpecilization = '';
    this.isValidDegree = true;
    this.isValidEndYear = true;
    this.isValidSpecialization = true;

    for (let i = 0; i < this.selected.length; i++) {
      this.selected[i] = false;
    }

    // Other methods related to qualification selection...
    // Methods for handling skills and area of interest...
    // Methods for handling course and specialization selection...
    switch (this.qualification) {
      // case '10th Pass':
      //   this.selectedcourse = 'NA';
      //   this.selectedSpecilization = 'NA';
      //   this.displayForm = 'hidden';
      //   this.isValidDegree = false;
      //   this.isValidEndYear = false;
      //   this.isValidSpecialization = false;
      //   this.selected[6] = true;
      //   this.currentlyPursuingM = false;
      //   break;

      case '10+2 Above':
        this.selectedSpecilization = 'NA';
        this.displayForm1 = 'hidden';
        this.selected[1] = true;
        this.isValidSpecialization = false;
        this.currentlyPursuingM = true;

        break;

      case '10 or Below':
        this.selectedcourse = 'NA';
        this.selectedSpecilization = 'NA';
        this.displayForm = 'hidden';
        this.currentlyPursuingM = false;
        this.selected[0] = true;
        this.isValidDegree = false;
        this.isValidEndYear = false;
        this.isValidSpecialization = false;
        break;

      // case 'Diploma':
      //   this.selected[3] = true;
      //   this.currentlyPursuingM = true;
      //   break;
      case 'Doctorate':
        this.selected[2] = true;
        this.currentlyPursuingM = true;
        break;

      case 'Graduation':
        this.selected[3] = true;
        this.currentlyPursuingM = true;
        break;

      case 'ITI':
        this.selected[4] = true;
        this.currentlyPursuingM = true;
        break;

      case 'Post Graduation':
        this.selected[5] = true;
        this.currentlyPursuingM = true;
        break;
      default:
        // console.log("No such heigher qualification exists!");
        this.currentlyPursuingM = true;
        break;
    }
    // getting the courselist from the Master data
    this.api.getMasterDatacourselist(this.qualification).subscribe((data) => {
      this.masterDatacourselist = data;
      // console.log("the courselist from master data is", this.masterDatacourselist.length)
      this.masterDatacourselistFilter = this.masterDatacourselist;
      this.selectedcourselist();
    });
  }
  // getting the skills from the Master data
  getMasterDataSkills() {
    this.api.getMasterDataSkillslist().subscribe((data: any) => {
      this.masterDataskills = data;
      console.log(
        'getting skills from master data is --->',
        this.masterDataskills
      );
      this.masterDataskillsFilter = this.masterDataskills;
    });
  }

  // User Filtering skills are
  masterSkillsFilter(e: any) {
    this.masterDataskills = [
      ...this.masterDataskillsFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];
    // console.log("master data filter Skills are --->", this.masterDataskills)
    if (this.masterDataskills.length == 0) {
      this.errorMsgOfskills = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfskills = '';
    }
  }

  // User selected siklls are

  OnSelectSkills(e: any) {
    if (e.target.checked) {
      this.selecetedSkills.push(e.target.value);
      this.skillCount = this.selecetedSkills.length;
    } else {
      const index = this.selecetedSkills.indexOf(e.target.value);
      this.selecetedSkills.splice(index, 1);
      this.skillCount = this.selecetedSkills.length;
    }
    this.ValidationSkill();
    this.addSkilltoObject();
  }

  //getting data into object

  addSkills: { skillName: 'string'; skillType: 'PRIMARY' }[];
  addSkilltoObject() {
    this.addSkills = this.selecetedSkills.map((value: string) => {
      return { skillName: value, skillType: 'PRIMARY' };
    });
  }
  //  getting the Area of interest data from the Master data is
  getMasterDataAreaofinterest() {
    this.api.getMasterDataAreaOfInterestlist().subscribe((data: any) => {
      this.masterDataInterest = data;

      this.masterDataInterestFilter = this.masterDataInterest;
    });
  }
  // User Filtering area of interest are
  masterInterstFilter(e: any) {
    this.masterDataInterest = [
      ...this.masterDataInterestFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];

    if (this.masterDataInterest.length == 0) {
      this.errorMsgOfInterst = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfInterst = '';
    }
  }

  //Validation Medhod
  AreaOfIntrestMessage: string = 'Please select your area of interest ';
  validationAoi() {
    //let len = this.selecetedInterest.length
    if (this.areaofInterestCount > 0 && this.areaofInterestCount <= 3) {
      this.isValid = false;
      if (this.areaofInterestCount < 4) {
        this.AreaOfIntrestMessage = 'You can select upto 3 areas of interest';
      }
    } else {
      this.isValid = true;
    }
  }

  skillMessage: string = 'Please select your skills';
  ValidationSkill() {
    //let len = this.selecetedInterest.length
    if (this.skillCount >= 1 && this.skillCount <= 9) {
      if (this.skillCount <= 9) {
        this.skillMessage = 'You can select upto 9 skills';
      }
      this.isValidSkill = false;
    } else {
      this.isValidSkill = true;
    }
  }

  // User selected Area of interest are

  OnSelectInterest(e: any) {
    if (e.target.checked) {
      this.selecetedInterest.push(e.target.value);
      this.areaofInterestCount = this.selecetedInterest.length;
    } else {
      const index = this.selecetedInterest.indexOf(e.target.value);
      this.selecetedInterest.splice(index, 1);

      this.areaofInterestCount = this.selecetedInterest.length;
    }

    this.validationAoi();
  }

  //getting qualification list from master data
  getMasterDataHighestQualification() {
    this.api.getMasterDataHighestQualificationlist().subscribe((data) => {
      this.masterDataHigheatQualification = data;
      // console.log("getting highestqualificationlist from master data is --->", this.masterDataHigheatQualification)
    });
  }

  //User removie skills
  removeUserSelSkills(e: any) {
    const index = this.selecetedSkills.indexOf(e);
    this.selecetedSkills.splice(index, 1);
    this.userselctedskill.length = this.masterDataskills.length;

    for (let j = 0; j < this.masterDataskills.length; j++) {
      if (this.masterDataskills[j] == e) {
        this.userselctedskill[j] = false;
        this.skillCount = this.selecetedSkills.length;
        this.ValidationSkill();
      }
    }
  }
  //user remove area of interest
  removeUserSelInterst(e: any) {
    const index = this.selecetedInterest.indexOf(e);
    this.selecetedInterest.splice(index, 1);
    this.userselectedInterest.length = this.masterDataInterest.length;
    for (let j = 0; j < this.masterDataInterest.length; j++) {
      if (this.masterDataInterest[j] == e) {
        this.userselectedInterest[j] = false;
        this.areaofInterestCount = this.selecetedInterest.length;
        this.validationAoi();
      }
    }
  }

  selectedcourselist() {
    // console.log("the length of usersdfg selected", this.masterDatacourselist)
    this.userselectedcourse.length = this.masterDatacourselist.length;
    // console.log("the length of user selected", this.userselectedcourse.length)
    for (let i = 0; i < this.masterDatacourselist.length; i++) {
      if (this.masterDatacourselist[i] == this.selectedcourse) {
        this.userselectedcourse[i] = true;
        this.isValidDegree = false;
      }
    }
  }

  selectedspecillazationlist() {
    // console.log("the length of usersdfg selected", this.masterDataSpecilazationlist)
    this.userselectedspecillazation.length = this.masterDatacourselist.length;
    // console.log("the length of user selected", this.userselectedspecillazation.length)
    for (let i = 0; i < this.masterDataSpecilazationlist.length; i++) {
      if (this.masterDataSpecilazationlist[i] == this.selectedSpecilization) {
        this.userselectedspecillazation[i] = true;
        this.isValidSpecialization = false;
      }
    }
  }

  //user selected course is
  onClickCourse(e: any) {
    this.selectedcourse = e;
    // this.validateSpecialize();
    this.isSpecialize = false;
    // console.log('the selected course is', this.selectedcourse);
    this.replaceSelectedcours = this.selectedcourse.replace('/', '%2F');
    this.api
      .getMasterDataSpecilazationlist(this.replaceSelectedcours)
      .subscribe((data) => {
        this.masterDataSpecilazationlist = data;
        this.isValidDegree = false;
        this.masterDataSpecilazationlistFilter =
          this.masterDataSpecilazationlist;
        this.selectedspecillazationlist();
      });
  }
  masterSpecilazationFilter(e: any) {
    // console.log(e.value)
    this.masterDataSpecilazationlist = [
      ...this.masterDataSpecilazationlistFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];

    if (this.masterDataSpecilazationlist.length == 0) {
      this.errorMsgOfSpecilazation = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfSpecilazation = '';
    }
  }

  masterCourseFilter(e: any) {
    // console.log(e.value)
    this.masterDatacourselist = [
      ...this.masterDatacourselistFilter.filter((user: any) =>
        user.toLowerCase().includes(e.value.toLowerCase())
      ),
    ];

    if (this.masterDatacourselist.length == 0) {
      this.errorMsgOfcourse = 'assets/images/amico.svg';
    } else {
      this.errorMsgOfcourse = '';
    }
  }
  onClickSpecilization(e: any) {
    this.selectedSpecilization = e;
    // console.log("the selected specilization is", this.selectedSpecilization)
    this.isValidSpecialization = false;
  }

  passingYear(event: any) {
    this.passingyear = event.target.value;
    // console.log("the passing year is", this.passingyear);
    this.isValidEndYear = false;
  }
  // Handle checkbox change for currently pursuing...
  checkbox() {
    this.currentlyPursuing = !this.currentlyPursuing;
    this.isValidEndYear = true;
    this.displayForm2 = '';
    this.passingyear = '';
    if (this.currentlyPursuing == true) {
      this.isValidEndYear = false;
      this.displayForm2 = 'hidden';
    }
  }

  // Handle checkbox change for currently pursuing in experience...

  checkboxExp() {
    this.currentlyPursuingM = false;
    this.currentlyPursuing = false;
  }
}
