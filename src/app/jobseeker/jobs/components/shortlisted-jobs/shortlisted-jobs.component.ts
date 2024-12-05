import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppliedJobsService } from '../../services/applied-jobs.service';
import { JobsService } from '../../services/jobs.service';
@Component({
  selector: 'app-shortlisted-jobs',
  templateUrl: './shortlisted-jobs.component.html',
  styleUrls: ['./shortlisted-jobs.component.css']
})
export class ShortlistedJobsComponent implements OnInit {

  showFilters:boolean=false;
  data: any;
  location1: string = '';
  shortlistedJobCount: number = 0;
  jobSeekerDetailsId:any;
  id:any;
  appliedCount:any;
  shortlistedCount:any;
  offeredCount:any;
  shortlisted: boolean = true;
  offered: boolean = false;
  dateShortlisted:any;
 

  constructor(private location: Location,private jobs:AppliedJobsService,private api: JobsService) {
    this.jobSeekerDetailsId = localStorage.getItem('profileID');
  }
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getShortlistedJobs();
    this.getAppliedJobsCount();
    this.getSelectedJobsCount();
    this.getOfferedJobsCount();
  }

  showFilter(){
    this.showFilters = !this.showFilters;
  }

  shortlistedJobs:any;
  showShortlisted() {
    this.shortlisted = true;
    this.offered = false;
    
  }
  showOffered() {
    this.shortlisted = false;
    this.offered = true;
  }

  getShortlistedJobs() {
    this.jobs
      .getShortlistedJob(this.jobSeekerDetailsId).subscribe((data) => {
        
        this.shortlistedJobs = data;
        let date = this.shortlistedJobs;
        // console.log("date",date)
        // let jobact = date.jobActions.length
        // console.log("date",jobact)
        this.shortlistedJobCount = this.shortlistedJobs.length;

        console.log(this.shortlistedJobCount, '------------------>data get');
      });
  }

  getAppliedJobsCount(){
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfAppliedJobs(this.id).subscribe((data: any) => {
      let Apply = data;
      this.appliedCount = Apply.count

      console.log('Number of Applied Jobs: ', this.appliedCount);
    });

  }
  getSelectedJobsCount(){
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfShortlistedJobs(this.id).subscribe((data: any) => {
      let shortlist = data;
      this.shortlistedCount = shortlist.count
      console.log('Number of Shortlisted Jobs: ', this.shortlistedCount);
    });

  }

  getOfferedJobsCount(){
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfOfferedJobs(this.id).subscribe((data: any) => {
      let offered = data;
      this.offeredCount = offered.count;
      console.log('Number of Offered Jobs: ', this.offeredCount);
    });

  }

}
