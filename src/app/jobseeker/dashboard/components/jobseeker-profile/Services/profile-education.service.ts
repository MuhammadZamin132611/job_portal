import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileEducationService {
  JobSeekerUrl = environment.jobSeekerUrl

  constructor(private http: HttpClient) { }
  getEducation(profileId:any){
    return this.http.get<any>(this.JobSeekerUrl+`jobseekerprofile/${profileId}/educationdetail`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }
}
