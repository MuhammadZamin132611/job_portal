import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoInternetComponent } from './components/no-internet/no-internet.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { PrivacyTermCookiesComponent } from './components/privacy-term-cookies/privacy-term-cookies.component';

const routes: Routes = [
  { path: 'no-connection', component: NoInternetComponent },
  { path: 'splash', component: SplashScreenComponent },
  { path: 'PrivacyTermCookies', component: PrivacyTermCookiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
