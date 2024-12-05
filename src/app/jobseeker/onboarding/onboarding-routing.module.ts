import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingCongratulationComponent } from './components/onboarding-congratulation/onboarding-congratulation.component';
import { OnboardingLocationComponent } from './components/onboarding-location/onboarding-location.component';
import { OnboardingPersonalBioComponent } from './components/onboarding-personal-bio/onboarding-personal-bio.component';
import { OnboardingRocketLaunchComponent } from './components/onboarding-rocket-launch/onboarding-rocket-launch.component';
import { OnboardingSkillEducationComponent } from './components/onboarding-skill-education/onboarding-skill-education.component';
import { OnboardingWorkExperienceComponent } from './components/onboarding-work-experience/onboarding-work-experience.component';
import { OnboardingMainComponent } from './components/onboarding-main/onboarding-main.component';
import { OnboardingProgressComponent } from './components/onboarding-progress/onboarding-progress.component';
import { OnboardingUploadResumeComponent } from './components/onboarding-upload-resume/onboarding-upload-resume.component';

const routes: Routes = [
  
  { path: 'aboutMe', component: OnboardingPersonalBioComponent },
  { path: 'skill&Education', component: OnboardingSkillEducationComponent },
  { path: 'workExperience', component: OnboardingWorkExperienceComponent },
  { path: 'location', component: OnboardingLocationComponent },
  { path: 'launch', component: OnboardingRocketLaunchComponent },
  { path: 'congratulation', component: OnboardingCongratulationComponent },
  { path: 'main', component:OnboardingMainComponent },
  { path: 'progress', component:OnboardingProgressComponent} ,
{path:'uploadResume',component:OnboardingUploadResumeComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
