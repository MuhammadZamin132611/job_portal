import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardJobsService } from '../../services/dashboard-jobs.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, fromEvent, Observable, Subscription, catchError } from 'rxjs';
import { ResumeService } from 'src/app/jobseeker/onboarding/services/resume.service';


@Component({
  selector: 'app-dashboard-jobs',
  templateUrl: './dashboard-jobs.component.html',
  styleUrls: ['./dashboard-jobs.component.css']
})
export class DashboardJobsComponent implements OnInit {

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status:string;
  buttonName: any='show';
  show:boolean = false;
  tick:boolean = false;
  existUser:string='';
  slider: string | any;
  defaultTransform: string | any;
  cardOpen:boolean = false;
  id: any;
  Applied:any;
  Appliedjobs:any;
  jobId:any;
  SavedJobsNumber:number=0;
  AppliedNumber:number=0;
  ShortlistedNumber:number=0;
  RecommendedNumber:number=0;
  isLoading: boolean = true;

  

  constructor(private api: DashboardJobsService, public router: Router, private resumeService:ResumeService) {}

  ngOnInit(): void {
    this.slider = document.getElementById('slider');
    this.defaultTransform = 0;
    this.getCountOfSavedJobs();
    this.getAppliedJobs();
    this.getCountOfShortlistedJobs();
    this.getCountOfAppliedJobs();
    this.getCountOfRecommendedJobs();
    this.getResume();

    
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
    

  } 

  goNext() {
    this.defaultTransform = this.defaultTransform - 500;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1)
      this.defaultTransform = 0;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }
  
  goPrev() {
    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 500;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }

  boostYourProfile(){
    this.cardOpen = !this.cardOpen;
  }

  getCountOfSavedJobs(){
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfSavedJobs(this.id).subscribe((data: any) => {
      this.SavedJobsNumber = data;
      this.isLoading = false;
      console.log('Count of Saved Jobs',this.SavedJobsNumber)
      console.log('Number of Saved Jobs: ',data);
    });
  }
 


  getCountOfAppliedJobs(){
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfAppliedJobs(this.id).subscribe((data: any) => {
      this.AppliedNumber = data;
      this.isLoading = false;
      console.log('Count of Applied Jobs:',this.AppliedNumber)
      console.log('Number of Applied Jobs: ',data);
    });
  }


  getCountOfShortlistedJobs(){
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfShortlistedJobs(this.id).subscribe((data: any) => {
      this.ShortlistedNumber = data;
      this.isLoading = false;
      console.log('Count of Shortlisted Jobs:',this.ShortlistedNumber)
      console.log('Number of Shortlisted Jobs: ',data);
    });
  }

  getCountOfRecommendedJobs(){
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfRecommendedJobs(this.id).subscribe((data: any) => {
      this.RecommendedNumber = data;
      this.isLoading = false;
      console.log('Count of Recommended Jobs:',this.RecommendedNumber)
      console.log('Number of Recommended Jobs: ',data);
    });
  }


  getAppliedJobs(){
    this.id = localStorage.getItem("profileID");
    this.api.getAppliedJobs(this.id).subscribe((data: any) => {
      console.warn("data", data);
      this.Appliedjobs = data;
      this.Applied = this.Appliedjobs
      console.log('Applied Jobs Working:', data);
     
    });
  }

  setId(value:any){

    this.jobId=value;
    console.log("+++++++++++++++++++++++++++++++")
    console.log("JobID",this.jobId);
    console.log("+++++++++++++++++++++++++++++++")
    localStorage.setItem("JobId",this.jobId);
    this.router.navigate(['application-status']);

  }

  resumeAvail = false;
  url: any
  filename: any;
  uploadedResume:any;
  uploadedResumeLength:any;
  getResume() {
    this.id = localStorage.getItem('profileID')
    console.log(this.id,"profile id");
    
    this.resumeService.getResume(this.id).subscribe((dat: any) => {
      this.uploadedResume = dat;
      this.uploadedResumeLength = dat.value.length;
      console.log("length of resume",this.uploadedResumeLength);
      
      this.url = 'https://job-check.s3.ap-south-1.amazonaws.com/' + dat.value

      if (dat.value) {
        this.resumeAvail = true;
      }
      console.log(this.filename = dat.value.slice(14, dat.value.length))
    })
  }

}
