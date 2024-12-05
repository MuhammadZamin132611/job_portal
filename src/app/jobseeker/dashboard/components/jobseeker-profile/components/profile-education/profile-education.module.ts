import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileEducationRoutingModule } from './profile-education-routing.module';
import { AddEducationComponent } from './add-education/add-education.component';
import { EditEducationComponent } from './edit-education/edit-education.component';
import { ShowAllEducationComponent } from './show-all-education/show-all-education.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AddEducationComponent,
    EditEducationComponent,
    ShowAllEducationComponent,
  ],
  imports: [
    CommonModule,
    ProfileEducationRoutingModule,
    FormsModule,
    SharedModule,
    IonicModule.forRoot(),
  ]
})
export class ProfileEducationModule { }
