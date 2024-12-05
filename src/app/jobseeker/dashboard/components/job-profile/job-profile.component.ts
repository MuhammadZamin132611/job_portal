/*
Name: Bholu
Date: 27-03-23
What: This is the controller ts file to get Job Details of any Job
Why: This is provided to Jobseeker to view Job Details of any Job
 */

//1. Imports - Angular Framework - Mandatory
import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  fromEvent,
  Observable,
  Subscription,
  catchError,
} from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';

//2. Imports - Capacitor Import 
import { Share } from '@capacitor/share';

//3. Imports - JobCheck Services - Mandatory
import { DashboardJobsService } from '../../services/dashboard-jobs.service';
import { HomeService } from '../../services/home.service';
import { ProfileJobPreferenceService } from '../jobseeker-profile/Services/profile-job-preference.service';

//4. Template - Mandatory
@Component({
  selector: 'app-job-profile',
  templateUrl: './job-profile.component.html',
  styleUrls: ['./job-profile.component.css'],
})

//5. Class - Mandatory
//Class to Show all Job detail
export class JobProfileComponent implements OnInit {

  @ViewChild('myDiv', { static: true }) myDiv: ElementRef;
  ngAfterViewInit() {
    this.height = this.myDiv.nativeElement.offsetHeight;
    console.log('height', this.height);
  }

  //6. Properties - Mandatory
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  height: any;
  isPopupVisible: boolean;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any = 'show';
  show: boolean = false;
  tick: boolean = false;
  isApplied: boolean = false;
  existUser: string = '';
  id: string | null;
  Ids: any
  id1: any = 'profileId';
  jobdetails: any;
  jobData: any;
  recommend: any;
  location: string = '';
  promo: any;
  loc: any = [];
  locat: any;
  jobRole: any;
  ApplicantCountstatus: any
  underline1: boolean = true;
  underline2: boolean = false;
  underline3: boolean = false;
  underline4: boolean = false;
  isLoading: boolean = true;

  value: number;
  semiCir: number = 40;
  semiCir1: number = 60;
  semiCir2: number = 80;

  semicircle = "rotate(" + (45 + (this.semiCir * 1.8)) + "deg)"
  semicircle1: any;
  semicircle2: any;
  profilevalue: any;
  // profilevalue = `rotate(${-90 + (this.value * 1.8)}deg)`

  constructor(
    private job: DashboardJobsService,
    private jobPreference: ProfileJobPreferenceService,
    private dashboardJobsService: DashboardJobsService,
    private api: HomeService,
    private router: ActivatedRoute,
    private location1: Location,
    private route: Router,

  ) {

  }
  goBack(): void {
    this.location1.back();
  }
  requirementId: any;

  //7. This method will call the page for offline status and get Job details
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.requirementId = params.requirementId;
    });
    this.getproJobs();
    this.ApplicantCount();
    this.GetSkills();
    this.getAllAreaOfInterest();
    this.getLocation();
    this.requirementDetails();
    // this.getSimilarJobs();
    // this.getPromotedJob();
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


    this.router.queryParams.subscribe((res: any) => {
      console.log('project id reg', res);
      this.jobId = res.requirementId;
    });
  }

  //this method will open the easy apply job popup
  isPopupVisible3 = false;
  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3;
  }

  //This method will show the save job popup
  profileID: any;
  message11 = ''
  messsage12 = ''
  Jobid: number;
  Check: any;
  openPopup(Jobid: any, saved: any) {
    this.Jobid = Jobid;
    this.Check = saved;
    this.checkSave(saved)
    this.isPopupVisible = true;
    // console.log(Jobid, "---->", saved)
  }

  //This method will close the save job popup
  closePopup() {
    this.isPopupVisible = false;
  }

  //This method will check if job is saved or not and based on that it will update message to show to user
  checkSave = (con: any) => {
    if (con) {
      this.message11 = 'Unsaved'
      this.messsage12 = 'Do you want to unsave the job!'
      console.log("Do you want to unsave the job!")
    } else {
      console.log("Do you want to save the job!")
      this.message11 = 'Saved'
      this.messsage12 = 'Do you want to Save the job!'
    }
  }

  //Function written to display the number of total applicants applied for that particular jobs
  ApplicantCount() {
    this.Ids = this.requirementId
    this.dashboardJobsService.getApplicantCount(this.Ids).subscribe((data: any) => {
      console.warn("data", data);
      this.ApplicantCountstatus = data;
      console.log('Applied Jobs Worlking:', data);

    });
  }

  //method will change the heart to red color when job is saved
  redHeart = () => {
    this.profileID = localStorage.getItem('profileID');
    if (this.Check) {
      this.api.unsaved(this.profileID, this.Jobid).subscribe({
        next: (res: any) => {
          console.log(res)
          this.requirementDetails()
        }, error: (error) => {
          console.log(error.error, "Job not Unsaved sucessfully ! Please retry")
        }
      })
    } else {
      this.api.postSaved(this.profileID, this.Jobid, this.Check).subscribe({
        next: (res: any) => {
          console.log(res)
          this.requirementDetails()
        }, error: (error) => {
          console.log(error.error, "Job not saved sucessfully ! Please retry")
        }
      })
    }
  }

  //This method will move the screen done to Job Details
  goDown1() {
    const Job_Details = document.getElementById('Job_Details');
    if (Job_Details) {
      this.underline1 = true;
      this.underline2 = false;
      this.underline3 = false;
      this.underline4 = false;
      Job_Details.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  //This method will move the screen done to Job Insights
  goDown2() {
    const Job_Insights = document.getElementById('Job_Insights');
    if (Job_Insights) {
      this.underline1 = false;
      this.underline2 = true;
      this.underline3 = false;
      this.underline4 = false;
      Job_Insights.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  //This method will move the screen done to About Company
  goDown3() {
    const About_Company = document.getElementById('About_Company');
    if (About_Company) {
      this.underline1 = false;
      this.underline2 = false;
      this.underline3 = true;
      this.underline4 = false;
      About_Company.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  //This method will move the screen done to Salary Insights
  goDown4() {
    const Salary_Insights = document.getElementById('Salary_Insights');
    if (Salary_Insights) {
      this.underline1 = false;
      this.underline2 = false;
      this.underline3 = false;
      this.underline4 = true;
      Salary_Insights.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  //This method is used to share job 
  share() {
    const params = new URLSearchParams();
    const shareUrl = window.location.href
    console.log("share my url--------", shareUrl)
    if (navigator.share) {
      navigator
        .share({
          title: 'Android Developer',
          text: 'Check out this cool link with query parameters!',
          url: shareUrl,
        })
        .then(() =>
          console.log('Successful Share Link ------------------->', shareUrl)
        )
        .catch((error) => console.log('Error sharing:', error));
    }
  }

  QuestionLength: number = 0;

  //This method will show all job details 

  requirementDetails() {
    this.id = localStorage.getItem('profileID');
    this.job.getReqDetails(this.id, this.requirementId).subscribe((data: any) => {
      this.jobdetails = data;
      this.jobRole = this.jobdetails.role;
      this.value = this.jobdetails.matchingPercentage;
      this.api.getSimilarJobs(this.id, this.jobRole).subscribe((data: any) => {
        console.log('similar Jobs working:', this.jobData);
        this.jobData = data;
        this.recommend = this.jobData;
        for (var value of this.data[1].location[0]) {
          // Concatenate 'value' to 'location1'
          this.location1 = this.location1 + value;
        }
      });
    });
  }

  //This method is used to store job role if the job details to get similar job details
  setJobRole() {
    localStorage.setItem("role", this.jobRole)
  }

  //This method will send the requirement id to different component
  shareRequirementId() {
    this.route.navigate(['/dashboard/reportJobs'], { queryParams: { requirementId: this.requirementId } })
  }



  //This method will show all Similar job to the given job details 
  // getSimilarJobs() {
  //   this.id = localStorage.getItem('profileID');
  //   this.api.getSimilarJobs(this.id, this.jobRole).subscribe((data: any) => {

  //     this.jobData = data;
  //     this.recommend = this.jobData;

  //     for (var value of this.jobData.locations[0].city) {
  //       this.location = this.location + value;
  //     }
  //     console.log('Jobs working:', this.jobData);
  //   });
  // }

  sharingInProgress = false;

  // shareCurrentPath() {
  //   if (navigator.share && !this.sharingInProgress) {
  //     this.sharingInProgress = true;

  //     navigator.share({
  //       title: `Exciting Job Opportunity: ${this.promo.jobTitle} at ${this.promo.companyName}`,
  //       url: window.location.href
  //     })
  //       .then(() => console.log('Share successful'))
  //       .catch((error) => console.log('Error sharing:', error))
  //       .finally(() => {
  //         this.sharingInProgress = false;
  //       });
  //   }
  // }
  // openSocial() {

  //   Share.share({
  //     title: `Exciting Job Opportunity: ${this.promo.jobTitle} at ${this.promo.companyName}`,
  //     text: 'Really awesome thing you need to see right meow',
  //     url: window.location.href,
  //     dialogTitle: 'Share by Zamin from JobCheck',
  //   });
  // }

  message: any;
  // getPromotedJob() {
  //   this.api.getPromotedJobs(this.requirementId).subscribe((data: any) => {
  //     this.promo = data;
  //     console.log('promoted jobs are working', this.promo);
  //     this.jobProfileSkills = this.promo.musthavekeywords;
  //     this.jobProfileInterests = this.promo.industry;
  //     this.jobProfileLocations = this.promo.locations;
  //     if (this.promo.locations.length > 0) {
  //       this.message = this.promo.locations;
  //     } else {
  //       this.message = 'NA';
  //     }
  //     this.calculateSkillMatchPercentage();
  //     //   for (var value of this.promo) {
  //     //     this.loc = this.loc + value;
  //     //   }
  //     //   this.loc = this.locat;

  //     //   console.log("promoted jobs are working", this.promo)
  //     //   console.log("promoted jobs are working loc",this.locat)

  //     //   console.log("$$$$$$$$$$$$$$", this.promo[1].locations[0].city)

  //     //   for (var value of this.promo[1].locations[0].city) {
  //     //     this.location = this.location + value;
  //     //   }
  //     //   console.log("lolllllll",this.location)
  //   });
  // }
  // Id:any
  // jobId:any
  //   applyJob(value: any) {
  //     console.log('applied')
  //     this.Id = localStorage.getItem("profileID");
  //     this.jobId = localStorage.getItem("JobId");
  //     console.log(this.Id, this.jobId)
  //     this.http.applyJob(this.Id, this.jobId, this.jobData).subscribe((data: any) => {
  //       console.log(data)
  //       this.apply=data
  //       console.log("Job applied")

  //     })
  //   }

  jobId: any;
  // applyJobs() {
  //   this.id = localStorage.getItem('profileID');
  //   this.api.postApplyJobs(this.id, this.jobId).subscribe((data) => {
  //     console.log("kjhvdghbjwkdlsjfh")
  //   });
  // }


  //Below given method is used to get the percentage match bar 
  @Input() progressValue: number = 100;

  getRotation(): string {
    const rotationAngle = (180 * this.progressValue) / 100; // Calculate the rotation angle based on the progress value
    return `rotate(${rotationAngle}deg)`;
  }

  //This method will get skills
  skills: any;
  jobSeekerProfileSkills: any = []; // Replace with the job seeker's actual skills

  GetSkills() {
    this.id = localStorage.getItem('profileID');
    this.dashboardJobsService.Selectedskills(this.id).subscribe((data) => {
      this.skills = data;
      this.jobSeekerProfileSkills = this.skills.map((x: any) =>
        x.skillName);
    });
  }

  //This method will change the color based on match
  jobProfileSkills: string[] = []; // Replace with your actual job profile skills

  getSkillClass(skill: string): string {
    return this.jobProfileSkills.includes(skill)
      ? 'text-green-600'
      : 'text-red-600';
  }




  //  calculateMatchingPercentage(skills1: any[], skills2: any[]): number {

  //   const totalSkills = [...new Set([...skills1, ...skills2])].length;

  //   console.log(totalSkills,'totalskill');

  //   const matchingSkills = skills1.filter((skill) => skills2.includes(skill)).length;

  //   return (matchingSkills / totalSkills) * 100;

  // }



  calculateSkillMatchPercentage(): number {
    const totalSkills = this.jobSeekerProfileSkills.length;
    let matchingSkills = 0;
    this.isLoading = false;
    for (const skill of this.jobSeekerProfileSkills) {
      if (this.jobProfileSkills.includes(skill)) {
        matchingSkills++;
      }
    }


    const skillMatchPercentage = (matchingSkills / totalSkills) * 100;
    //console.log('Skill Match Percentage:', skillMatchPercentage);
    this.semicircle1 = "rotate(" + (45 + (skillMatchPercentage * 1.8)) + "deg)"
    return skillMatchPercentage;
  }

  // matchingSkills:any;
  // calculateSkillMatchPercentage() {
  //   console.log(this.jobProfileSkills);
  //   const totalSkills = this.jobProfileSkills.length;
  //   this.matchingSkills = 0;

  //   for (const skill of this.jobSeekerProfileSkills) {
  //     if (this.jobProfileSkills.includes(skill)) {
  //       this.matchingSkills++;
  //     }
  //   }
  //   console.log('Skill Match Percentage:', this.matchingSkills);

  //   const skillMatchPercentage = (this.matchingSkills / totalSkills) * 100;
  //   console.log('Skill Match Percentage:', skillMatchPercentage);
  //   return skillMatchPercentage;
  // }

  // calculateSkillMatchPercentage(): number {
  //   console.log(this.jobProfileSkills);

  // const totalSkills = this.jobProfileSkills.length;
  // const matchingSkills = this.jobSeekerProfileSkills.filter(skill => this.jobProfileSkills.includes(skill)).length;

  // const skillMatchPercentage = (matchingSkills / totalSkills) * 100;
  // console.log('Skill Match Percentage:', skillMatchPercentage);
  // return skillMatchPercentage;
  // }



  //This method will call api for area of interest 
  getAllAreaOfInterests: any;
  getAllAreaOfInterest() {
    this.id = localStorage.getItem('profileID');
    console.log(this.id);
    this.jobPreference.areaOfInterest(this.id).subscribe((resp) => {
      this.getAllAreaOfInterests = resp;
      this.jobSeekerInterests = this.getAllAreaOfInterests.areaOfInterestName;
      this.jobSeekerInterests = this.getAllAreaOfInterests.map((y: any) =>
        y.areaOfInterestName);
    });
  }

  jobProfileInterests: string[] = []; // Replace with your actual job profile interests
  jobSeekerInterests: string[] = []; // Replace with the job seeker's actual interests

  //This method will change the color based on match
  getInterestClass(interest: string): string {
    return this.jobProfileInterests.includes(interest)
      ? 'text-green-600'
      : 'text-red-600';
  }

  //This method will calculate area of Interest matching
  calculateInterestMatchPercentage(): number {
    const totalInterest = this.jobSeekerInterests.length;
    let matchingInterest = 0;

    for (const interest of this.jobSeekerInterests) {
      if (this.jobProfileInterests.includes(interest)) {
        matchingInterest++;
      }
    }
    const totalLocation = this.jobSeekerLocations.length;
    let matchingLocation = 0;

    for (const location of this.jobSeekerLocations) {
      if (this.jobProfileLocations.includes(location)) {
        matchingLocation++;
      }
    }

    const interestMatchPercentage = ((matchingInterest + matchingLocation) / (totalInterest + totalLocation)) * 100;

    this.semicircle2 = "rotate(" + (45 + (interestMatchPercentage * 1.8)) + "deg)"
    return interestMatchPercentage;
  }




  //This method will get prefered location of user 
  getAllLocation: any = [];
  jobSeekerLocations: string[] = [];
  primaryL: any;
  secondryL: any;
  otherL: any = [];
  getLocation() {
    this.id = localStorage.getItem('profileID');
    console.log(this.id);
    this.jobPreference.prefLocation(this.id).subscribe((resp) => {
      this.getAllLocation = resp;
      this.otherL = this.getAllLocation.otherPreferedLocation;
      this.jobSeekerLocations.push(...this.otherL);
    });
  }




  jobProfileLocations: string[] = []; // Replace with your actual job profile locations

  getPrimaryLocationClass(location: string): string {
    return this.jobProfileLocations.includes(location)
      ? 'text-green-600'
      : 'text-red-600';
  }

  //to share the job
  url1: string = '';
  shareJob() {
    const shareUrl = window.location.href
    Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: shareUrl,
      dialogTitle: 'Share with buddies',
    });
  }

  //This method will get all promoted jobs
  getproJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getJobStatus(this.id, this.requirementId).subscribe((data: any) => {
      this.promo = data;
      this.isLoading = false;
      console.log('promoted jobs are working', this.promo);
      this.jobProfileSkills = this.promo.musthavekeywords;
      this.jobProfileInterests = this.promo.industry;
      this.jobProfileLocations = this.promo.locations;
      if (this.promo.locations.length > 0) {
        this.message = this.promo.locations;
      } else {
        this.message = 'NA';
      }
      this.calculateSkillMatchPercentage();
      this.calculateInterestMatchPercentage();


      // this.recommend = this.jobData
      // console.log('Jobs working:============', this.jobData[1].locations[0].city);
      // for (var value of this.jobData.locations[0].city) {
      //   this.location = this.location + value;
      //   console.log('location working:', this.location + value);

      // }
      // console.log('Jobs working:', this.jobData);
      // console.log('location>>>>>>>>>> working:', this.location + value);



    });
  }


  //This method will apply for the job
  data: any;
  apply() {
    this.id = localStorage.getItem("profileID");
    this.api.applyJob(this.id, this.jobId, this.promo).subscribe((res: any) => {
      this.isApplied = true;
      // this.toggleFavModal1();
    });
    // this.route.navigate(['/jobs'])
  }

  //This method will check if any Questeniour is added in this requirement
  CheckApply = () => {
    if (this.QuestionLength == 0) {
      this.apply()
    } else {
      this.route.navigate(['/dashboard/questionaries'], { queryParams: { requirementId: this.requirementId } })
    }
  }

  visible: boolean = false;
  showHideUtility() {
    this.visible = this.visible ? false : true;
  }
  //This method is used to search job role
  searchJobRole: string = '';
  skillJob: any = [];
  jobFilter(e: any) {
    this.promo = [...this.skillJob.filter((user: any) => user.toLowerCase().includes(e.value.toLowerCase()))];

  }
}
