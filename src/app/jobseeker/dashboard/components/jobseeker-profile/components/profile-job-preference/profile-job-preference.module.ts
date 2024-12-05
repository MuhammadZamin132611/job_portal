import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileJobPreferenceRoutingModule } from './profile-job-preference-routing.module';
import { AddJobPreferenceComponent } from './add-job-preference/add-job-preference.component';
import { EditJobPreferenceComponent } from './edit-job-preference/edit-job-preference.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';


@NgModule({
  declarations: [
    AddJobPreferenceComponent,
    EditJobPreferenceComponent
  ],
  imports: [
    CommonModule,
    ProfileJobPreferenceRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileJobPreferenceModule { }
