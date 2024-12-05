import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileExperienceRoutingModule } from './profile-experience-routing.module';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { ShowAllExperienceComponent } from './show-all-experience/show-all-experience.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AddExperienceComponent,
    EditExperienceComponent,
    ShowAllExperienceComponent
  ],
  imports: [
    CommonModule,
    ProfileExperienceRoutingModule,
    FormsModule,
    SharedModule,
    IonicModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class ProfileExperienceModule { }
