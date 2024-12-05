// Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Imports - JobCheck Services - To store all API url's
import { environment } from 'src/environments/environment';

// Indicates that this service is provided at the root level.
@Injectable({
  providedIn: 'root'
})
 
// Class to AppliedJobsService.
export class AppliedJobsService {
   // A class with nessary injector like HttpClient.
  constructor(private http: HttpClient) { }
  // Other environment-specific configurations..
  jobseeker = environment.jobseeker;

//This method call get api for apply jobs
  getAppliedJobs(profileId: any) {
    return this.http.get(this.jobseeker + `appliedjobs/` + `${profileId}`)
  }

 //This method call get api for apply jobs count
  getAppliedJobsCount(profileId: any) {
    return this.http.get(this.jobseeker + `count/` + `${profileId}`)
  }

  //This method call get api for shorlisted jobs
  getShortlistedJob(profileId:any){
    return this.http.get(this.jobseeker + `shortlistedjobs/` + `${profileId}`)
  }

  //This method call get api for shorlisted jobs count
  getShortlistedJobCount(profileId:any){
    return this.http.get(this.jobseeker + `appliedjobs/shortlisted/count/` + `${profileId}`)
  }
  
  
}
