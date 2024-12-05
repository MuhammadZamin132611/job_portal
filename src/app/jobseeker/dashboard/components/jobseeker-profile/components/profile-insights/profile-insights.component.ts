import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobSeekerProfileService } from '../../Services/job-seeker-profile.service';

@Component({
  selector: 'app-profile-insights',
  templateUrl: './profile-insights.component.html',
  styleUrls: ['./profile-insights.component.css']
})
export class ProfileInsightsComponent implements OnInit {
  SavedJobsNumber: number = 0;
  AppliedNumber: number = 0;
  ShortlistedNumber: number = 0;
  RecomendedNumber: number = 0;
  RecruiterActionCount: number = 0;
  id:any;
  accordion:boolean = false;
  
  
  toggleAccordion() {
    this.accordion=!this.accordion;
  }

  constructor(private router: Router,private api:JobSeekerProfileService) { }

  ngOnInit(): void {
    this.getCountOfSavedJobs();
    // this.getAppliedJobs();
    this.getCountOfShortlistedJobs();
    this.getCountOfAppliedJobs();
    this.getCountOfRecomendedJobs();
  }

  getCountOfSavedJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfSavedJobs(this.id).subscribe((data: any) => {
      this.SavedJobsNumber = data.count;
      console.log('Count of Saved Jobs', this.SavedJobsNumber)
    });
  }



  getCountOfAppliedJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfAppliedJobs(this.id).subscribe((data: any) => {
      this.AppliedNumber = data.count;
      console.log('Count of Applied Jobs:', this.AppliedNumber)
    });
  }


  getCountOfShortlistedJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfShortlistedJobs(this.id).subscribe((data: any) => {
      this.ShortlistedNumber = data;
      console.log('Count of Shortlisted Jobs:', this.ShortlistedNumber)
      console.log('Number of Shortlisted Jobs: ', data);
    });
  }

  getCountOfRecomendedJobs() {
    this.id = localStorage.getItem("profileID");
    this.api.getNumberOfRecomendedJobs(this.id).subscribe((data: any) => {
      this.RecomendedNumber = data.count;
      console.log('Count of Recomended Jobs:', this.RecomendedNumber)
    
    });
  }

}
