import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppliedJobsService {

  constructor(private http: HttpClient) { }
  jobseeker = environment.jobseeker;

  getAppliedJobs(profileId: any) {
    return this.http.get(this.jobseeker + `appliedjobs/` + `${profileId}`)
    .pipe(map((res: any) => {
      return res;
    }))
}


  getAppliedJobsCount(profileId: any) {
    return this.http.get(this.jobseeker + `count/` + `${profileId}`)
    .pipe(map((res: any) => {
      return res;
    }))
}

}
