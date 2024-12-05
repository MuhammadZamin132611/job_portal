import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditJobPreferenceService {

  jobSeekerDetailsId: any;
  constructor(private http: HttpClient) {
    // this.jobSeekerDetailsId = sessionStorage.getItem('profileID');
    console.log('User IDD', this.jobSeekerDetailsId)
  }
  masterUrl = environment.masterUrl;
  jobseekerUrl1 = environment.jobseekerUrl1
  jobSeekerUrl = environment.jobseekersProfile



  // Get Job Role from master data
  togetJobRole() {
    return this.http.get(`${this.masterUrl}jobs`);
  }
  // from profile id
  getJobRole(profileId: any) {
    return this.http.get(this.jobSeekerUrl+`${profileId}/jobrole`)
  }

  postJobRole(profileid: string, data: any) {
    // console.log("Post Job role    ------>", profileid, data)
    return this.http.post(this.jobSeekerUrl+`${profileid}/jobrole?jobroles=${data}`, data)
    //                     https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/06b36d02-130c-4649-b654-fccee46c7282/jobrole?jobroles=2D%20Engineer
  }
  deleteJobrole(data: any, profileId: any) {
    return this.http.delete(this.jobSeekerUrl + `${profileId}/jobrole?jobrole=${data}`);
    // https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/${profileId}/jobrole?jobrole=${data}
  }

  // Get Area of Interest from master data
  togetAreaofInterest() {
    return this.http.get(`${this.masterUrl}areaofinterest`);
  }
  // from profile id
  editAreaOI(profileId: any) {
    return this.http.get(this.jobSeekerUrl+`${profileId}/areaofinterest`)
  }

  getAreaOI(profileId: any) {
    console.log("area of mani",)
    return this.http.get(this.jobSeekerUrl+`${profileId}/areaofinterest`)
  }

  postAreaofInterest(profileid: string, data: any) {
    console.log("Post Area of Interest    ------>", profileid, data)
    return this.http.post(this.jobSeekerUrl+`${profileid}/areaofinterest?areaofinterest=${data}`, data)
  }

  deleteAreaofinterest(data: any, profileId: any) {
    return this.http.delete(this.jobSeekerUrl+`${profileId}/areaofinterest?areaofinterest=${data}`);
  }


  // Get location form master data
  getLocation() {
    return this.http.get(`${this.masterUrl}locations`);
  }

  editLocation(profileId: any) {
    return this.http.get(this.jobseekerUrl1 + `${profileId}/preferedjoblocation`)
  }


  postLocation(profileid: string, data: any) {
    console.log("Post Job role    ------>", profileid, data)
    return this.http.post(this.jobseekerUrl1 + `otherlocations/${profileid}/?otherLocations=${data}`, data)
    //https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/otherlocations/36df7836-5380-4f88-beee-85cce464f62c/?otherLocations=Akola

    // https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/9cc3cfc1-b8b6-4095-95a6-a2aa3f80f6fd/preferedjoblocation
  }

  putLocation(profileid: string, data: any) {
    console.log("Putting Location    ------>", profileid, data)
    return this.http.put(this.jobseekerUrl1 + `${profileid}/preferedjoblocation`, data)
  }



   deleteLocation(data: any, profileId: any) {
    return this.http.delete(this.jobseekerUrl1 + `${profileId}/preferedjoblocation?location=${data}`, data);
    // preferedjoblocation?location=Mumbai
  }


  editJobpref(profileId: any) {
    return this.http.get(this.jobseekerUrl1 + `${profileId}/jobpreference`)
  }

  postAddjobPref(profileid: string, data: any) {
    console.log("Post Job role    ------>", profileid, data)
    return this.http.post(this.jobSeekerUrl+`${profileid}/jobpreference`, data)
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

  // validationADD(data: any, check: boolean) {
  //   console.log("service", data)
  //   if (data.length <= 0 || check) {
  //     console.log("service If", data)
  //     return data = true

  //   }
  //   else {
  //     console.log("service else", data)
  //     return data = false;
  //   }
  // }
  validationEdit(data: any, check: boolean) {
    console.log("serviceEDIT", data)
    if (data.length <= 0 || check) {
      console.log("serviceEDIT IF", data)
      return data = true;

    }
    else {
      console.log("serviceEDIT ELSE", data)
      return data = false

    }
  }





}
