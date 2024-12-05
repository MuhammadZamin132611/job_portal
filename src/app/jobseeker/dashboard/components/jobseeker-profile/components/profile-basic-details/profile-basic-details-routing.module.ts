import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBasicDetailsComponent } from './edit-basic-details/edit-basic-details.component';

const routes: Routes = [
  {path:'aboutMe', component:EditBasicDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileBasicDetailsRoutingModule { }
