import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileImagesService {
  jobSeekerProfile = environment.jobSeekerUrl;


  constructor(private http:HttpClient) { }
  apiJcProfile(id:any){
    return this.http.get(this.jobSeekerProfile+`jobseekerprofile/${id}/basicDetails`)
    .pipe(map((res: any) => {
      return res;
    }))
}

  getImage(id: any) {
    return this.http.get(
      this.jobSeekerProfile + `jobseekerprofile/${id}/getimage`, { responseType: 'text' }
    )
    .pipe(map((res: any) => {
      return res;
    }))
}

}
