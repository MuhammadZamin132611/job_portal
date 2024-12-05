import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOtherSkillsComponent } from './add-other-skills/add-other-skills.component';
import { EditOtherSkillsComponent } from './edit-other-skills/edit-other-skills.component';
import { AddPrimarySkillsComponent } from './add-primary-skills/add-primary-skills.component';
import { EditPrimarySkillsComponent } from './edit-primary-skills/edit-primary-skills.component';

const routes: Routes = [
  {path:'add-primary-skills', component:AddPrimarySkillsComponent},
  {path:'edit-primary-skills', component:EditPrimarySkillsComponent},
  {path:'add-other-skills', component:AddOtherSkillsComponent},
  {path:'edit-other-skills', component:EditOtherSkillsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSkillsRoutingModule { }
