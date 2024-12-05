// 1. Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { OnboardingRepositoryService } from './../repository/onboarding-repository.service';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { workExp } from '../models/work_Exp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OnboardingWorkExperienceService {
  constructor(
    private reposervice: OnboardingRepositoryService,
    private http: HttpClient
  ) {}

  // Define the URLs for the Master data and JobSeeker
  MasterUrl = environment.masterUrl;
  JobSeekerUrl = environment.jobSeekerUrl;

  // Fetch industry data from Master data
  fetchindustryfromMasterdata() {
    return this.http.get(this.MasterUrl + `industry`);
  }

  // Fetch job roles from Master data
  rolesfromMasterdata() {
    return this.http.get(this.MasterUrl + `jobs`);
  }

  // Post work experience data to the JobSeeker profile
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
}
