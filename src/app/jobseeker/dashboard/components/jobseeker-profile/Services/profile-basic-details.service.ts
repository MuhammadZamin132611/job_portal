import { HttpClient , HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfileBasicDetailsService {

  jobseeker = environment.jobseekerprofileUrl;
  aboutme = environment.jobseekerUrl1
  jobSeekerProfile = environment.jobSeekerUrl;
  


  constructor(private http: HttpClient) { }

  apiJcProfile(profileId: any) {
    return this.http.get(this.jobseeker + `jobseekerprofile/` + `${profileId}` + `/basicDetails`)
  }
  summary(profileId: any) {
    return this.http.get(this.aboutme + `${profileId}` + `/personalBio`)
  }
  add(profileId: any, data: any) {
    return this.http.post(this.aboutme + `${profileId}` + `/personalBio`, data)
  }
  pushVideo(file: File, profileId: any): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('post', this.jobSeekerProfile + `jobseekerprofile/${profileId}/uploadvideo/file`, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);

  }

  deleteVideo(profileId: any){
    return this.http.delete(this.jobSeekerProfile +  `jobseekerprofile/deletevideo/${profileId}`)
    .pipe(map((res:any)=>{
      return res;
    }))
   }
   getVideo(id: any) {
    return this.http.get(
      this.jobSeekerProfile + `jobseekerprofile/${id}/getvideo`, { responseType: 'text' })
      .pipe(map((res:any)=>{
        return res;
      }))
  }
 

  apiJcProfile1(profileId: any) {
    return this.http.get( this.jobSeekerProfile +`jobseekerprofile/${profileId}/basicDetails`)
  }

}
