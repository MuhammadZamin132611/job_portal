import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobseekerProfileRoutingModule } from './jobseeker-profile-routing.module';
import { JobseekerProfileComponent } from './jobseeker-profile.component';
import { ProfileInsightsComponent } from './components/profile-insights/profile-insights.component';
import { ProfileAboutMeComponent } from './components/profile-about-me/profile-about-me.component';
import { ProfileExperienceComponent } from './components/profile-experience/profile-experience.component';
import { ProfileSkillsComponent } from './components/profile-skills/profile-skills.component';
import { ProfileLanguageComponent } from './components/profile-language/profile-language.component';
import { ProfileCertificationComponent } from './components/profile-certification/profile-certification.component';
import { ProfileEducationComponent } from './components/profile-education/profile-education.component';
import { ProfileJobPreferenceComponent } from './components/profile-job-preference/profile-job-preference.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { ProfileBasicDetailsComponent } from './components/profile-basic-details/profile-basic-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileAboutMeModule } from './components/profile-about-me/profile-about-me.module';
import { IonicModule } from '@ionic/angular';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { NgOtpInputModule } from  'ng-otp-input';
import { ProfileAchievementsComponent } from './components/profile-achievements/profile-achievements.component';
import { ProfileProjectComponent } from './components/profile-project/profile-project.component';

// import { AddCertificateComponent } from './components/profile-certification/add-certificate/add-certificate.component';


@NgModule({
  declarations: [
    JobseekerProfileComponent,
    ProfileInsightsComponent,
    ProfileAboutMeComponent,
    ProfileExperienceComponent,
    ProfileSkillsComponent,
    ProfileLanguageComponent,
    ProfileCertificationComponent,
    ProfileEducationComponent,
    ProfileJobPreferenceComponent,
    ProfileBasicDetailsComponent,
    ProfileAchievementsComponent,
    ProfileProjectComponent
  ],
  imports: [
    CommonModule,
    JobseekerProfileRoutingModule,
    SharedModule,
    FormsModule,
    NgOtpInputModule,
    ProfileAboutMeModule,
    ReactiveFormsModule,
    RoundProgressModule,
    IonicModule.forRoot(),

  ]
})
export class JobseekerProfileModule { }
