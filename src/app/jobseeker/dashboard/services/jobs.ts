import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SavedJobsService {

  constructor(private http: HttpClient) { }
  jobseeker = environment.jobseeker
  

  getSavedJobs(profileId: any) {
    return this.http.get(this.jobseeker + `savedjob/` + `${profileId}` )
  }
  
  getSavedJobsCount(profileId: any) {
    return this.http.get(this.jobseeker + `count/` + `${profileId}` )
  }


}
