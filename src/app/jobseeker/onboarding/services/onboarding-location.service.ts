// 1. Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { locationDetails } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class OnboardingLocationService {
  jobSeekerDetailsId: any;

  constructor(private http: HttpClient) {
    // Initialize jobSeekerDetailsId with the profile ID from local storage
    this.jobSeekerDetailsId = localStorage.getItem('profileID');
  }

  // URL for master data
  masterUrl = environment.masterUrl;
  JobseekersPost = environment.jobseekerUrl1;
  pushnotificationUrl = environment.pushnotificationUrl;
  jobseekerUrl1 = environment.jobseekerUrl1;

  // Get location from master data
  getLocation() {
    // Retrieve the profile ID from local storage
    this.jobSeekerDetailsId = localStorage.getItem('profileID');
    return this.http.get(`${this.masterUrl}locations`);
  }

  // Get language from master data
  getLanguage() {
    return this.http.get(`${this.masterUrl}languages`);
  }

  // Post the location to Dev swagger
  postLocation(id: string, data: any) {
    return this.http.post(
      `${this.JobseekersPost}${id}/preferedjoblocation`,
      data
    );
  }

  // Post languages to the profile
  postLanguages(id: string, lang: any) {
    return this.http.post(
      `${this.JobseekersPost}${id}/language?languages=${lang}`,
      lang
    );
  }

  // Post English fluency level to the profile
  postFluency(id: string, fluency: string) {
    return this.http.post(
      `${this.JobseekersPost}${id}/englishfluency/${fluency}`,
      fluency
    );
  }

  // Post area of interest to the profile
  postAOI(id: string, data: any) {
    // Encode array elements for the URL
    const encodedArray = data.map((item: any) => encodeURIComponent(item));
    return this.http.post<any>(
      `${this.JobseekersPost}${id}/areaofinterest?areaofinterest=${encodedArray}`,
      data
    );
  }

  // Send an SMS notification for onboarding
  Onboardedsms(phoneNumber: any) {
    return this.http
      .post(
        environment.pushnotificationUrl +
          `notification/sms/Onboarded?phoneNumber=${phoneNumber}`,
        phoneNumber
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  // Post additional job locations to the profile
  postLocation1(profileid: string, data: any) {
    return this.http.post(
      this.jobseekerUrl1 +
        `otherlocations/${profileid}/?otherLocations=${data}`,
      data
    );
  }
}
