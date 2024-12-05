import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruiterActionService {

  constructor(private http: HttpClient) { }
  jobseeker = environment.jobseeker;

  getTotalRecruiterAction(profileId: any) {
    return this.http.get(this.jobseeker + `sourcedjobs/` + `${profileId}`)
    //https://jobseeker-service.dev.jobcheck.in/jobseekerservice/jobseeker/sourcedjobs/ec9c4dd2-53bf-4765-9b44-92acf0338046
  }
  getcompanyviewed(profileId: any) {
    return this.http.get(this.jobseeker + `sourcedjobs/` + `${profileId}`)

  }
  getAppliedJobsCount(profileId: any) {
    return this.http.get(this.jobseeker + `count/` + `${profileId}`)
  }
  
 getCount(profileId: any) {
    return this.http.get(this.jobseeker + `recuiteraction/month/week/` + `${profileId}`)
   }
  getTotalCount(profileId: any) {
    return this.http.get(this.jobseeker + `recruiteractions/count/` + `${profileId}`)
   }
}
