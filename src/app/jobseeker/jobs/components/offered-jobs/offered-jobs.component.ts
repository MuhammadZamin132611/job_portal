import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-offered-jobs',
  templateUrl: './offered-jobs.component.html',
  styleUrls: ['./offered-jobs.component.css']
})
export class OfferedJobsComponent implements OnInit {
  showFilters:boolean=false;
  id:any;
  offeredJobs:any;
  constructor(private location: Location,private api: JobsService) {}
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getOfferedJobsCount();
  }

  showFilter(){
    this.showFilters = !this.showFilters;
  }

  getOfferedJobsCount(){
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfOfferedJobs(this.id).subscribe((data: any) => {
      this.offeredJobs = data.savedAndAppliedDto;
      console.log("offered jobs---",this.offeredJobs);


     
    });

  }

}
