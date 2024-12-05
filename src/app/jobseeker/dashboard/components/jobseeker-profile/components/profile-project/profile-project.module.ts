import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileProjectRoutingModule } from './profile-project-routing.module';
import { ProfileProjectComponent } from './profile-project.component';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowallProjectsComponent } from './showall-projects/showall-projects.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';


@NgModule({
  declarations: [
    // ProfileProjectComponent
  
    AddProjectsComponent,
    ShowallProjectsComponent,
    EditProjectsComponent
  ],
  imports: [
    CommonModule,
    ProfileProjectRoutingModule,
    SharedModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ProfileProjectModule { }
