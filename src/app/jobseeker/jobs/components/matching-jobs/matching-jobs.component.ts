/*
Name: Muhammad Zmain
What: This is the controller ts file to Applied Jobs in the Jobseeker module.
Why: This is provided to Jobseeker have to get the matching jobs
*/

// Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Imports - JobCheck Services - Mandatory
import { MatchingJobsService } from '../../services/matching-jobs.service';
import { HomeService } from 'src/app/jobseeker/dashboard/services/home.service';

// Define a component with the following metadata settings
@Component({
  selector: 'app-matching-jobs',
  templateUrl: './matching-jobs.component.html',
  styleUrls: ['./matching-jobs.component.css']
})

// Class to MatchingJobsComponent. This class represents the component with form elements and actions to get all matching jobs client into the system
export class MatchingJobsComponent implements OnInit {

  // Declare a variable type (it can hold values of any type)
  nodata = false
  isPopupVisible: boolean;
  profileID: any;
  message11 = ''
  messsage12 = ''
  Jobid: number;
  Check: any;
  matchingJobsCount: number = 0
  Matchingjobs: any
  data: any;
  location1: string = ''

  // A class with nessary injector like MatchingJobsService, HomeService etc.
  constructor(private api: MatchingJobsService, private match: HomeService, private location: Location) { }

  // It is a event action method  
  ngOnInit(): void {
    this.getmatchingJobs()
  }

  // This method is used to navigate the user back to the previous location in the app history
  goBack(): void {
    this.location.back();
  }

  // This function for Open the saved popup with jobId
  openPopup(Jobid: any, saved: any) {
    this.Jobid = Jobid;
    this.Check = saved;
    this.checkSave(saved)
    this.isPopupVisible = true;
    // console.log(Jobid, "---->", saved)
  }

  // This function for close the saved popup
  closePopup() {
    this.isPopupVisible = false;
  }

  // Functional Methods
  // The below method is used to display the message saved and unsaved job
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


  // Handles the action of toggling the state of a red heart icon (indicating job saving or unsaving).
  //Depending on the 'Check' variable, it either saves or unsaves a job for the current profile.

  redHeart = () => {
    // Get the profile ID from local storage.
    this.profileID = localStorage.getItem('profileID');
    // Check the 'Check' variable to determine whether to save or unsave the job.
    if (this.Check) {
      // If 'Check' is true, call the 'unsaved' method to unsave the job.
      this.match.unsaved(this.profileID, this.Jobid).subscribe({
        next: (res: any) => {
          // Handle the successful response (job unsaved) and update matching jobs.
          console.log(res);
          this.getmatchingJobs();
        },
        error: (error) => {
          // Handle errors if job unsaving fails.
          console.log(error.error, "Job not Unsaved successfully! Please retry");
        }
      });
    } else {
      // If 'Check' is false, call the 'postSaved' method to save the job.
      this.match.postSaved(this.profileID, this.Jobid, this.Check).subscribe({
        next: (res: any) => {
          // Handle the successful response (job saved) and update matching jobs.
          console.log(res);
          this.getmatchingJobs();
        },
        error: (error) => {
          // Handle errors if job saving fails.
          console.log(error.error, "Job not saved successfully! Please retry");
        }
      });
    }
  }

  // This method is used to get the all mathching job 
  getmatchingJobs() {
    this.Matchingjobs = localStorage.getItem('profileID');
    this.api.getMatchingJobs(this.Matchingjobs).subscribe((data) => {
      this.Matchingjobs = data;
      this.matchingJobsCount = this.Matchingjobs.length
      console.log(this.Matchingjobs, "Doubt ")
      if (this.matchingJobsCount >= 0) {
        this.nodata = true
      } else {
        this.nodata = false
      }
      this.checkCity()

      for (var value of this.data[0].locations[0].city) {
        this.location1 = this.location1 + value;
      }
      console.log(this.Matchingjobs, "------------------>JOB ROLE GETTING ")
    })
  }

  // This function for to check the city in array
  checkCity = () => {
    if (this.Matchingjobs.length >= 0) {
      console.log("shoibbbbbbbbbbbb sir", this.Matchingjobs.locations.length)
      if (this.Matchingjobs.locations.length >= 0) {
        console.log("shoibbbbbbbbbbbb if sir", this.Matchingjobs)
        this.location1 = this.Matchingjobs.locations[0].city;
      } else {
        this.location1 = 'NA'
        console.log("shoibbbbbbbbbbbb else sir", this.Matchingjobs.locations)
      }

    } else {
      this.location1 = 'NA'
    }
  }
}
