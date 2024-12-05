import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dataModal } from '../model/edit-details';

@Injectable({
  providedIn: 'root'
})
export class EditBasicDetailsService {

  jobseeker=environment.jobseekerprofileUrl;
  Jobseekers = environment.jobseekerUrl1
  jobSeekerDetailsId: any;
  masterUrl = environment.masterUrl
  jobseekersProfile=environment.jobseekersProfile
  

  constructor(private http:HttpClient) { }

  apiJcProfile(profileId:any){
    return this.http.get(this.jobseekersProfile+`${profileId}`+`/basicDetails`);
  }

  updateJcProfile(id:any,data:any){
    return this.http.put<any>(this.jobseekersProfile+`${id}/basicDetails`,data);
  }
  getLocation(){
    this.jobSeekerDetailsId=localStorage.getItem("profileID")
    console.log("Iddddddddddddddddddddddd222222", this.jobSeekerDetailsId)
    console.log("get location", this.jobSeekerDetailsId);
    return  this.http.get(`${this.masterUrl}locations`);
  }

  openToWork(profileId:any,data:any){
    return this.http.post<any>(this.jobseekersProfile+`${profileId}/opentowork?openToWork=data` ,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}