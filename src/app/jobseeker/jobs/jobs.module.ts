import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { BoostYourProfileComponent } from './components/boost-your-profile/boost-your-profile.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { MatchingJobsComponent } from './components/matching-jobs/matching-jobs.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { ShortlistedJobsComponent } from './components/shortlisted-jobs/shortlisted-jobs.component';
import { RecruiterActionComponent } from './components/recruiter-action/recruiter-action.component';
import { SimilarJobsComponent } from './components/similar-jobs/similar-jobs.component';
import { TopCompanyComponent } from './components/top-company/top-company.component';
import { JobStatusComponent } from './components/job-status/job-status.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SelectedJobsComponent } from './components/selected-jobs/selected-jobs.component';
import { OfferedJobsComponent } from './components/offered-jobs/offered-jobs.component';
import { BewareofimpostersComponent } from './components/bewareofimposters/bewareofimposters.component';
import { ReportforbewaresComponent } from './components/reportforbewares/reportforbewares.component';
import { MatchingJobsProfileComponent } from './components/matching-jobs-profile/matching-jobs-profile.component';
import { CompanyviewedComponent } from './components/recruiter-action/companyviewed/companyviewed.component';
import { TotalactionComponent } from './components/recruiter-action/totalaction/totalaction.component';
import { ContactwhatsappComponent } from './components/recruiter-action/contactwhatsapp/contactwhatsapp.component';
import { ContactmessageComponent } from './components/recruiter-action/contactmessage/contactmessage.component';
import { ContactemailComponent } from './components/recruiter-action/contactemail/contactemail.component';
import { JobDescriptionComponent } from './components/job-description/job-description.component';
import { TrendingJobsComponent } from './components/trending-jobs/trending-jobs.component';
import { SimilarJobProfileComponent } from './components/similar-job-profile/similar-job-profile.component';




@NgModule({
  declarations: [
    JobsComponent,
    BoostYourProfileComponent,
    SavedJobsComponent,
    MatchingJobsComponent,
    AppliedJobsComponent,
    ShortlistedJobsComponent,
    RecruiterActionComponent,
    SimilarJobsComponent,
    TopCompanyComponent,
    JobStatusComponent,
    SelectedJobsComponent,
    OfferedJobsComponent,
    BewareofimpostersComponent,
    ReportforbewaresComponent,
    MatchingJobsProfileComponent,
    CompanyviewedComponent,
    TotalactionComponent,
    ContactwhatsappComponent,
    ContactmessageComponent,
    ContactemailComponent,
    JobDescriptionComponent,
    TrendingJobsComponent,
    SimilarJobProfileComponent,
   
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class JobsModule { }
