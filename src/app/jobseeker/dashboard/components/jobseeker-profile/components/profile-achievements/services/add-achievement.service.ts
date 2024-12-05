import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddAchievementService {
  constructor(private http: HttpClient) { }
  masterUrl = environment.masterUrl;
  jobseekerUrl = environment.jobseekersProfile

  getSkills() {
    return this.http.get(`${this.masterUrl}skills`);
  }

  postAchievement(id:string,value:any){
    return this.http.post(`${this.jobseekerUrl}${id}/achievement`,value)
  }
  getAchievement(id:string){
    return this.http.get(`${this.jobseekerUrl}${id}/achievement`)
  }

  getSingleAchiemnt(uid:string,certId:string){
    return this.http.get(`${this.jobseekerUrl}${uid}/achievement/${certId}`)
 
  }

  updateAcheivement(uid:string,id:string,data:any){
    return this.http.put(`${this.jobseekerUrl}${uid}/achievement/${id}`,data)
 
  }
  DeleteAchievement(uid: string, id: string, data: any) {
    return this.http.put(`${this.jobseekerUrl}${uid}/achievement/${id}`, data)

  }
 

}
