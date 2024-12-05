import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceResumeBuilderRoutingModule } from './service-resume-builder-routing.module';
import { ServiceResumeBuilderComponent } from './service-resume-builder.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { ResumeBuilder1Component } from './resume-builder1/resume-builder1.component';
import { ResumeBuilder2Component } from './resume-builder2/resume-builder2.component';


@NgModule({
  declarations: [
    ServiceResumeBuilderComponent,
    ResumeBuilder1Component,
    ResumeBuilder2Component
  ],
  imports: [
    CommonModule,
    ServiceResumeBuilderRoutingModule,
    SharedModule
  ]
})
export class ServiceResumeBuilderModule { }
