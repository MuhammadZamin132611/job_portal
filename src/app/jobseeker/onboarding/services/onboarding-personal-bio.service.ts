// 1. Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dataModal, dataModalNew } from '../models/personal_bio';

@Injectable({
  providedIn: 'root',
})
export class OnboardingPersonalBioService {
  notificationUrl = environment.notificationUrl;

  constructor(private http: HttpClient) {}

  url: string = environment.personalBioUrl;

  // Post 1 data service
  postService(data: dataModalNew): Observable<dataModalNew> {
    return this.http.post<dataModalNew>(this.url, data);
  }

  // Verify phone number service
  phoneNumberVerificationService(phoneNumber: string) {
    const phoneURL = environment.phoneURL + `${phoneNumber}`;
    return this.http.get(phoneURL);
  }

  // Verify email service
  emailVerificationService(email: string) {
    const emailURL = environment.emailURL + `${email}`;
    return this.http.get(emailURL);
  }

  // Setting tokenId for the Tokens
  TokenId(data: any) {
    return this.http
      .post<any>(
        this.notificationUrl +
          'notification/jobseekerprofile/jobSeekerId/fullName',
        data
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
