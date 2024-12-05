import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileLanguageRoutingModule } from './profile-language-routing.module';
import { EditLanguageComponent } from './edit-language/edit-language.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    EditLanguageComponent
  ],
  imports: [
    CommonModule,
    ProfileLanguageRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProfileLanguageModule { }
