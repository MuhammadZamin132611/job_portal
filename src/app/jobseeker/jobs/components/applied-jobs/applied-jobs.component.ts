/*
Name: Muhammad Zmain
What: This is the controller ts file to Applied Jobs in the Jobseeker module.
Why: This is provided to Jobseeker have to see the all applied jobs
*/

// Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// Imports - JobCheck Services - Mandatory
import { AppliedJobsService } from '../../services/applied-jobs.service';

// Define a component with the following metadata settings
@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css'],
})

// Class to AppliedJobsComponemet. This class represents the component with form elements and actions to get all applied jobs client into the system
export class AppliedJobsComponent implements OnInit {

  // Declare a variable type (it can hold values of any type)
  jobSeekerDetailsId: any;
  showFilters: boolean = false;
  storeAppliedJobs: any = [];
  nodata = false;
  requirementId: any;
  searchAppledJob: any[] = [];
  queryJobRole: string = '';
  errorMsg: string;
  data: any;
  location1: string = '';
  appliedJobscount: number = 0;

  // A class with nessary injector like AppliedJObsService, Location etc.
  constructor(private appliedJobsService: AppliedJobsService, private location: Location, private router: ActivatedRoute) {
    this.jobSeekerDetailsId = localStorage.getItem('profileID');
  }

  // It is a event action method  
  ngOnInit(): void {
    // Subscribe to the router's queryParams observable to get query parameters
    this.router.queryParams.subscribe((params: any) => {
      // Extract the 'requirementId' parameter from the query parameters and assign it to the class property 'requirementId'
      this.requirementId = params.requirementId;
    });
    // Call the 'getAllAppliedJobs()' method to fetch and display applied jobs
    this.getAllAppliedJobs();
  }

  // This method is used to navigate the user back to the previous location in the app history
  goBack(): void {
    this.location.back();
  }

  // This function writen by to get the all applied jobs 
  getAllAppliedJobs() {
    // Call the 'getAppliedJobs' method from the 'appliedJobsService' to fetch applied job data
    this.appliedJobsService.getAppliedJobs(this.jobSeekerDetailsId).subscribe((data) => {
      // Assign the fetched data to the 'storeAppliedJobs' property
      this.storeAppliedJobs = data;
      // Create a copy of 'storeAppliedJobs' in 'searchAppledJob' for filtering or manipulation purposes
      this.searchAppledJob = [...this.storeAppliedJobs];
      // Calculate the number of applied jobs and assign it to 'appliedJobscount'
      this.appliedJobscount = this.storeAppliedJobs.length;
      // Check if there are no applied jobs (appliedJobscount is zero or greater)
      if (this.appliedJobscount) {
        this.nodata = true; // Set 'nodata' to true to indicate that there is data
      } else {
        this.nodata = false; // Set 'nodata' to false if there are no applied jobs
      }
      // Iterate through the 'city' property of the data's structure
      for (var value of this.data[1].locations[0].city) {
        // Concatenate the 'city' values and store them in the 'location1' property
        this.location1 = this.location1 + value;
      }
    });
  }

  // To function search for applied jobs
  appliedJobSearch() {
    // Filter the 'storeAppliedJobs' array to create a new array 'searchAppledJob' based on the queryJobRole
    this.searchAppledJob = this.storeAppliedJobs.filter((data: any) => {
      // Check if the 'jobTitle' property of each item in 'storeAppliedJobs' contains the queryJobRole (case-insensitive)
      return data.jobTitle.toLowerCase().includes(this.queryJobRole.toLowerCase());
    });
    // Check if the 'searchAppledJob' array is empty
    if (this.searchAppledJob.length == 0) {
      // Set 'errorMsg' to 'No Match Found!!' if no matches were found
      this.errorMsg = 'No Match Found!!';
    } else {
      // Clear 'errorMsg' if there are matches found
      this.errorMsg = '';
    }
  }

  // Show the filter
  showFilter() {
    this.showFilters = !this.showFilters;
  }
}
