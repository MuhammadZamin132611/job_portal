import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEducationComponent } from './edit-education/edit-education.component';
import { AddEducationComponent } from './add-education/add-education.component';

const routes: Routes = [
  {path:'add-education', component:AddEducationComponent},
  {path:'edit-education', component:EditEducationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileEducationRoutingModule { }
