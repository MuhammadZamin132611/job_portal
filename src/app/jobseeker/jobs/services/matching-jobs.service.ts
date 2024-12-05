// Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Imports - JobCheck Services - To store all API url's
import { environment } from 'src/environments/environment';

// Indicates that this service is provided at the root level.
@Injectable({
  providedIn: 'root',
})

// Class to MatchingJobsService.
export class MatchingJobsService {
  // A class with nessary injector like HttpClient.
  constructor(private http: HttpClient) { }
  // Other environment-specific configurations..
  jobseeker = environment.jobseeker;

  //This method call get api for matching jobs
  getMatchingJobs(profileId: any) {
    return this.http.get<any>(this.jobseeker + `jobs/matchingjobs/` + `${profileId}`);
  }
}
