import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from '../../services/applied-jobs.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  jobSeekerDetailsId:any;
  showFilters:boolean=false;
  storeAppliedJobs: any = [];

  constructor(private appliedJobsService:AppliedJobsService) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
    console.log("heeeeee", this.jobSeekerDetailsId)
  }

  ngOnInit(): void {
    this.getAllApplieddJobs();
  }

  jobData: any[] = []; 
  currentdate: any;
  appliedDate: any;
  difference: number;
  days: number;
  getAllApplieddJobs() {
    this.appliedJobsService.getAppliedJobs(this.jobSeekerDetailsId).subscribe((data) => {
      this.storeAppliedJobs = data;
      this.filteredApplications = this.storeAppliedJobs; 

      this.jobData = data
      this.currentdate = new Date()
      for(let i=0;i<this.jobData.length;i++){
        this.appliedDate=  new Date(this.jobData[i].apllicationDate)       
        this.difference = Math.floor(this.currentdate - this.appliedDate)
        this.days = Math.floor((this.difference / (1000 * 3600 * 24)));
        this.jobData[i].apllicationDate=this.appliedDate
      }
      console.log(data, "------------------>data get ")
    })
  }

  showFilter(){
    this.showFilters = !this.showFilters;
  }

  filteredApplications: any[] = []; // To store the filtered applications

   // Function to filter applications by all
   filterByAll() {
    this.filteredApplications = this.storeAppliedJobs;
  }

  // Function to filter applications by recently applied
  filterByRecentlyApplied() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    this.filteredApplications = this.storeAppliedJobs.filter(
      (application:any) =>
        new Date(application.apllicationDate) >= sevenDaysAgo &&
        new Date(application.apllicationDate) <= currentDate
    );
  }

  // Function to filter applications by last 7 days
  filterByLast7Days() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    this.filteredApplications = this.storeAppliedJobs.filter(
      (application:any) =>
        new Date(application.apllicationDate) >= sevenDaysAgo &&
        new Date(application.apllicationDate) <= currentDate
    );
  }

  // Function to filter applications by last month
  filterByLastMonth() {
    const currentDate = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    this.filteredApplications = this.storeAppliedJobs.filter(
      (application:any) =>
        new Date(application.apllicationDate) >= lastMonth &&
        new Date(application.apllicationDate) <= currentDate
    );
  }

}
