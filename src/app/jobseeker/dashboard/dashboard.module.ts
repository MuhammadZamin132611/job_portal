import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExampleComponent } from './components/example/example.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { JobProfileComponent } from './components/job-profile/job-profile.component';
import { GigComponent } from './components/gig/gig.component';
import { ClubComponent } from './components/club/club.component';
import { DashboardJobsComponent } from './components/dashboard-jobs/dashboard-jobs.component';
import { JobApplicationStatusComponent } from './components/job-application-status/job-application-status.component';
import { VideoComponent } from './components/video/video.component';
import { ChatbuddyComponent } from './components/chatbuddy/chatbuddy.component';
import { HeaderComponent } from './components/header/header.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { DateAgoPipe } from '../shared/Pipes/date-ago.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { ShortlistedJobsComponent } from './components/shortlisted-jobs/shortlisted-jobs.component';
import { SelectedJobsComponent } from './components/selected-jobs/selected-jobs.component';
import { OfferedJobsComponent } from './components/offered-jobs/offered-jobs.component';
import { MatchingJobsComponent } from './components/matching-jobs/matching-jobs.component';
import { SearchJobsComponent } from './components/search-jobs/search-jobs.component';
import { SearchComponent } from './components/search/search.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavbarFilterComponent } from './components/side-navbar-filter/side-navbar-filter.component';
import { ServicesComponent } from './components/services/services.component';
import { IonicModule, } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { JobsForYouComponent } from './components/jobs-for-you/jobs-for-you.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { ShowallPromotedJobsComponent } from './components/showall-promoted-jobs/showall-promoted-jobs.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportJobsComponent } from './components/report-jobs/report-jobs.component';
import { SimilarJobsComponent } from './components/similar-jobs/similar-jobs.component';
import { JobQuestionariesComponent } from './components/job-questionaries/job-questionaries.component';
import { SimilarJobProfileComponent } from './components/similar-job-profile/similar-job-profile.component';


@NgModule({
  declarations: [
    ExampleComponent,
    HomeComponent,
    SideNavbarComponent,
    JobProfileComponent,
    GigComponent,
    ClubComponent,
    DashboardJobsComponent,
    JobApplicationStatusComponent,
    VideoComponent,
    ChatbuddyComponent,
    HeaderComponent,
    
    SavedJobsComponent,
    // DateAgoPipe,
    AppliedJobsComponent,
    ShortlistedJobsComponent,
    SelectedJobsComponent,
    OfferedJobsComponent,
    MatchingJobsComponent,
    SearchJobsComponent,
    SearchComponent,
    NotificationComponent,
    SideNavbarFilterComponent,
    ServicesComponent,
    JobsForYouComponent,
    ShowallPromotedJobsComponent,
    ReportJobsComponent,
    SimilarJobsComponent,
    JobQuestionariesComponent,
    SimilarJobProfileComponent
  
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule,
    RoundProgressModule,
    NgSelectModule
  ],
  exports:[
    
  ]
})
export class DashboardModule { }
