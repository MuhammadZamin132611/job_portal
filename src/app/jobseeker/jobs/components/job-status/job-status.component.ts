/*
Name: Muhammad Zmain
What: This is the controller ts file to Applied Jobs in the Jobseeker module.
Why: This is provided to Jobseeker have to see the all applied jobs
*/

// Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// Imports - JobCheck Services - Mandatory
import { JobStatusService } from '../../services/job-status.service';

// Define a component with the following metadata settings
@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.css']
})

// Class to JobStatusComponent. This class represents the component with form elements and dte recuriter actions 
export class JobStatusComponent implements OnInit {

  // Declare a variable type (it can hold values of any type)
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
  jobstatus: any;
  Id: any;
  Ids: any;
  jobId: any;
  deleteJobstatus: any;
  recommend: any;
  requirementId: any;
  jobData: any;
  location1: string = '';
  isApplied = true
  isShortlisted = false
  isViewed = false
  isOffered = false
  jobRole: any
  appliedJobsstatus: any
  messageError: any
  ApplicantCountstatus: any
  ShortlistedApplicantCountstatus: any
  isPopupVisible3 = false;

  // A class with nessary injector like JobStatusService, Location etc.
  constructor(private appliedJobsService: JobStatusService, private router: ActivatedRoute, private location: Location, private route: Router) { }
  goBack(): void {
    this.location.back();
  }

  // It is a event action method  
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.requirementId = params.requirementId;
    });
    this.getAppliedJobs();
    this.ApplicantCount();
    this.ShortlistedApplicantCount();
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


  // This function is check the recuriter action after apply a job
  checkStatus = (action: any) => {
    if (action === 'SHORTLISTED') {
      this.isApplied = false;
      this.isShortlisted = true
      this.isViewed = false
      this.isOffered = false
      console.log(action, "Is Shortlisted")
    } else if (action === 'VIEWED') {
      this.isApplied = false;
      this.isShortlisted = false
      this.isViewed = true
      this.isOffered = false
      console.log(action, "Is viewed")
    } else if (action === 'OFFERED') {
      console.log(action, "Is offered")
      this.isApplied = false;
      this.isShortlisted = false
      this.isViewed = false
      this.isOffered = true
    } else {
      this.isApplied = true;
      this.isShortlisted = false
      this.isViewed = false
      this.isOffered = false
    }
  }

  // THis function for get the apply jobs with jobs ID
  getAppliedJobs() {
    this.Id = localStorage.getItem("profileID");
    this.appliedJobsService.getStatus(this.Id, this.requirementId).subscribe((data: any) => {
      console.warn("data", data);
      this.appliedJobsstatus = data;
      this.jobRole = this.appliedJobsstatus.role;
      let apply = this.appliedJobsstatus.jobstatus[0].action;
      this.checkStatus(apply);
      this.Id = localStorage.getItem("profileID");
      this.appliedJobsService.getSimilarJobs(this.Id, this.jobRole).subscribe((data: any) => {
        this.jobData = data;
        this.checkCity();
        for (var value of this.jobData[1].locations[0].city) {
          this.location1 = this.location1 + value;
        }
      });
    });
  }

  // This function for set the role in local storage
  jobrole() {
    localStorage.setItem("role", this.jobRole)
  }

  // this function for to check the city in array
  checkCity = () => {
    if (this.jobData.length > 0) {
      if (this.jobData[0].location.length > 0) {
        this.messageError = this.jobData[0].location;
      } else {
        this.messageError = 'NA'
      }
    } else {
      this.messageError = 'NA'
    }
  }


  // This function for to get the perticular applicants jobs counts
  ApplicantCount() {
    this.Ids = this.requirementId
    this.appliedJobsService.getApplicantCount(this.Ids).subscribe((data: any) => {
      console.warn("data", data);
      this.ApplicantCountstatus = data;
      console.log('Applied Jobs Worlking:', data);

    });
  }

  // This function for to get the perticular shortlisted jobs counts
  ShortlistedApplicantCount() {
    this.Id = this.requirementId
    this.appliedJobsService.getApplicantShortlistedCount(this.Id).subscribe((data: any) => {
      console.warn("data", data);
      this.ShortlistedApplicantCountstatus = data;
      console.log('Applied Jobs Worlking:', data);

    });
  }

  // This function for delete the decline the jobs
  deleteStatus() {
    this.Id = localStorage.getItem("profileID");
    console.log(this.Id, "HHHHHHHHHHHHHH")
    this.jobId = localStorage.getItem("JobId");
    this.appliedJobsService.deleteStatusService(this.requirementId, this.Id).subscribe((data) => {
      this.deleteJobstatus = data;
      this.deleteJobstatus.status
      console.log(data, "------------------>data delete Status ")
      console.log(data.status, "------------------>data delete Status ")
      this.togglePopup3();
    })
    this.route.navigate(['/jobs'])
  }

  // Open the decline jobs popup
  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3;
  }


}
