/*
Name: Sathvik
Date: 06-10-2023
Purpose: This component manages the user's onboarding progress, including personal information, education, skills, work experience, and location.
Description: This component collects and processes user data during the onboarding process, posting it to relevant services and managing the overall progress.
*/

// 1. Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 2. Imports - Angular Animations - Optional (Only if you're using animations)
import { trigger, transition, animate, style } from '@angular/animations';

// 3. Imports - JobCheck Models - Mandatory (Assuming these models are used in the component)
import { dataModalNew } from '../../models/personal_bio';
import { educationDetails } from '../../models/education.model';
import { workExp } from '../../models/work_Exp';
import { skill } from '../../models/skills.model';
import { LaungageDetails, locationDetails } from '../../models/location';

// 4. Imports - JobCheck Services - Mandatory (Assuming these services are used in the component)
import { OnboardingPersonalBioService } from '../../services/onboarding-personal-bio.service';
import { OnboardingWorkExperienceService } from '../../services/onboarding-work-experience.service';
import { OnboardingSkillEducationService } from '../../services/onboarding-skill-education.service';
import { OnboardingLocationService } from '../../services/onboarding-location.service';
import {notification} from '../../models/notification.model'

@Component({
  selector: 'app-onboarding-progress',
  templateUrl: './onboarding-progress.component.html',
  styleUrls: ['./onboarding-progress.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})

/**
 * Represents the component responsible for user onboarding progress.
 */
export class OnboardingProgressComponent implements OnInit {
  AboutMe: dataModalNew;
  workExperience: workExp;
  skillDetails: skill;
  EducationDetails: educationDetails;
  SkillModel: skill;
  userLocation: locationDetails;
  language: LaungageDetails;
  detailsForNotification: notification
  // localProfiledata:any;
  // BasicDetails:any;
  // ProfileID:any;

  // Constructor to inject services and initialize properties
  constructor(
    private router: Router,
    private personalService: OnboardingPersonalBioService,
    private onboardingWorkExperienceService: OnboardingWorkExperienceService,
    private skillService: OnboardingSkillEducationService,
    private locationService: OnboardingLocationService
  ) {
    this.AboutMe = {} as dataModalNew;
    this.workExperience = {} as workExp;
    this.skillDetails = {} as skill;
    this.SkillModel = {} as skill;
    this.EducationDetails = {} as educationDetails;
    this.userLocation = {} as locationDetails
    this.language = {} as LaungageDetails
    this.detailsForNotification = {} as notification
  }

  ngOnInit(): void {
    // Set the current path in local storage
    localStorage.setItem('currentPath', window.location.pathname);
    // Call the main function for onboarding
    this.callfunction();
  }
  // Redirect to a specific route
  rout() {
    this.router.navigateByUrl('/onBoarding/launch');
  }
  // Main function for onboarding process
  callfunction() {
    const localProfiledata: any = localStorage.getItem('profileData');
    const BasicDetails = JSON.parse(localProfiledata);
    // Populate user's personal information
    this.AboutMe.name = BasicDetails.fulln;
    let letter = this.AboutMe.name.substr(0, 1).toUpperCase();
    console.log('letter', letter);
    localStorage.setItem('letter', letter);
    this.AboutMe.email = BasicDetails.emailn;
    this.AboutMe.gender = BasicDetails.gendern;
    this.AboutMe.city = BasicDetails.cityn;
    this.AboutMe.phoneNumber = BasicDetails.phonen;
    this.AboutMe.dateOfBirth =
      BasicDetails.dateOfBirthn.slice(0, 10) || 'string';
    // Post personal information to the service
    this.personalService.postService(this.AboutMe).subscribe((res: any) => {
      console.log(res.profileId);
      localStorage.setItem('profileID', res.profileId);
      this.profileID = res.profileId;
      // Proceed to SkillData function
      this.SkillData();
    });
  }
  // Property to store the profile ID
  profileID: any = localStorage.getItem('profileID');
  // Function to handle education data
  EducationData() {
    const localEducationData: any = localStorage.getItem('skill&Education');
    const skillEducation = JSON.parse(localEducationData);
    console.log(skillEducation);
    this.EducationDetails.currentlyPursuing = skillEducation.currentlyPursuing;
    if (skillEducation.currentlyPursuing == true) {
      // Handle currently pursuing education
      this.EducationDetails.currentlyPursuing =
        skillEducation.currentlyPursuing;
      this.EducationDetails.specialization = skillEducation.Specilization;
      this.EducationDetails.qualification = skillEducation.Qualification;
      this.EducationDetails.course = skillEducation.Degree;
      // Post education data to the service
      this.skillService
        .postEducation(this.profileID, this.EducationDetails)
        .subscribe((data) => {
          // Proceed to Language function
          this.Language();
        });
    } else {
      this.EducationDetails.specialization = skillEducation.Specilization;
      this.EducationDetails.qualification = skillEducation.Qualification;
      this.EducationDetails.course = skillEducation.Degree;
      this.EducationDetails.endDate =
        skillEducation.PassingYear.slice(0, 10) || '';
      // Post education data to the service
      this.skillService
        .postEducation(this.profileID, this.EducationDetails)
        .subscribe((data) => {
          // Proceed to Language function
          this.Language(); /////////////////
        });
    }
  }

  // Function to handle skill data

  SkillData() {
    const localskilldata: any = localStorage.getItem('skill&Education');
    const skillEducation = JSON.parse(localskilldata);
    console.log(skillEducation.AOI);
    let skills: any[] = [];
    skillEducation.Skill.map((skill: string) => {
      skills.push({ skillName: skill });
    });
    // Post skill data to the service
    this.skillService
      .postSkill(this.profileID, skills)
      .subscribe(() => console.log('skill posted'));

    this.locationService
      // Post area of interest to the service
      .postAOI(this.profileID, skillEducation.AOI)
      .subscribe(() => {
        // Check if there is work experience to be posted
        let valid = localStorage.getItem('Exp');
        console.log('Exp====', valid);
        if (valid == 'No') {
          console.log('No work exp to post');
          this.EducationData();
        } else if (valid == 'Yes') {
          this.workExp();
        }
      });
  }
  // Function to handle area of interest (AOI)
  aoi() {
    const localskilldata: any = localStorage.getItem('skill&Education');
    const skillEducation = JSON.parse(localskilldata);
    // Post area of interest to the service
    this.locationService
      .postAOI(this.profileID, skillEducation.AOI)
      .subscribe(() => {
        // Check if there is work experience to be posted
        let valid = localStorage.getItem('Exp');
        if ((valid = 'No')) {
          this.EducationData();
        } else {
          this.workExp();
        }
      });
  }
  // Function to handle work experience data
  workExp() {
    const localexperiencedata: any = localStorage.getItem('experienceData');
    const localformValuesdata: any = localStorage.getItem('formValues');
    const experienceData = JSON.parse(localexperiencedata);
    // Populate work experience data
    this.workExperience.companyName = experienceData.companyname;
    this.workExperience.jobTitle = experienceData.jobRole;
    this.workExperience.department = experienceData.industryType;
    this.workExperience.salaryType = experienceData.salaryType;
    this.workExperience.period = experienceData.noticePeriod;
    this.workExperience.startDate = experienceData.startDate;
    this.workExperience.endDate = experienceData.endDate;
    this.workExperience.currentSalary = experienceData.currentSalary
      .replace(',', '')
      .replace(',', '')
      .replace(',', '');
    this.workExperience.currentlyWorking = experienceData.currentlyWorking;
    this.workExperience.empType = experienceData.employmentType;
    this.workExperience.experience = experienceData.workStatus == 'yes' ? 1 : 0;
    // Check if there is work experience to post
    if (this.workExperience.experience == 1) {
      // Post work experience data to the service
      this.onboardingWorkExperienceService
        .postWorkExperience(this.profileID, this.workExperience)
        .subscribe((res: any) => {
          console.log('workExp Posted');
          this.EducationData(); ///////////////
        });
    } else {
      this.EducationData();
    }
  }

  allLocation: string[] = [];
  // Function to handle location data
  Location() {
    let localProfiledata: any = localStorage.getItem('LocationData');
    localProfiledata = JSON.parse(localProfiledata);
    // Prepare and post location data to the service
    this.userLocation.otherPreferedLocation = [
      localProfiledata.primaryLication,
      localProfiledata.secondarylocation,
      localProfiledata.otherLocation,
    ];
    this.userLocation.pinCode =
      localProfiledata.pinCode == 'Optional'
        ? 0
        : parseInt(localProfiledata.pinCode);
    console.log(this.userLocation);
    // Post location data to two different endpoints
    this.locationService
      .postLocation(this.profileID, this.userLocation)
      .subscribe(() => {
        this.rout();
      });
    this.locationService
      .postLocation1(this.profileID, this.userLocation)
      .subscribe(() => {
        this.rout();
      });
  }
  // Function to handle language data
  Language() {
    let lang: any = localStorage.getItem('LocationData');
    lang = JSON.parse(lang);
    this.locationService
      .postLanguages(this.profileID, lang.language)
      .subscribe(() => console.log('language posted success'));
    this.locationService
      .postFluency(this.profileID, lang.eFluency)
      .subscribe(() => {
        this.Location();
      });
  }
}
