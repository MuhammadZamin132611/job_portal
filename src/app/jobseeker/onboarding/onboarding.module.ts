import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingLocationComponent } from './components/onboarding-location/onboarding-location.component';
import { OnboardingWorkExperienceComponent } from './components/onboarding-work-experience/onboarding-work-experience.component';
import { OnboardingPersonalBioComponent } from './components/onboarding-personal-bio/onboarding-personal-bio.component';
import { OnboardingSkillEducationComponent } from './components/onboarding-skill-education/onboarding-skill-education.component';
import { OnboardingCongratulationComponent } from './components/onboarding-congratulation/onboarding-congratulation.component';
import { OnboardingProgressComponent } from './components/onboarding-progress/onboarding-progress.component';
import { OnboardingRocketLaunchComponent } from './components/onboarding-rocket-launch/onboarding-rocket-launch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingMainComponent } from './components/onboarding-main/onboarding-main.component';
import { IonicModule } from '@ionic/angular';
import { OnboardingUploadResumeComponent } from './components/onboarding-upload-resume/onboarding-upload-resume.component';
import { NoInternetComponent } from '../shared/components/no-internet/no-internet.component';
import { SharedModule } from '../shared/shared.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    OnboardingLocationComponent,
    OnboardingWorkExperienceComponent,
    OnboardingPersonalBioComponent,
    OnboardingSkillEducationComponent,
    OnboardingCongratulationComponent,
    OnboardingProgressComponent,
    OnboardingRocketLaunchComponent,
    OnboardingMainComponent,
    OnboardingUploadResumeComponent,
   
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    SharedModule,
    RoundProgressModule
    
  ],
 

  
})
export class OnboardingModule { }
