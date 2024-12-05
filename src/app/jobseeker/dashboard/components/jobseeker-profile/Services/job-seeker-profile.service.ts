import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerProfileService {
  constructor( private http: HttpClient) { }
  JobSeekerUrl = environment.jobseeker;


  getNumberOfSavedJobs(profileId: any) {
    return this.http.get<any>(this.JobSeekerUrl+`count/`+`${profileId}`)
      .pipe(map((res: any) => {
        return res;
      }
      ))
  }

  getNumberOfAppliedJobs(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`count/applied/`+`${profileId}`)
      .pipe(map((res: any) => {
        return res;
      }
      ))
  }

  getNumberOfShortlistedJobs(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`count/applied/`+`${profileId}`)
      .pipe(map((res: any) => {

        return res;
      }
      ))
  }

  getNumberOfRecomendedJobs(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`jobsforyou/count/`+`${profileId}`)
      .pipe(map((res: any) => {

        return res;
      }
      ))
  }

  getNumberofRecruiterActionJobs(profileId:any){
  // https://jobseeker-service.dev.jobcheck.in/jobseeker/appliedjobs/93464276-bd52-4b78-89ec-c7eb150864d9/sourced/count
  return this.http.get<any>(`https://jobseeker-service.dev.jobcheck.in/jobseeker/appliedjobs/`+`${profileId}`+`/sourced/count
  `)
    // return this.http.get<any>(this.JobSeekerUrl+`appliedjobs/`+`${profileId}`+`/sourced/count`)
    // .pipe(map((res:any)=>{
    //   return res
    // }))
  }
}