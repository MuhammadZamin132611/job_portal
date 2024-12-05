import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClubComponent } from './components/club/club.component';
import { GigComponent } from './components/gig/gig.component';


import { HomeComponent } from './components/home/home.component';
import { JobProfileComponent } from './components/job-profile/job-profile.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { DashboardJobsComponent } from './components/dashboard-jobs/dashboard-jobs.component';
import { JobApplicationStatusComponent } from './components/job-application-status/job-application-status.component';
import { VideoComponent } from './components/video/video.component';
import { ChatbuddyComponent } from './components/chatbuddy/chatbuddy.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { ShortlistedJobsComponent } from './components/shortlisted-jobs/shortlisted-jobs.component';
import { SelectedJobsComponent } from './components/selected-jobs/selected-jobs.component';
import { OfferedJobsComponent } from './components/offered-jobs/offered-jobs.component';
import { MatchingJobsComponent } from './components/matching-jobs/matching-jobs.component';
import { SearchJobsComponent } from './components/search-jobs/search-jobs.component';
import { SearchComponent } from './components/search/search.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ServicesComponent } from './components/services/services.component';
import { JobsForYouComponent } from './components/jobs-for-you/jobs-for-you.component';
import { ShowallPromotedJobsComponent } from './components/showall-promoted-jobs/showall-promoted-jobs.component';
import { ReportJobsComponent } from './components/report-jobs/report-jobs.component';
import { SimilarJobsComponent } from './components/similar-jobs/similar-jobs.component';
import { JobQuestionariesComponent } from './components/job-questionaries/job-questionaries.component';
import { SimilarJobProfileComponent } from './components/similar-job-profile/similar-job-profile.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'side-nave', component: SideNavbarComponent },
  { path: 'dashboard-jobs', component: DashboardJobsComponent },
  { path: 'gig', component: GigComponent },
  { path: 'club', component: ClubComponent },
  { path: 'jobs', component: DashboardJobsComponent },
  { path: 'application-status', component: JobApplicationStatusComponent },
  { path: 'job-profile', component: JobProfileComponent },
  { path: 'video', component: VideoComponent },
  { path: 'chatbuddy', component: ChatbuddyComponent },
  { path: 'saved-jobs', component: SavedJobsComponent },
  { path: 'applied-jobs', component: AppliedJobsComponent },
  { path: 'shortlisted-jobs', component: ShortlistedJobsComponent },
  { path: 'selected-jobs', component: SelectedJobsComponent },
  { path: 'offered-jobs', component: OfferedJobsComponent },
  { path: 'matching-jobs', component: MatchingJobsComponent },
  { path: 'search-jobs', component: SearchJobsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'services', component: ServicesComponent },
  {path: 'jobsForYou', component:JobsForYouComponent},
  {path:'reportJobs',component:ReportJobsComponent},
  {path:'similarJobs',component:SimilarJobsComponent},
  {path:'similarJobsDetails',component:SimilarJobProfileComponent},
  {path:'questionaries',component:JobQuestionariesComponent},
  {path: 'showall-promotedJobs', component:ShowallPromotedJobsComponent},
  {path:'profile',
  loadChildren:()=>import('./components/jobseeker-profile/jobseeker-profile.module').then(m=>m.JobseekerProfileModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
