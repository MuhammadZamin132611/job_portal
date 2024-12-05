import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddJobPreferenceService {
  jobSeekerDetailsId: any;
  constructor(private http: HttpClient) {
    console.log('User IDD', this.jobSeekerDetailsId)
  }
  masterUrl = environment.masterUrl;
  jobseekerUrl1 = environment.jobSeekerUrl

  togetJobRole() {
    return this.http.get(`${this.masterUrl}jobs`);
    // https://masterdata.dev.jobcheck.in/masterdatabase/masterdata/jobs
  }

  togetAreaofInterest() {
    return this.http.get(`${this.masterUrl}areaofinterest`);
  }

  getLocation() {
    return this.http.get(`${this.masterUrl}locations`);
  }
  editAreaOI(profileId: any) {
    return this.http.get(this.jobseekerUrl1 + `jobseekerprofile/ ${profileId}/areaofinterest`)
  }
  editLocation(profileId: any) {
    return this.http.get(this.jobseekerUrl1 + `jobseekerprofile/${profileId}/preferedjoblocation`)
  }
  getJobRole(profileId: any) {
    return this.http.get(this.jobseekerUrl1 + `jobseekerprofile/${profileId}/jobrole`)
  }
  getJobpref(profileId: any) {
    return this.http.get(this.jobseekerUrl1 + `jobseekerprofile/${profileId}/jobpreference`)
  }

  postJobRole(profileid: string, data: any) {
    console.log("Post Job role    ------>", profileid, data)
    return this.http.post(this.jobseekerUrl1 + `jobseekerprofile/${profileid}/jobrole?jobroles=${data}`, data)
  }
  postAreaofInterest(profileid: string, data: any) {
    console.log("Post Job role    ------>", profileid, data)
    return this.http.post(this.jobseekerUrl1 + `jobseekerprofile/${profileid}/areaofinterest?areaofinterest=${data}`, data)
  }
  postLocation(profileid: string, data: any) {
    console.log("Post Job role    ------>", profileid, data)
    return this.http.post(this.jobseekerUrl1 + `jobseekerprofile/${profileid}/preferedjoblocation`, data)
  }

  postAddjobPref(profileid: string, data: any) {
    console.log("Post Job role    ------>", profileid, data)
    return this.http.post(this.jobseekerUrl1 + `jobseekerprofile/${profileid}/jobpreference`, data)
  }

  putAddjobPref(profileid: string, data: any) {

    return this.http.put(this.jobseekerUrl1 + `jobseekerprofile/${profileid}/jobpreference`, data)

      .pipe(map((res: any) => {
        return res;
      }))
  }

  validationADD(data: any, check: boolean) {
    console.log("service", data)
    if (data.length <= 0 || check) {
      console.log("service If", data)
      return data = true

    }
    else {
      console.log("service else", data)
      return data = false;
    }
  }




}
