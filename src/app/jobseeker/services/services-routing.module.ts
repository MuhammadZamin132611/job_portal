import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {path:"", component:ServicesComponent}, 
  {path:'resumes',
loadChildren:()=>import('./component/service-resume-builder/service-resume-builder.module').then(m=>m.ServiceResumeBuilderModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
