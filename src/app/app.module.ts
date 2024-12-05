import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, isDevMode, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp } from "firebase/app"
initializeApp(environment.firebase);
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
//import * as Sentry from "@sentry/angular";
import { BrowserTracing } from "@sentry/tracing";
import { APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";
import { Integrations } from "@sentry/tracing";
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { OnboardingLocationComponent } from './jobseeker/onboarding/components/onboarding-location/onboarding-location.component';
import { IonicModule } from '@ionic/angular';
import { AuthConfig, AuthModule } from '@auth0/auth0-angular';
import {ToastrModule} from 'ngx-toastr'
import { domain, clientId, callbackUri } from './linkedin.config';


// import { AngularFireModule } from '@angular/fire/compat';
//import { OnboardingComponent } from './jobseeker/onboarding/onboarding.component';
const config: AuthConfig = {
  domain,
  clientId,
  authorizationParams: {
    redirect_uri: callbackUri,
  },
  // For using Auth0-Angular with Ionic on Android and iOS,
  // it's important to use refresh tokens without the falback
  useRefreshTokens: true,
  useRefreshTokensFallback: false,
};

//Change dsn url as provided in the sentry configuration
// Sentry.init({
//   dsn: "http://fc9df03dcd76443f818d228e4ad048d2@3.7.49.143:9000/5",
//   integrations: [
//     new BrowserTracing({
//       tracePropagationTargets: ["localhost", "https://yourserver.io/api"],
//       routingInstrumentation: Sentry.routingInstrumentation,
//     }),
//   ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// initializeApp(environment.firebase);
@Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   constructor() {}
//   handleError(error: { originalError: any; }) {
//     const eventId = Sentry.captureException(error.originalError || error);
//     Sentry.showReportDialog({ eventId });
//   }
// }



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [

    IonicModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AuthModule.forRoot(config),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      //registrationStrategy: 'registerWhenStable:30000'
    })
  ],

  //, useClass: SentryErrorHandler
  providers: [{ 
    provide: ErrorHandler ,
    // provide: HTTP_INTERCEPTORS,
    // useClass: CacheInterceptor,
    // multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
