/*
Name: Muhammad Zmain
What: This is the controller ts file to Jobs in the Jobseeker module.
Why: This is provided to Jobseeker have to see the Jobs all details like Salary, Location, Profile etc
*/

// 1. Imports - Angular Framework - Mandatory
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Location } from '@angular/common';

// 2. Imports - JobCheck Modules - Optional
//None

// 3. Imports - JobCheck Services - Mandatory
import { JobsService } from './services/jobs.service';
import { ResumeService } from '../onboarding/services/resume.service';
import { JobExperienceService } from '../dashboard/components/jobseeker-profile/Services/job-experience.service';
import { MatchingJobsService } from './services/matching-jobs.service';
import { AddProjectService } from '../dashboard/components/jobseeker-profile/components/profile-project/services/add-project.service';
import { EditProjectService } from '../dashboard/components/jobseeker-profile/components/profile-project/services/edit-project.service';
import { CertificateService } from '../dashboard/components/jobseeker-profile/Services/certificate.service';
import { AddAchievementService } from '../dashboard/components/jobseeker-profile/components/profile-achievements/services/add-achievement.service';
import { HomeService } from '../dashboard/services/home.service';
import { RecruiterActionService } from './components/recruiter-action/services/recruiter-action.service';


// 4. Imports - JobCheck Models - Mandatory
//None

// 5. Imports - Exception Classes - Optional
//None

// 6. Imports - Config Files - Optional
//None

// 7. Imports - Utilities - Optional
//None

// 8. Imports - Others (External Integrations, APIs, Services) - Optional
//None

// Define a component with the following metadata settings
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

// 10. Module Variables - Optional
//None

// 11. Module Methods - Optional
//None

// 12. Class - Mandatory
//Class to JobsComponemet. This class represents the component with form elements and actions to get the job dashboard into the system
export class JobsComponent implements OnInit {

  // Declare a variable type (it can hold values of any type)
  height: any;
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
  slider: string | any;
  defaultTransform: string | any;
  cardOpen: boolean = false;
  id: any;
  Applied: any;
  Appliedjobs: any;
  jobId: any;
  requirementId: any;
  isPopupVisible: boolean;
  hideHeader = false; // Initial state of header visibility
  hideFooter = false; // Initial state of footer visibility
  private previousScrollPosition = 0;
  top = 0;
  bottom = 0;
  profileID: any;
  message11 = ''
  messsage12 = ''
  Jobid: number;
  Check: any;
  saved: any
  savedJobsCount: number = 0
  matchingJobsCounts: number = 0
  Matchingjobs: any
  data: any;
  location1: string = ''
  Apply: any
  appliedJobsCount: number = 0
  Shortlist: any
  shortJobsCount: number = 0
  Recomend: any
  matchingJobsCount: number = 0
  appliedjobs: any[] = [];
  resumeAvail = false;
  url: any
  filename: any;
  uploadedResume: any;
  uploadedResumeLength: any;
  workExperience: any = [];
  workExperienceCount: number = 0;
  letter: any;
  CertificateCount: number = 0;
  CertificateCount1: boolean = true;
  Allcertificates11: any = [];
  projectsDetails: any = [];
  countProject: number = 0
  Allachievement: any = [];
  achievementCount: number = 0;
  maxFiveTrendingJobsShow: any
  messageError: any
  promo: any[] = []
  storecount: any;
  matchingJObsGhost: boolean;

  // A class with nessary injector like Jobservices, Recruiteractionservice etc.
  constructor(private api: JobsService, private action: RecruiterActionService, private home: HomeService, private routers: Router, private location: Location, private experienceService: JobExperienceService, private resumeService: ResumeService, private apis: MatchingJobsService, private editProjectService: EditProjectService, private certificate: CertificateService, private achiee: AddAchievementService, private router: ActivatedRoute) {
    this.getCountOfSavedJobs();
    this.getAppliedJobs();
    this.getCountOfShortlistedJobs();
    this.getCountOfAppliedJobs();
    this.getCountOfRecomendedJobs();
    this.getResume();
    this.getWorkExperience();
    this.getforProject();
    this.getachievement();
    this.getCertificate11();
    this.getmatchingJobs();
    this.getTotalActionCount();
    this.getTrendingdJob()
  }

  // It is a event method to action
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.requirementId = params.requirementId;
    });
    this.slider = document.getElementById('slider');
    this.defaultTransform = 0;
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
    }));
  }

  // This method is used to navigate the user back to the previous location in the app history
  goBack(): void {
    this.location.back();
  }

  // Declare a ViewChild with the selector
  @ViewChild('myDiv', { static: true }) myDiv: ElementRef;
  ngAfterViewInit() {
    this.height = this.myDiv.nativeElement.offsetHeight;
  }

  // Use the @HostListener for scroll the header and footer 
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition > this.previousScrollPosition) {
      // Scrolling down
      this.top = -this.height;
      this.bottom = -100;
    } else {
      // Scrolling up
      this.top = 0;
      this.bottom = 0;
    }
    this.previousScrollPosition = currentScrollPosition;
  }

  // Define a method called 'goNext'
  goNext() {
    this.defaultTransform = this.defaultTransform - 500;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1)
      this.defaultTransform = 0;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }

  // Functional Methods
  // The below method is used to open the popup with jobid to saved that jobs
  openSavedPopup(Jobid: any, saved: any) {
    this.Jobid = Jobid;
    this.Check = saved;
    this.checkSave(saved)
    this.isPopupVisible = true;
  }

  // Functional Methods
  // The below method is used to close the popup with jobid
  closeSavedPopup() {
    this.isPopupVisible = false;
  }

  // Functional Methods
  // The below method is used to display the message saved and unsaved job
  checkSave = (con: any) => {
    if (con) {
      this.message11 = 'Unsaved'
      this.messsage12 = 'Do you want to unsave the job'
    } else {
      this.message11 = 'Saved'
      this.messsage12 = 'Do you want to save the job'
    }
  }

  // Define a function named 'redHeart'
  redHeart = () => {
    const profileID = localStorage.getItem("profileID");
    // Check if 'this.Check' is true
    if (this.Check) {
      // If 'this.Check' is true, call the 'unsaved' method on the 'home' service
      this.home.unsaved(profileID, this.Jobid).subscribe({
        next: (res: any) => {
          // Handle the successful response from the 'unsaved' method
          // Call several other methods to update data
          this.getAppliedJobs();
          this.getTrendingdJob();
          this.getmatchingJobs();
          this.getCountOfSavedJobs();
        }, error: (error) => {
          // Handle errors and log a message
        }
      })
    } else {
      // If 'this.Check' is false, call the 'postSaved' method on the 'home' service
      this.home.postSaved(profileID, this.Jobid, this.Check).subscribe({
        next: (res: any) => {
          // Handle the successful response from the 'postSaved' method
          // Call several other methods to update data
          this.getAppliedJobs();
          this.getTrendingdJob();
          this.getmatchingJobs();
          this.getCountOfSavedJobs();
        }, error: (error) => {
          // Handle errors and log a message
        }
      })
    }
  }

  // Define a method called 'goPrev'
  goPrev() {
    // Check if the absolute value of 'defaultTransform' is equal to 0
    if (Math.abs(this.defaultTransform) === 0) {
      // If 'defaultTransform' is already 0, set it to 0 (no change)
      this.defaultTransform = 0;
    } else {
      // If 'defaultTransform' is not 0, increase it by 500 pixels to move the slider content to the right
      this.defaultTransform = this.defaultTransform + 500;
    }
    // Apply the updated 'defaultTransform' value to the 'transform' property of the 'slider' element to move its content
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }

  // Define a method called 'boostYourProfile'
  boostYourProfile() {
    this.cardOpen = !this.cardOpen;
  }

  // Define a method called 'boostopen'
  boostopen() {
    if (this.CertificateCount == 1 || this.workExperience == 1) {
      this.cardOpen = true;
    }
  }

  // This method is used to get the count of saved jobs
  getCountOfSavedJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfSavedJobs(this.id).subscribe((data: any) => {
      this.saved = data;
      this.savedJobsCount = this.saved.count
    });
  }

  // This method is used to get the all mathching job 
  getmatchingJobs() {
    this.id = localStorage.getItem('profileID');
    this.apis.getMatchingJobs(this.id).subscribe((data) => {
      this.Matchingjobs = data.slice(0, 10);
      if (this.Matchingjobs) {
        this.matchingJObsGhost = true;
      } else {
        this.matchingJObsGhost = false;
      }
      this.matchingJobsCount = this.Matchingjobs.length
    })
  }

  // This method is used to get the count of applied jobs
  getCountOfAppliedJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfAppliedJobs(this.id).subscribe((data: any) => {
      this.Apply = data;
      this.appliedJobsCount = this.Apply.count
    });
  }

  // This method is used to get the count of shorlisted jobs
  getCountOfShortlistedJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfShortlistedJobs(this.id).subscribe((data: any) => {
      this.Shortlist = data;
      this.shortJobsCount = this.Shortlist.count
    });
  }

  // This method is used to get the count of recomended jobs
  getCountOfRecomendedJobs() {
    // this.id = localStorage.getItem("profileID");
    // this.api.getNumberOfRecomendedJobs(this.id).subscribe((data: any) => {
    //   this.Recomend = data;
    //   this.matchingJobsCount = this.Recomend.count
    // });
  }

  // This method is used to get all applied jobs
  getAppliedJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getAppliedJobs(this.id).subscribe((data: any) => {
      console.warn("data", data);
      this.Appliedjobs = data;
      this.appliedjobs = this.Appliedjobs.slice(0, 3)
      this.Applied = this.Appliedjobs
    });
  }

  // This method is used to set the job id
  // To navigate with job data
  // setId(value: any) {
  //   this.jobId = value;
  //   localStorage.setItem("JobId", this.jobId);
  //   this.routers.navigate(['application-status']);
  // }

  // This method is used to check resume is uploaded or not
  getResume() {
    this.id = localStorage.getItem('profileID')
    this.resumeService.getResume(this.id).subscribe((dat: any) => {
      this.uploadedResume = dat;
      this.uploadedResumeLength = dat.value.length;;
      this.url = 'https://job-check.s3.ap-south-1.amazonaws.com/' + dat.value
      if (dat.value) {
        this.resumeAvail = true;
      }
    }, ((error) => {
    }))
  }

  // This method is used to check any work experience is available the user profile
  getWorkExperience() {
    this.experienceService.getWorkExperience(this.id).subscribe((data: any) => {
      this.workExperience = data;
      this.workExperienceCount = this.workExperience.length;
    });
  }

  // This method is used to check any certificate available the user profile
  getCertificate11() {
    let uid = localStorage.getItem('profileID')
    this.certificate.getCertificate(uid).subscribe((res: any) => {
      this.Allcertificates11 = res;
      this.CertificateCount = this.Allcertificates11.length;
      this.CertificateCount1 = this.Allcertificates11.length;
      if (this.CertificateCount1) {
        this.cardOpen = true;
      }
    })

  }

  // This method is used to check any project is available the user profile
  getforProject() {
    let uid = localStorage.getItem('profileID')
    this.editProjectService.getProjectDetails(uid).subscribe((data: any) => {
      this.projectsDetails = data;
      this.countProject = this.projectsDetails.length;
    })
  }

  // This method is used to check any achievement is available the user profile
  getachievement() {
    let id = localStorage.getItem('profileID')
    this.achiee.getAchievement(id || '').subscribe((data: any) => {
      this.Allachievement = data;
      this.achievementCount = this.Allachievement.length;
    })
  }

  // This method is used to get Trendingd Jobs
  getTrendingdJob() {
    this.id = localStorage.getItem('profileID');
    this.home.getTrendingJobs(this.id).subscribe((data: any) => {
      this.promo = data;
      this.maxFiveTrendingJobsShow = this.promo.slice(0, 5);
    });
  }

  // This method is used to get total action count what ever perform by recuriter
  getTotalActionCount() {
    let id = localStorage.getItem('profileID')
    this.action.getTotalCount(id).subscribe((data: any) => {
      this.storecount = data.count
    })
  }
}

