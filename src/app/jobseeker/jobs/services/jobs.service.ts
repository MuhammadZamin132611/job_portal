// Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

// Imports - JobCheck Services - To store all API url's
import { environment } from 'src/environments/environment';

// Indicates that this service is provided at the root level.
@Injectable({
  providedIn: 'root'
})

// Class to AppliedJobsService.
export class JobsService {

  // Declare a variable type (it can hold values of any type)
  JobseekerUrl: string;
  getPromotedJobs3: any;
// A class with nessary injector like HttpClient.
   constructor( private http: HttpClient) { }
    // Other environment-specific configurations..
  JobSeekerUrl = environment.jobseeker;
  JobSeekerProfileUrl = environment.jobseekerprofileUrl;


  // get the count of saved jobs
  getNumberOfSavedJobs(profileId: any) {
    return this.http.get<any>(this.JobSeekerUrl+`count/`+`${profileId}`)
      .pipe(map((res: any) => {
        return res;
      }
      ))
  }

// get the count of applied jobs
  getNumberOfAppliedJobs(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`count/applied/`+`${profileId}`)
      .pipe(map((res: any) => {
        return res;
      }
      ))
  }

  // get count of shorlisted jobs
  getNumberOfShortlistedJobs(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`appliedjobs/shortlisted/count/`+`${profileId}`)
      .pipe(map((res: any) => {

        return res;
      }
      ))
  }

  // get the count of offered jobs
  getNumberOfOfferedJobs(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`appliedjobs/offered/count/`+`${profileId}`)
      .pipe(map((res: any) => {
        return res;
      }
      ))
  }

  // get the count of recomended jobs
  getNumberOfRecomendedJobs(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`recomended-jobs/count`+`${profileId}`)
      .pipe(map((res: any) => {
        return res;
      }
      ))
  }

  // get the job applicatin details
  getJobdetails(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`job/candidate/`+`${profileId}`+`/overview`)
      .pipe(map((res: any) => {
        return res;
      }
      ))
  }

  // get the applied jobs
  getAppliedJobs(profileId: any) {
    return this.http.get(this.JobSeekerUrl+`appliedjobs/` + `${profileId}` )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );

  }

  // get the profile meter percentage
  apiJcProfile1() {
    return this.http.get(this.JobSeekerProfileUrl+
      `jobseekerprofile/profilemeter/${localStorage.getItem('profileID')}`
      );
  }
}
