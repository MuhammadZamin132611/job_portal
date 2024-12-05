import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppliedJobsService } from '../../services/applied-jobs.service';

@Component({
  selector: 'app-selected-jobs',
  templateUrl: './selected-jobs.component.html',
  styleUrls: ['./selected-jobs.component.css']
})
export class SelectedJobsComponent implements OnInit {
  showFilters:boolean=false;
  jobSeekerDetailsId:any;
  id:any;
  appliedCount:any;
  shortlistedCount:any;

  shortlistedJobs:any;

  constructor(private location: Location,private jobs:AppliedJobsService,) {}
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getShortlistedJobs();
  }

  showFilter(){
    this.showFilters = !this.showFilters;
  }
  getShortlistedJobs() {
    this.id = localStorage.getItem("profileID");
    this.jobs
      .getShortlistedJob(this.id).subscribe((data) => {
        
        this.shortlistedJobs = data;
        console.log(this.shortlistedJobs, '------------------>data getghjkljgfhdhjkl');
        console.log(this.shortlistedJobs.jobActions[0],"hellooooooooo")
      });
  }

}
