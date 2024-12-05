import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  MasterUrl = environment.masterUrl;
  JobSeekerUrl = environment.jobSeekerUrl
  constructor(private http: HttpClient) { }

  getMasterDataHighestQualificationlist() {
    return this.http.get(this.MasterUrl+`highestQualification`);  
  }
  getMasterDatacourselist(qualification:any){
    return this.http.get(this.MasterUrl+`highestqualification/${qualification}/course`)
  }
  getMasterDataSpecilazationlist(course:any){
    return this.http.get(this.MasterUrl+`course/${course}/specialization`)
  }
  apiJcProfile1() {
    return this.http.get(
      `https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/profilemeter/${localStorage.getItem('profileID')}`
      );
  }


}
