import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddEducatiomService {
  MasterUrl = environment.masterUrl;
  JobSeekerUrl = environment.jobSeekerUrl

  constructor(private http: HttpClient) { }


  getMasterDataUniversitylist(){
    return this.http.get(this.MasterUrl+`universities`);  
  }

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
    return this.http.get(this.JobSeekerUrl+
      `jobseekerprofile/profilemeter/${localStorage.getItem('profileID')}`
      );
  }

  postEducation(data: any, profileId:any){
    return this.http.post<any>(this.JobSeekerUrl+`jobseekerprofile/`+`${profileId}/educationdetail`,data)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }

}


