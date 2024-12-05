import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditProjectService {

  constructor(private http: HttpClient) { }
  masterUrl = environment.masterUrl;
  jobSeekerUrl = environment.jobSeekerUrl;

  getProjectDetails(profileId: any) {
    return this.http.get(this.jobSeekerUrl + `jobseekerprofile/${profileId}` + `/project` )
  }
}
