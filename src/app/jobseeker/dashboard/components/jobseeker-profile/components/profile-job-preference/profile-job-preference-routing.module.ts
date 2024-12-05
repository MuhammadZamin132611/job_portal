import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditJobPreferenceComponent } from './edit-job-preference/edit-job-preference.component';
import { AddJobPreferenceComponent } from './add-job-preference/add-job-preference.component';

const routes: Routes = [
  {path:'add-job-prefrence', component:AddJobPreferenceComponent},
  {path:'edit-job-prefrence', component:EditJobPreferenceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileJobPreferenceRoutingModule { }
