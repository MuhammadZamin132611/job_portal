// Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

// Imports - JobCheck Services - To store all API url's
import { environment } from 'src/environments/environment';

// Indicates that this service is provided at the root level
@Injectable({
  providedIn: 'root'
})

// Class to JobStatusService
export class JobStatusService {
  // Other environment-specific configurations..
  JobSeekerUrl = environment.jobseeker
  recruiterUrl = environment.recruiters
  jobSeekerUrl = environment.jobSeekerUrl

  // A class with nessary injector like HttpClient
  constructor(private http: HttpClient) { }

  //This method call get api for all get statue
  getStatus(profileId: any, jobId: any) {
    return this.http.get(this.JobSeekerUrl + `job/details/jobstatus/${profileId}/${jobId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }
//This method call get api for all applicant count
  getApplicantCount(jobId: any) {
    return this.http.get(this.JobSeekerUrl + `candidates-applied/job/${jobId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }
  //This method call get api for all applicant shorlisted count
  getApplicantShortlistedCount(jobId: any) {
    return this.http.get(this.JobSeekerUrl + `candidates-shortlisted/job/${jobId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }
  //This method call delete api for decline jobs
  deleteStatusService(jobId: any, Id: any) {
    console.log(jobId, Id)
    return this.http.put(this.JobSeekerUrl + `acceptdecline/${Id}/${jobId}?accepyordecline=NO`, "NO")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //This method call get api for similar jobs
  getSimilarJobs(profileId: any, jobRole: any) {
    return this.http.get(this.JobSeekerUrl + `jobs/similarjobs/` + `${profileId}?role=${jobRole}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }



}
