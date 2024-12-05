import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
   skillSelected:any;
  locationSelected:any
  storeSearch:any;

  constructor(private http:HttpClient) { }
  masterUrl = environment.masterUrl;
  recruiter = environment.recruiters;
  jobseekerServiceUrl = environment.jobseeker

  //Api call to get the location data 
  getLocation() {
    return this.http.get(this.masterUrl + `locations`)
    .pipe(map((res: any) => {
      return res;
    }))
}

//Api call to get the skill data 
  getSearchDate() {
    return this.http.get(`${this.masterUrl}skills`)
    .pipe(map((res: any) => {
      return res;
    }))
}

 //Api call to get the search data 
  getSearchJobs(skill:any, location:any,profileId: any) {
    if(location === undefined){
      console.log("location blanked")
      return this.http.get(this.jobseekerServiceUrl+`job/usersearchjobs/{search}/${profileId}?search=${skill}`)
    }else{
      console.log("location selected")
      // return this.http.get(this.jobseekerServiceUrl+`job/usersearchjobs/${skill}/${profileId}?location=${location}`)
      return this.http.get(this.jobseekerServiceUrl+`job/usersearchjobs/{search}/${profileId}?search=${skill}&location=${location}`)
    }
  }
}
