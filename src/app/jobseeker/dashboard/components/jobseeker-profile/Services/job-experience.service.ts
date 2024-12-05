import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobExperienceService {

  constructor(private http: HttpClient) { }

  JobSeekerUrl = environment.jobSeekerUrl;
  MasterUrl = environment.masterUrl;


  getWorkExperience(profileId: any) {
    return this.http.get(this.JobSeekerUrl + `jobseekerprofile/${profileId}/workExperience`);
  }



  getWorkExperienceById(profileId: any, workExperienceId: any) {
    return this.http.get(this.JobSeekerUrl + `jobseekerprofile/${profileId}/workExperience/${workExperienceId}`);
  }


  updateWorkExperienceId(profileId: any, workExperienceId: any, value: any) {
    return this.http.put(this.JobSeekerUrl + `jobseekerprofile/${profileId}/workExperience/${workExperienceId}`, value);
  }


  DeleteWorkExperience(profileId: any, workExperienceId: any) {
    return this.http.delete<any>(this.JobSeekerUrl + `jobseekerprofile/${profileId}` + `/workExperience/${workExperienceId}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  postWorkExperience(profileId: any, data: any) {
    return this.http
      .post<any>(
        this.JobSeekerUrl + `jobseekerprofile/${profileId}/workExperience`,
        data
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }



  fetchindustryfromMasterdata() {
    return this.http.get(this.MasterUrl + `industry`);
  }


  rolesfromMasterdata() {
    return this.http.get(this.MasterUrl + `jobs`);
  }

  getLocation() {
    return this.http.get(`${this.MasterUrl}locations`);
  }

}
