import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportjobService {
  pushNotification= environment.notificationUrl;
  
  constructor(private http:HttpClient) { }
  postreportjob(deviceToken:any,message:any,profileId:string,requirementId:string){
    const encodedlink=encodeURIComponent(deviceToken);
    const encodedlinkformessage=encodeURIComponent(message);
    console.log(encodedlink);
    return this.http.post<any>(this.pushNotification+`reports/${profileId}/${requirementId}?deviceTokens=${encodedlink}&message=${encodedlinkformessage}`,deviceToken)
  }
}
