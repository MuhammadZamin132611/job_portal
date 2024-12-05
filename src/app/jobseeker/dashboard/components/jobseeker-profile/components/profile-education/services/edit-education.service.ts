import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditEducationService {
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
      `profilemeter/${localStorage.getItem('profileID')}`
      );
  }


  getEducation(profileId:any){
    return this.http.get<any>(this.JobSeekerUrl+`jobseekerprofile/${profileId}/educationdetail`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }

  Editeducation(profileId: any,educationId:any,data:any) {

    return this.http.put<any>(this.JobSeekerUrl+`jobseekerprofile/${profileId}/educationdetail`+`/${educationId}`,data)

   .pipe(map((res: any) => {
       return res;
     }))
 }

 DeleteEducation(profileId: any, EduId: any) {
  return this.http.delete<any>(this.JobSeekerUrl + `jobseekerprofile/${profileId}` + `/educationaldetails/${EduId}`)
    .pipe(map((res: any) => {
      return res;
    }))
}

}
