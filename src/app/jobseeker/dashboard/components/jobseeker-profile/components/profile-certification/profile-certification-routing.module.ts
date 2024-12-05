import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCertificateComponent } from './add-certificate/add-certificate.component';
import { EditCertificateComponent } from './edit-certificate/edit-certificate.component';

const routes: Routes = [
  {path:'add-certificate',component:AddCertificateComponent},
  {path:'edit-certificate',component:EditCertificateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCertificationRoutingModule { }
