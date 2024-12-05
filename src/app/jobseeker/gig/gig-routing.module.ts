import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GigComponent } from './gig.component';

const routes: Routes = [
  {path:"", component:GigComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GigRoutingModule { }
