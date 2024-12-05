/*
Name: Muhammad Zmain
What: This is the controller ts file to Applied Jobs in the Jobseeker module.
Why: This is provided to Jobseeker have to see the all saved jobs
*/

// Imports - Angular Framework - Mandatory
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// Imports - JobCheck Services - Mandatory
import { SavedJobsService } from '../../services/saved-jobs.service';

// Define a component with the following metadata settings
@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})

// Class to SavedJobsComponent. This class represents the component with form elements and actions to get all saved jobs into the system
export class SavedJobsComponent implements OnInit {

  // Declare a variable type (it can hold values of any type)
  jobSeekerDetailsId: any;
  storeSavedJobs: any = [];
  SavedJobsNumber: number = 0;
  Savedjob: any[];
  searchSaved: string = '';
  nodata = false
  requirementId: any;
  data: any;
  location1: string = '';
  savedJobsCount: number = 0;
  searchSavedJob: any[] = [];
  queryJobRole: string = '';
  errorMsg: string;
  jobId: any
  isPopupVisible3 = false;
  showFilters: boolean = false;
  deleteJobs: any




  // A class with nessary injector like SavedJobsService, Location etc.
  constructor(private savedJobsService: SavedJobsService, private location: Location, private router: ActivatedRoute) {
    this.jobSeekerDetailsId = localStorage.getItem("profileID")
  }

  // It is a event action method  
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.requirementId = params.requirementId;
    });
    this.getAllSavedJobs();
    this.getCountOfSavedJobs();
  }

  // This method is used to navigate the user back to the previous location in the app history
  goBack(): void {
    this.location.back();
  }

  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3;
  }

  // Retrieves the count of saved jobs for the current job seeker and assigns it to the 'SavedJobsNumber' property.
  getCountOfSavedJobs() {
    // Call the 'getSavedJobsCount' method from the 'savedJobsService' to fetch the count of saved jobs.
    // Pass 'this.jobSeekerDetailsId' as a parameter to identify the current job seeker.
    this.savedJobsService.getSavedJobsCount(this.jobSeekerDetailsId).subscribe((data: any) => {
      // Assign the retrieved count of saved jobs to the 'SavedJobsNumber' property.
      this.SavedJobsNumber = data;
    });
  }


  // Retrieves and stores the saved jobs for the current job seeker, updating various properties.
  getAllSavedJobs() {
    // Call the 'getSavedJobs' method from the 'savedJobsService' to fetch saved job data.
    // Pass 'this.jobSeekerDetailsId' as a parameter to identify the current job seeker.
    this.savedJobsService.getSavedJobs(this.jobSeekerDetailsId).subscribe((data) => {
      // Assign the fetched data to the 'storeSavedJobs' property.
      this.storeSavedJobs = data;
      // Extract 'requirementId' values from 'storeSavedJobs' and assign them to 'deleteJobs'.
      this.deleteJobs = this.storeSavedJobs.requirementId;
      // Create a copy of 'storeSavedJobs' in 'searchSavedJob' for filtering or manipulation purposes.
      this.searchSavedJob = [...this.storeSavedJobs];
      // Calculate the number of saved jobs and assign it to 'savedJobsCount'.
      this.savedJobsCount = this.storeSavedJobs.length;
      // Check if there are no saved jobs (savedJobsCount is zero or greater).
      if (this.savedJobsCount) {
        this.nodata = true; // Set 'nodata' to true to indicate that there is data.
       } 
      else {
        this.nodata = false; // Set 'nodata' to false if there are no saved jobs.
      }
    });
  }

  // Filters saved jobs based on the query job role and updates the 'searchSavedJob' property.
  savedJobSearch() {
    // Filter the 'storeSavedJobs' array to create a new array 'searchSavedJob' based on the query job role.
    this.searchSavedJob = this.storeSavedJobs.filter((data: any) => {
      // Check if the 'jobTitle' property of each item in 'storeSavedJobs' contains the query job role (case-insensitive).
      return data.jobTitle.toLowerCase().includes(this.queryJobRole.toLowerCase());
    });
  }



  // Deletes a saved job with the given ID and refreshes the list of saved jobs.
  // @param id The ID of the saved job to be deleted.
  getdeleteSavedJob(id: any) {
    // Call the 'deleteSavedJobs' method from the 'savedJobsService' to delete the saved job.
    // Pass 'this.jobSeekerDetailsId' and the 'id' of the saved job as parameters.
    this.savedJobsService.deleteSavedJobs(this.jobSeekerDetailsId, id).subscribe((data) => {
      // After the deletion is successful, refresh the list of saved jobs by calling 'getAllSavedJobs'.
      this.getAllSavedJobs();
    });
  }

  // Show the filter
  showFilter() {
    this.showFilters = !this.showFilters;
  }
}


