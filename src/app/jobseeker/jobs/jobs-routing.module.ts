import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { MatchingJobsComponent } from './components/matching-jobs/matching-jobs.component';
import { ShortlistedJobsComponent } from './components/shortlisted-jobs/shortlisted-jobs.component';
import { JobStatusComponent } from './components/job-status/job-status.component';
import { SelectedJobsComponent } from './components/selected-jobs/selected-jobs.component';
import { OfferedJobsComponent } from './components/offered-jobs/offered-jobs.component';
import { BewareofimpostersComponent } from './components/bewareofimposters/bewareofimposters.component';
import { ReportforbewaresComponent } from './components/reportforbewares/reportforbewares.component';
import { RecruiterActionComponent } from './components/recruiter-action/recruiter-action.component';
import { JobDescriptionComponent } from './components/job-description/job-description.component';
import { TrendingJobsComponent } from './components/trending-jobs/trending-jobs.component';
import { SimilarJobProfileComponent } from './components/similar-job-profile/similar-job-profile.component';
import { SimilarJobsComponent } from './components/similar-jobs/similar-jobs.component';

const routes: Routes = [
  { path: '', component: JobsComponent },
  { path: 'applied-jobs', component: AppliedJobsComponent },
  { path: 'saved-jobs', component: SavedJobsComponent },
  { path: 'matching-jobs', component: MatchingJobsComponent },
  { path: 'shortlisted-jobs', component: ShortlistedJobsComponent },
  { path: 'jobStatus', component: JobStatusComponent },
  { path: 'selected-jobs', component: SelectedJobsComponent },
  { path: 'offered-jobs', component: OfferedJobsComponent },
  { path: 'beware-imposters', component: BewareofimpostersComponent },
  { path: 'report-beware', component: ReportforbewaresComponent },
  { path: 'recruiterAction', component:RecruiterActionComponent},
  { path: 'job-description', component:JobDescriptionComponent},
  { path: 'trending-jobs',component:TrendingJobsComponent},
  { path: 'similarJobProfile',component:SimilarJobProfileComponent},
  { path: 'similarJobs',component:SimilarJobsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
