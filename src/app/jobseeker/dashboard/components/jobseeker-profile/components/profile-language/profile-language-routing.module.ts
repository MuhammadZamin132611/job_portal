import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditLanguageComponent } from './edit-language/edit-language.component';

const routes: Routes = [
  {path: 'add-edit-language', component:EditLanguageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileLanguageRoutingModule { }
