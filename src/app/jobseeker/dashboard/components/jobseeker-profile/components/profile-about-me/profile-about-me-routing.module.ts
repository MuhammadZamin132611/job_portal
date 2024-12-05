import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAboutMeComponent } from './edit-about-me/edit-about-me.component';

const routes: Routes = [
  {path:'persionalBio', component:EditAboutMeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileAboutMeRoutingModule { }
