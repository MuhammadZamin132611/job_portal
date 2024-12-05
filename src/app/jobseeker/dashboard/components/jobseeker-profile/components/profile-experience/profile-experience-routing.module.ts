import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { ShowAllExperienceComponent } from './show-all-experience/show-all-experience.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';

const routes: Routes = [
  {path:'add-profile-workExperience', component:AddExperienceComponent},
  {path:'edit-profile-workExperience', component:EditExperienceComponent},
  {path:'show-profile-workExperience', component:ShowAllExperienceComponent},
  // {path:'update-profile-workExperience', component:ShowAllExperienceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileExperienceRoutingModule { }
