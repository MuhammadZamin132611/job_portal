// 1. Imports - Angular Framework - Mandatory
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(private http: HttpClient) {}

  // URL for resume-related operations
  resumeUrl: any = environment.jobseekerUrl1;

  // Uploads a resume file
  uploadResume(file: any, id: string) {
    return this.http.post(this.resumeUrl + id + '/uploadresume/file', file);
  }

  // Deletes a resume for a user
  delete(uid: any, data: any) {
    return this.http.delete(`${this.resumeUrl}deleteResume/${uid}`, data).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  // Gets the resume for a user
  getResume(uid: any) {
    return this.http.get(this.resumeUrl + uid + '/getresume');
  }
}
