import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../model/projects.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProjectService {

  constructor(private http: HttpClient) { }
  masterUrl = environment.masterUrl;
  jobSeekerUrl = environment.jobSeekerUrl;

  getSkills() {
    return this.http.get(`${this.masterUrl}skills`);
  }
  getLocation() {
    return this.http.get(`${this.masterUrl}locations`);
  }

  getJobs() {
    return this.http.get(`${this.masterUrl}jobs`);
  }
 
  addNewProjectDetails( details: Project,profileId: any) {
    console.log(profileId, "project ID")
    return this.http.post<Project>(this.jobSeekerUrl + `jobseekerprofile/${profileId}/project`,details);
  }

  getProjectDetail(details: Project,profileId: any){
    return this.http.get<Project>(this.jobSeekerUrl + `jobseekerprofile/${profileId}/project`);
  }

  updateProjectDetails( details: Project,profileId: any) {
    console.log(profileId, "project ID")
    return this.http.put<Project>(this.jobSeekerUrl + `jobseekerprofile/${profileId}/project`,details);
  }

  getSingleProjects(profileId:string,project:string){
    return this.http.get(`${this.jobSeekerUrl}jobseekerprofile/${profileId}/project/${project}`)
 
  }

  updateSingleProjectDetails(uid:string,id:string,data:any){
    console.log(id,'id')
    console.log(uid,'uid')
    console.log(data,'data')
    return this.http.put(`${this.jobSeekerUrl}jobseekerprofile/${uid}/project/${id}`,data)
 
  }


  deleteProject(data:any, profileId:any){
    return this.http.delete(this.jobSeekerUrl+`jobseekerprofile/${data}/project/${profileId}`);
    ////project/61b45508-1079-492b-b1d3-0c32b2eedd81
  }
  
}
