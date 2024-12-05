import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DashboardJobsService {
  JobseekerUrl: string;


  constructor( private http: HttpClient) { }
  JobSeekerUrl = environment.jobseeker;
  jobSeekerUrl = environment.jobSeekerUrl
  recruiterUrl = environment.recruiters


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

  getNumberOfRecommendedJobs(profileId: any){
    return this.http.get<any>(this.JobSeekerUrl+`recommended-jobs/`+`${profileId}`+`/count`)
      .pipe(map((res: any) => {
        return res;
      }
      ))
  }

  getReqDetails(profileId:any,requirementId:any){
   return this.http.get(`${this.JobSeekerUrl}job/details/jobstatus/${profileId}/${requirementId}`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
}

  getAppliedJobs(profileId: any) {
    return this.http.get(this.JobSeekerUrl+`appliedjobs/` + `${profileId}` )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })

      );

  }
  apiJcProfile1() {
    return this.http.get(this.jobSeekerUrl+`jobseekerprofile/profilemeter/${localStorage.getItem('profileID')}`
      )
      .pipe(map((res: any) => {
        return res;
      }))
  }


    //Getting Skills from Onboarding
  Selectedskills(data:any){
    return this.http.get<any>(this.jobSeekerUrl +`jobseekerprofile/${data}/skill`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )

  }

  updateskill(data:any,profileID:any){
    return this.http.put<any>(this.jobSeekerUrl +`jobseekerprofile/${profileID}/skill/${data.skillId}?skillId=${data.skillId}&skillName=${data.skillName}&rating=${data.rating}&skillType=${data.skillType}`,data)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }

  deleteSkill(profileId:any,skillId:string){
    return this.http.delete<any>(this.jobSeekerUrl +`jobseekerprofile/${profileId}/skill/${skillId}`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }

  addSkill(id:string,data:any){
    return this.http.post<any>(this.jobSeekerUrl +`jobseekerprofile/${id}/skill`,[data])
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }



//matching profile id with profile token
  ProfileToken(accountToken: string, profileID: any) {
    return this.http.post(environment.pushnotificationUrl + `notification/${profileID}/accountToken?accountToken=${accountToken}`,{})
      .pipe(map((res: any) => {
        return res;
      }))

  }


  //getting all notification
  GetNotification(profileID:any){
    return this.http.get<any>(environment.pushnotificationUrl +`notification/messages/${profileID}`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }

  //This method call get api for all applicant count
  getApplicantCount(jobId: any) {
    return this.http.get(this.JobSeekerUrl + `candidates-applied/job/${jobId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }

}
