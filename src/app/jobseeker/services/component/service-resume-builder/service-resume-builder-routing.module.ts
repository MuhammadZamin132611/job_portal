import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceResumeBuilderComponent } from './service-resume-builder.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ResumeBuilder1Component } from './resume-builder1/resume-builder1.component';
import { ResumeBuilder2Component } from './resume-builder2/resume-builder2.component';

const routes: Routes = [
  {path:'', component:ServiceResumeBuilderComponent},
  {path:'resume-template', component:ResumeBuilderComponent},
  {path:'resume-template1', component:ResumeBuilder1Component},
  {path:'resume-template2', component:ResumeBuilder2Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceResumeBuilderRoutingModule { }
