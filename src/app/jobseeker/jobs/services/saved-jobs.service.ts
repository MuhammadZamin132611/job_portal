// Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Imports - JobCheck Services - To store all API url's
import { environment } from 'src/environments/environment';

// Indicates that this service is provided at the root level.
@Injectable({
  providedIn: 'root',
})

// Class to SavedJobsService.
export class SavedJobsService {
  // A class with nessary injector like HttpClient.
  constructor(private http: HttpClient) { }
  jobseeker = environment.jobseeker;

  //This method call get api for saved jobs
  getSavedJobs(profileId: any) {
    return this.http.get(this.jobseeker + `savedjobs/` + `${profileId}`);
  }

  //This method call get api for saved jobs count
  getSavedJobsCount(profileId: any) {
    return this.http.get(this.jobseeker + `count/` + `${profileId}`);
  }

 //This method call delete api for unaved jobs
  deleteSavedJobs(profileId: any, requirementId: any) {
    return this.http.delete(this.jobseeker + `unsave/` + `${profileId}` + `/${requirementId}`
    );
  }
}
