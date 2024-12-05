import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EditAchievementService {
  jobseekerUrl = environment.jobseekersProfile

  
  constructor(private http:HttpClient) { }
  

  
  deleteAchievement(uid: string, id: string, data: any) {
    return this.http.delete(`${this.jobseekerUrl}${uid}/achievement/${id}`, data)

  }
}
