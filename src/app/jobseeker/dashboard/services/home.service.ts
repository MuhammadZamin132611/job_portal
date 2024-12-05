import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  JobseekerUrl: string;
  recruiter = environment.recruiters;
  JobSeekerUrl = environment.jobseeker;
  jobSeekerUrlProfile = environment.jobSeekerUrl;
  masterUrl = environment.masterUrl;
  jobseekerUrl1 = environment.jobseekerUrl1
  jobseeker = environment.jobseekersProfile


  constructor(private http: HttpClient) { }


  //This method call get api for all jobs
  getAllJobs(profileId: any) {
    return this.http.get(this.JobSeekerUrl + `jobs` + `/${profileId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })

      );
  }
//This method call get api for similar jobs
  getSimilarJobs(profileId: any, jobRole: any) {
    return this.http.get(this.JobSeekerUrl + `jobs/similarjobs/` + `${profileId}?role=${jobRole}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }

  //This method call get api for recommended jobs
  getRecommendedJobs(profileId: any) {
    return this.http.get(this.JobSeekerUrl + `recomended-jobs/` + `${profileId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }

  getPromotedJobs(profileId: any) {
    return this.http.get(this.JobSeekerUrl + `job/areaofinterest/${profileId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }

  //This method call get api for Trending jobs
  getTrendingJobs(profileId: any) {
    return this.http.get(this.JobSeekerUrl + `trendingjobs/${profileId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }

  //This method call get api for Job Status
  getJobStatus(profileId: any, jobId: any) {
    return this.http.get(this.JobSeekerUrl + `job/details/jobstatus/${profileId}/${jobId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }

  //This method call get api for Area of Interest
  getAllAreaOfInterest(profileId: any) {
    return this.http.get(this.jobSeekerUrlProfile + `jobseekerprofile/${profileId}/areaofinterest`)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  //This method call get api for Featured Company
  getFeaturesCompany(profileId: any) {
    console.log("service working")
    return this.http.get(this.recruiter + `job/featuredCompany/${profileId}`)
      .pipe(catchError((error) => {
        return throwError(error);
      })
      );
  }
  //This method call get api for Job Role
  getJobRole() {
    return this.http.get(`${this.masterUrl}jobs`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //This method call a post api to save job
  postSaved(profileId: any, jobId: any, data: any) {
    return this.http.post<any>(this.JobSeekerUrl + `save/jobs/` + `${profileId}/` + `${jobId}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //This method call a delete api to unsave job
  unsaved(profileId: any, jobId: any) {
    return this.http.delete(this.JobSeekerUrl + `unsave/${profileId}/${jobId}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  postDiver(profileId: any, specially: any, lgbtq: any) {
    return this.http.post<any>(this.jobseekerUrl1 + ` ${profileId}/` + `diversity?speciallyAbled=${specially}&lgbtg=${lgbtq}`, specially)
      .pipe(map((res: any) => {
        return res;
      }))
  }



//This method call a post api to apply job
  applyJob(profileId: any, jobId: any, data: any) {
    return this.http.post<any>(this.JobSeekerUrl + `applyjobs/` + `${profileId}/` + `${jobId}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  answerPost = (profileId: any, jobId: any, response: any) => {
    return this.http.post(this.JobSeekerUrl + `applyjobs/answer/${profileId}/${jobId}`, response)
  }
  
}
