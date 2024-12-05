import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { ShowallProjectsComponent } from './showall-projects/showall-projects.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';

const routes: Routes = [
  {path:'add-project', component:AddProjectsComponent},
  {path:'showall-project', component:ShowallProjectsComponent},
  {path:'edit-project', component:EditProjectsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileProjectRoutingModule { }
