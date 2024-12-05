import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileBasicDetailsRoutingModule } from './profile-basic-details-routing.module';
import { EditBasicDetailsComponent } from './edit-basic-details/edit-basic-details.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditBasicDetailsComponent
  ],
  imports: [
    CommonModule,
    ProfileBasicDetailsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
  ]
})
export class ProfileBasicDetailsModule { }
