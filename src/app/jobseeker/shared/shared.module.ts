import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NoInternetComponent } from './components/no-internet/no-internet.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { PrivacyTermCookiesComponent } from './components/privacy-term-cookies/privacy-term-cookies.component';
import { DateAgoPipe } from './Pipes/date-ago.pipe';
import { LpaCtcPipe } from './Pipes/lpa-ctc.pipe';
import { PhoneFormatPipe } from './Pipes/phone-format.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { SideDetailsCardComponent } from './components/side-details-card/side-details-card.component';
import { WebFilterComponent } from './components/web-filter/web-filter.component';


@NgModule({
  declarations: [
    NoInternetComponent,
    FooterComponent,
    CommonHeaderComponent,
    SplashScreenComponent,
    ProfileImageComponent,
    PrivacyTermCookiesComponent,
    DateAgoPipe,
    LpaCtcPipe,
    PhoneFormatPipe,
    LoadingComponent,
    SideNavbarComponent,
    SideDetailsCardComponent,
    WebFilterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    NoInternetComponent,
    FooterComponent,
    CommonHeaderComponent,
    ProfileImageComponent,
    DateAgoPipe,
    LpaCtcPipe,
    PhoneFormatPipe,
    LoadingComponent,
    SideDetailsCardComponent,
    WebFilterComponent
  ]
})
export class SharedModule { }
