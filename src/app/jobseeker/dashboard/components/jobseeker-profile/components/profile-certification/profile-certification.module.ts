import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileCertificationRoutingModule } from './profile-certification-routing.module';
import { AddCertificateComponent } from './add-certificate/add-certificate.component';
import { EditCertificateComponent } from './edit-certificate/edit-certificate.component';
import { ShowAllCertificateComponent } from './show-all-certificate/show-all-certificate.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCertificateComponent,
    EditCertificateComponent,
    ShowAllCertificateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileCertificationRoutingModule,
    SharedModule,
    IonicModule.forRoot(),
  ]
})
export class ProfileCertificationModule { }
