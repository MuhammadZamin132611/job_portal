import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileJobPreferenceService {

  jobSeekerDetailsId: any;
  constructor(private http: HttpClient) { }
  masterUrl = environment.masterUrl
  JobseekersPost = environment.jobseekerUrl1

  jobseekerUrl1 = environment.jobseekerUrl1

  prefLocation(profileId: any) {
    return this.http.get(this.jobseekerUrl1 + `${profileId}/preferedjoblocation`)

  }

  areaOfInterest(profileId: any) {
    return this.http.get(this.jobseekerUrl1 + `${profileId}/areaofinterest`)
  }




  // postLocation(data:any)
  // {
  // return this.http.post(`${this.JobseekersPost}${this.jobSeekerDetailsId}/preferedjoblocation`, data)
  // }

}
