import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http"
import { ExampleRepoService } from '../repository/exampleRepo.service';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from '../models/examplePost.model';
import { Observable, Subject, throwError } from "rxjs";
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  error = new Subject<String>;
  jobseekerprofileUrl = environment.jobseekerprofileUrl;
  token: any;
  static fetchPostfromRepo: any;
  jobseekersProfile=environment.jobseekersProfile;
  jobSeekerProfile = environment.jobSeekerUrl;


  static createAndStorePost //Do not call api from here
    (createAndStorePost: any) {
      throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private repoService: ExampleRepoService) { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      console.log("ÿes")
      this.registerPush();
      console.log("hellooo", this.registerPush())
    }

  }
  private registerPush() {
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      }
      else {
        // If permission is not granted
      }
    });
    PushNotifications.addListener('registration', (token) => {
      console.log(token);
      this.token = token.value;
    });
    PushNotifications.addListener('registrationError', (err) => {
      console.log(err);
    }); PushNotifications.addListener('pushNotificationReceived', (notifications) => {
      console.log(notifications);
    });

  }


  //post device token for android
  postToken(data: any, profileId: any,profileToken:any) {
    return this.http.post<any>(this.jobseekerprofileUrl + `jobseekerprofile/${profileId}/profileToken/${profileToken}`, data)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }

  fetchPostfromRepo() {
    return this.repoService.fetchPosts().pipe(
      map(responseData => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      })
      , catchError(errorRes => {
        console.log("error from catchError " + errorRes)
        return throwError(errorRes);
      })
    )

  }

 
  createAndStorePost(postData: Post) {

    return this.http.post(
      'https://ng-complete-guide-cca09-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'
      }
    ).subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    })
 
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-cca09-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'response'
      })
      .pipe(
        tap(event => {
          console.log(event);
        })
      )
  }
  apiJcProfile(id:any){
    return this.http.get(this.jobseekerprofileUrl+`jobseekerprofile/${id}/basicDetails`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  location:any
  apiJcProfile5(id:any){
    return this.http.get(this.jobseekerprofileUrl+`jobseekerprofile/profile/details/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  apiJcProfile1() {
    return this.http.get(this.jobseekerprofileUrl+
      `jobseekerprofile/profilemeter/${localStorage.getItem('profileID')}`
      )
      .pipe(map((res:any)=>{
        return res;
      }))
  }





  pushImage(file: File, profileId: any): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('post', this.jobSeekerProfile + `jobseekerprofile/${profileId}/uploadimages/image`, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);

  }

  getImage(id: any) {
    return this.http.get(
      this.jobSeekerProfile + `jobseekerprofile/${id}/getimage`, { responseType: 'text' })
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  deleteImage(profileId: any){
    return this.http.delete(this.jobSeekerProfile +  `jobseekerprofile/deleteImage/${profileId}`)
    .pipe(map((res:any)=>{
      return res;
    }))
   }
  

   openToWork(profileId:any,data:any){
    return this.http.post<any>(this.jobseekersProfile+`${profileId}/opentowork?openToWork=${data}` ,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  verification(profileId:any,data:any){
    return this.http.post<any>(this.jobseekersProfile+`${profileId}/verifyaccount` ,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
