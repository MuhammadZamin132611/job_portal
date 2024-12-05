import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditLanguageService {

  constructor(private http: HttpClient) { }

  masterUrl = environment.masterUrl;
  jobSeekerUrl = environment.jobSeekerUrl;


  getLanguage() {
    return this.http.get(`${this.masterUrl}languages`);
  }
  getLanguages(profileId: any) {
    return this.http.get(this.jobSeekerUrl + `jobseekerprofile/${profileId}` + `/language` )
  }
  getFluency(profileId: any) {
    return this.http.get(this.jobSeekerUrl + `jobseekerprofile/${profileId}` + `/basicDetails` )
  }

  postLanguages(lang:any, profileId:any){
      return this.http.post(this.jobSeekerUrl+`jobseekerprofile/${profileId}/language?languages=${lang}`,lang)
  }
  postFluency(fluency:any, profileId:any){
      return this.http.post(this.jobSeekerUrl+`jobseekerprofile/${profileId}/englishfluency/${fluency}`,fluency)
  }

  deleteLanguages(data:any, profileId:any){
    return this.http.delete(this.jobSeekerUrl+`jobseekerprofile/${profileId}/language?language=${data}`);
  }
}
