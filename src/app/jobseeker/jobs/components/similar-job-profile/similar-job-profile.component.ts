import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { Location } from '@angular/common';
import { DashboardJobsService } from 'src/app/jobseeker/dashboard/services/dashboard-jobs.service';
import { HomeService } from 'src/app/jobseeker/dashboard/services/home.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProfileJobPreferenceService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/profile-job-preference.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-similar-job-profile',
  templateUrl: './similar-job-profile.component.html',
  styleUrls: ['./similar-job-profile.component.css']
})
export class SimilarJobProfileComponent implements OnInit {
  @ViewChild('myDiv', { static: true }) myDiv: ElementRef;
  height: any;
  isPopupVisible: boolean;

  ngAfterViewInit() {
    this.height = this.myDiv.nativeElement.offsetHeight;
    console.log('height', this.height);
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
  id: string | null;
  id1: any = 'profileId';
  jobdetails: any;
  jobData: any;
  recommend: any;
  location: string = '';
  promo: any;
  loc: any = [];
  locat: any;
  jobRole: any;
  underline1: boolean = true;
  underline2: boolean = false;
  underline3: boolean = false;
  underline4: boolean = false;

  value: number = 50;
  semiCir: number = 40;
  semiCir1: number = 60;
  semiCir2: number = 80;

  semicircle = "rotate(" + (45 + (this.semiCir * 1.8)) + "deg)"
  semicircle1: any;
  semicircle2: any;

  profilevalue = `rotate(${-90 + (this.value * 1.8)}deg)`

  constructor(
    private job: DashboardJobsService,
    private jobPreference: ProfileJobPreferenceService,
    private dashboardJobsService: DashboardJobsService,
    private api: HomeService,
    private router: ActivatedRoute,
    private location1: Location,
    private  route:Router
  ) {
    // this.progressWidth = this.getProgressWidth();
    console.log(this.profilevalue, "profilevalue")

    console.log(this.jobSeekerLocations);

  }
  goBack(): void {
    this.location1.back();
  }
  requirementId: any;
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.requirementId = params.requirementId;
    });
    console.log("cfghvjkgfchvjkgfgchvbjgcfgxvbhgcfgvb")
    console.log('DSsvfffff', this.requirementId);
    this.getproJobs();
    this.GetSkills();
    this.allareaofInterest();
    this.getLocation();
    this.requirementDetails();
    // this.getPromotedJob();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';
 
      this.connectionStatus = 'online';
       
      setTimeout(()=>{
       
        this.connectionStatusMessage = '';
       
        this.connectionStatus = '';
       
     },2000);
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

  // easy apply popup
  isPopupVisible3 = false;
  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3;
  }

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
  closePopup() {
    this.isPopupVisible = false;
  }
  checkSave = (con: any) => {
    if (con) {
      this.message11 = 'Unsaved'
      this.messsage12 = 'Are you want to unsave the job'
      console.log("Are you want to unsave the job")
    } else {
      console.log("Are you want to save the job")
      this.message11 = 'Saved'
      this.messsage12 = 'Are you want to Save the job'
    }
  }
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

  share() {
    const params = new URLSearchParams();
   // params.set('dashboard', 'job-profile');
    // const shareUrl = 'https://localhost:4200/' + params.toString();
    const shareUrl = 'https://jobseeker-apk.dev.jobcheck.in/dashboard/job-profile?requirementId='+this.requirementId;
    console.log("share",shareUrl)
   
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

    QuestionLength:number=0;

  requirementDetails() {
    this.id = localStorage.getItem('profileID');
    this.job.getReqDetails(this.id, this.requirementId).subscribe((data: any) => {
      this.jobdetails = data;
      this.jobRole = this.jobdetails.role;
      console.log('vvvvvvvvvvvvvvvv', this.jobRole);
      console.log('sid@@@@', this.jobdetails);
      // this.QuestionLength = this.jobdetails.questions.length
      // console.log("length",this.QuestionLength)
      this.api.getSimilarJobs(this.id, this.jobRole).subscribe((data: any) => {

        this.jobData = data;
        this.recommend = this.jobData;

        for (var value of this.jobData.locations[0].city) {
          this.location = this.location + value;
        }
        console.log('Jobs working:', this.jobData);
      });
    });
  }
  jobrole(){
    localStorage.setItem('role',this.jobRole)
  }
  sharerequriementId(){
    this.route.navigate(['/dashboard/reportJobs'],{queryParams:{requirementId:this.requirementId}})
  }



  // getAllJobs() {
  //   this.id = localStorage.getItem('profileID');
  //   console.log("======================================================")
  //   console.log('Iddddddddddddddddddd', this.id);
  //   console.log("pppppppppppp",this.jobdetails.jobRole)
  //   console.log("======================================================")
  //   this.api.getSimilarJobs(this.id,this.jobRole).subscribe((data: any) => {

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
  getPromotedJob() {
    this.api.getPromotedJobs(this.requirementId).subscribe((data: any) => {
      this.promo = data;
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
      //   for (var value of this.promo) {
      //     this.loc = this.loc + value;
      //   }
      //   this.loc = this.locat;

      //   console.log("promoted jobs are working", this.promo)
      //   console.log("promoted jobs are working loc",this.locat)

      //   console.log("$$$$$$$$$$$$$$", this.promo[1].locations[0].city)

      //   for (var value of this.promo[1].locations[0].city) {
      //     this.location = this.location + value;
      //   }
      //   console.log("lolllllll",this.location)
    });
  }
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



  @Input() progressValue: number = 100;

  getRotation(): string {
    const rotationAngle = (180 * this.progressValue) / 100; // Calculate the rotation angle based on the progress value
    return `rotate(${rotationAngle}deg)`;
  }

  skills: any;
  jobSeekerProfileSkills: any = []; // Replace with the job seeker's actual skills

  GetSkills() {
    this.id = localStorage.getItem('profileID');
    this.dashboardJobsService.Selectedskills(this.id).subscribe((data) => {
      // console.log("======>",data)
      this.skills = data;
      // this.jobSeekerProfileSkills = this.skills.skillName;
      // console.log(this.skills);

      this.jobSeekerProfileSkills = this.skills.map((x: any) =>
        x.skillName);

      // console.log(this.jobSeekerProfileSkills);

    });
  }

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
    // console.log(this.jobSeekerProfileSkills);
    const totalSkills = this.jobSeekerProfileSkills.length;
    // console.log(totalSkills);

    let matchingSkills = 0;

    for (const skill of this.jobSeekerProfileSkills) {
      if (this.jobProfileSkills.includes(skill)) {
        matchingSkills++;
      }
    }

    //console.log('Matching skills:', matchingSkills);


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




  getAllAreaofIntersets: any;
  allareaofInterest() {
    this.id = localStorage.getItem('profileID');
    console.log(this.id);
    this.jobPreference.areaOfInterest(this.id).subscribe((resp) => {
      this.getAllAreaofIntersets = resp;
      // console.log(this.getAllAreaofIntersets);
      this.jobSeekerInterests = this.getAllAreaofIntersets.areaOfInterestName;
      this.jobSeekerInterests = this.getAllAreaofIntersets.map((y: any) =>
        y.areaOfInterestName);

      // console.log(this.jobSeekerInterests);
    });
  }

  jobProfileInterests: string[] = []; // Replace with your actual job profile interests
  jobSeekerInterests: string[] = []; // Replace with the job seeker's actual interests

  getInterestClass(interest: string): string {
    return this.jobProfileInterests.includes(interest)
      ? 'text-green-600'
      : 'text-red-600';
  }


  calculateInterestMatchPercentage(): number {
    // console.log(this.jobSeekerInterests);
    const totalInterest = this.jobSeekerInterests.length;
    //console.log(totalInterest);

    let matchingInterest = 0;

    for (const interest of this.jobSeekerInterests) {
      if (this.jobProfileInterests.includes(interest)) {
        matchingInterest++;
      }
    }

    const totalLocation = this.jobSeekerLocations.length;
    // console.log(totalLocation);

    let matchingLocation = 0;

    for (const location of this.jobSeekerLocations) {
      if (this.jobProfileLocations.includes(location)) {
        matchingLocation++;
      }
    }


    // console.log(' Matching interest:', matchingLocation);

    //console.log(' Matching interest:', matchingInterest);

    const interestMatchPercentage = ((matchingInterest + matchingLocation) / (totalInterest + totalLocation)) * 100;

    // console.log('interest Match Percentage:', interestMatchPercentage);
    this.semicircle2 = "rotate(" + (45 + (interestMatchPercentage * 1.8)) + "deg)"
    return interestMatchPercentage;
  }





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
      console.log(this.getAllLocation);

      this.primaryL = this.getAllLocation.primaryLocation;
      this.secondryL = this.getAllLocation.secondaryLocation;
      this.otherL = this.getAllLocation.otherPreferedLocation;

      this.jobSeekerLocations.push(this.primaryL);
      this.jobSeekerLocations.push(this.secondryL);
      this.jobSeekerLocations.push(...this.otherL);
    });
  }




  jobProfileLocations: string[] = []; // Replace with your actual job profile locations

  getPrimaryLocationClass(location: string): string {
    return this.jobProfileLocations.includes(location)
      ? 'text-green-600'
      : 'text-red-600';
  }

  url1: string = '';

  shareJob() {
    // this.url1 = window.location.href ;
    const shareUrl = 'https://jobseeker-apk.dev.jobcheck.in/dashboard/job-profile?requirementId='+this.requirementId;
    Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: shareUrl,
      dialogTitle: 'Share with buddies',
    });
  }
  
  getproJobs() {
    this.id = localStorage.getItem("profileID");
    // this.jobid = localStorage.getItem("requirementId");
    console.log("Iddddddddddddddddddd", this.id)
    // console.log('this id',this.jobid)
    this.api.getJobStatus(this.id, this.requirementId).subscribe((data: any) => {
      this.promo = data;
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
  data: any;
  isApplied: boolean = false;

  apply() {
    this.id = localStorage.getItem("profileID");
    this.api.applyJob(this.id, this.jobId, this.promo).subscribe((res: any) => {
      console.log(res, "Job appliedddd");
      this.isApplied = true;
    });
  }
  CheckApply =()=>{
    if(this.QuestionLength==0){
      this.apply()
      console.log("length Zero")
    }else{
      this.route.navigate(['/dashboard/questionaries'] , {queryParams: { requirementId: this.requirementId }})
      console.log("Question Added")
    }
  }
}
