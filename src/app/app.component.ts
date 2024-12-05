import { Component,NgZone,OnInit  } from '@angular/core';
import { StatusBar,Style  } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { callbackUri } from './linkedin.config';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { ToastrService } from 'ngx-toastr';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { environment } from "../environments/environment";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'JobCheck';
  message: any = null;
  constructor(private platform: Platform,private zone: NgZone,private router: Router,private ngZone: NgZone,public linked:AuthService,private toastr: ToastrService) {
  
  // SplashScreen.show({
  //     showDuration: 2000,
  //     autoHide: true
  //   });

  //    SplashScreen.show({
  //      autoHide: true,
  //      showDuration: 0,
  //    });
  }

  ngOnInit() {
    this.requestpermision()
    this.listen();
    //linkden
    App.addListener('appUrlOpen', ({ url }) => {
      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular
      this.ngZone.run(() => {
        if (url?.startsWith(callbackUri)) {
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            this.linked
              .handleRedirectCallback(url)
              .pipe(mergeMap(() => Browser.close()))
              .subscribe();
          } else {
            Browser.close();
          }
        }
      });
    });



    const currentPath = localStorage.getItem('currentPath');
    if (currentPath){
      this.router.navigate([currentPath]);
    }
    
   //this.hideSplashScreen();
    this.platform.ready().then(() => {
     // this.router.navigateByUrl('shared/splash')
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setBackgroundColor({ color: '#00000000' });
      this.setStatusBarColor();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }


  //  async hideSplashScreen() 
  //  {
  //    setTimeout(async () => {
  //      await SplashScreen.hide();
  //    }, 3000); // delay for 3 seconds (3000 milliseconds)
  //  }

  private setStatusBarColor() {
    const body = document.getElementsByTagName('body')[0];
    const observer = new MutationObserver(() => {
      if (body.classList.contains('ion-color-light')) {
        StatusBar.setStyle({ style: Style.Dark });
      } else {
        StatusBar.setStyle({ style: Style.Light });
      }
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false,
    });
  }
  
   //For receiving notifications
   listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      this.message = payload;
      console.log(payload)
      this.toastr.success(this.message.notification.body
        ,this.message.notification.title
        );
  
    });
  }

  //get Token

  requestpermision(){
    const messaging = getMessaging()
    getToken(messaging,{vapidKey:environment.firebase.vapidKey}).then(
      (currentToken)=>{
        if(currentToken){
          console.log("Current token get",currentToken)
        }else{
          console.log("No current token please grant the Access token")
        }
      }
    ).catch((err)=>{
      console.log("Something will happen wrong when getting",err)
    })
  }


}
