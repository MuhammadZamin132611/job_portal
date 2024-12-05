import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CertificateService {


  constructor(private http:HttpClient) { }
  jobSeekerProfile = environment.jobseekersProfile;

  Uploadcertificate(file:any,id:string){
    return this.http.post(this.jobSeekerProfile
    +id+'/certificationInfo',file)
   }
   getCertificate(profileID:any){

    // return this.http.get('https://jobseekers-profile-service.dev.jobcheck.in/jobseekerprofileservice/jobseekerprofile/'
    // +profileID+'/certificationInfo')

    return this.http.get(this.jobSeekerProfile+`${profileID}/certificateInfo`);
    
  }
  
  deletecertificate(profileId: any,certId:string){
    return this.http.delete(this.jobSeekerProfile+`${profileId}/certificateInfo/${certId}
    `);
   }


   
  updateCert(uid:string,certId:string,data:any){
 return this.http.put(this.jobSeekerProfile+`${uid}/certificateInfo/${certId}`,data)
  }

}
