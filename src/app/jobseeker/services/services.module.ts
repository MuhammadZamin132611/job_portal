import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { SharedModule } from '../shared/shared.module';
import { ResumeBuilderComponent } from './component/service-resume-builder/resume-builder/resume-builder.component';
import { FMLearnComponent } from './component/fm-learn/fm-learn.component';


@NgModule({
  declarations: [
    ServicesComponent,
    ResumeBuilderComponent,
    FMLearnComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule
  ]
})
export class ServicesModule { }
