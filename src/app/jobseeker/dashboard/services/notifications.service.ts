import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  jobseekerprofileUrl = environment.jobseekerprofileUrl;
  notificationUrl = environment.notificationUrl

  token: any;
  constructor(private http:HttpClient) { }
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
      console.log("reges granted --->>>", token)
    });
    PushNotifications.addListener('registrationError', (err) => {
      console.log(err);
    }); PushNotifications.addListener('pushNotificationReceived', (notifications) => {
      console.log(notifications);
    });

  }


  //post device token for android
  postToken( profileId: any,token:any) {
    return this.http.post<any>(this.notificationUrl + `notifcation/${profileId}/jobseekertoken?token=${token}`, token)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
  }

  //post full details token
  
deleteToken(profileId:any,tokenId:any){
  return this.http.delete<any>(this.notificationUrl +`notification/jobseeker/${profileId}/${tokenId}`)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
}

}