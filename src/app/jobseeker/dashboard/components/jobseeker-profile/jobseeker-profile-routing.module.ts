import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobseekerProfileComponent } from './jobseeker-profile.component';

const routes: Routes = [
  { path: '', component: JobseekerProfileComponent },
  { path: 'persionalBio', loadChildren: () => import('./components/profile-about-me/profile-about-me.module').then(m => m.ProfileAboutMeModule) },
  { path: 'aboutMe', loadChildren: () => import('./components/profile-basic-details/profile-basic-details.module').then(m => m.ProfileBasicDetailsModule) },
  { path: 'job-prefrence', loadChildren: () => import('./components/profile-job-preference/profile-job-preference.module').then(m => m.ProfileJobPreferenceModule) },
  { path: 'profile-workExperience', loadChildren: () => import('./components/profile-experience/profile-experience.module').then(m => m.ProfileExperienceModule ) },
  { path: 'languages', loadChildren: () => import('./components/profile-language/profile-language.module').then(m => m.ProfileLanguageModule ) },
  { path: 'education', loadChildren: () => import('./components/profile-education/profile-education.module').then(m => m.ProfileEducationModule ) },
  { path: 'skills', loadChildren: () => import('./components/profile-skills/profile-skills.module').then(m => m.ProfileSkillsModule ) },
  { path: 'certificate', loadChildren: () => import('./components/profile-certification/profile-certification.module').then(m => m.ProfileCertificationModule ) },
  { path: 'projects', loadChildren: () => import('./components/profile-project/profile-project.module').then(m => m.ProfileProjectModule ) },
  { path: 'achievements', loadChildren: () => import('./components/profile-achievements/profile-achievements.module').then(m => m.ProfileAchievementsModule ) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobseekerProfileRoutingModule { }
