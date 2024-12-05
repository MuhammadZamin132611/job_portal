import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileLanguageService {

  constructor(private http: HttpClient) { }
  jobSeekerUrl = environment.jobSeekerUrl;

  getLanguages(profileId: any) {
    return this.http.get(this.jobSeekerUrl + `jobseekerprofile/${profileId}` + `/language` )
    .pipe(map((res: any) => {
      return res;
    }))
}

  getFluency(profileId: any) {
    return this.http.get(this.jobSeekerUrl + `jobseekerprofile/${profileId}` + `/basicDetails` )
    .pipe(map((res: any) => {
      return res;
    }))
}

}
