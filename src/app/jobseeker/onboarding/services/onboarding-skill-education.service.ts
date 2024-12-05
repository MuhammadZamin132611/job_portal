// 1. Imports - Angular Framework - Mandatory
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OnboardingSkillEducationService {
  // Define the URLs from the environment file
  MasterUrl = environment.masterUrl;
  JobSeekerUrl = environment.jobSeekerUrl;

  constructor(private http: HttpClient) {}

  // Get the list of skills from the master data
  getMasterDataSkillslist() {
    return this.http.get(this.MasterUrl + `skills`);
  }

  // Get the list of areas of interest from the master data
  getMasterDataAreaOfInterestlist() {
    return this.http.get(this.MasterUrl + `areaofinterest`);
  }

  // Get the list of highest qualifications from the master data
  getMasterDataHighestQualificationlist() {
    return this.http.get(this.MasterUrl + `highestQualification`);
  }

  // Get the list of courses based on a qualification from the master data highestqualification/{qualification}/course?qualification=Post%20Graduation
  getMasterDatacourselist(qualification: any) {
    const encodedQualification = encodeURIComponent(qualification);
    return this.http.get(
      this.MasterUrl + `highestqualification/${qualification}/course?qualification=${encodedQualification}`
    );
  }

  // Get the list of specializations based on a course from the master data
  getMasterDataSpecilazationlist(course: any) {
    return this.http.get(this.MasterUrl +  `specialization`);
  }

  // Get education details for a profile
  getEducation(profileId: any) {
    return this.http
      .get<any>(
        this.JobSeekerUrl + `jobseekerprofile/${profileId}/educationdetail`
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  // Post education details for a profile
  postEducation(profileId: any, data: any) {
    return this.http.post<any>(
      this.JobSeekerUrl + `jobseekerprofile/${profileId}/educationdetail`,
      data
    );
  }

  // Post skills for a profile
  postSkill(profileid: string, data: any) {
    return this.http.post(
      this.JobSeekerUrl + `jobseekerprofile/${profileid}/skill`,
      data
    );
  }
}
