import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSkillsRoutingModule } from './profile-skills-routing.module';
import { AddPrimarySkillsComponent } from './add-primary-skills/add-primary-skills.component';
import { EditPrimarySkillsComponent } from './edit-primary-skills/edit-primary-skills.component';
import { EditOtherSkillsComponent } from './edit-other-skills/edit-other-skills.component';
import { AddOtherSkillsComponent } from './add-other-skills/add-other-skills.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddPrimarySkillsComponent,
    EditPrimarySkillsComponent,
    EditOtherSkillsComponent,
    AddOtherSkillsComponent
  ],
  imports: [
    CommonModule,
    ProfileSkillsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProfileSkillsModule { }
