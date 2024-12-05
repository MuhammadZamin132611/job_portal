import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAboutMeRoutingModule } from './profile-about-me-routing.module';
import { EditAboutMeComponent } from './edit-about-me/edit-about-me.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';

@NgModule({
  declarations: [
    EditAboutMeComponent
  ],
  imports: [
    CommonModule,
    ProfileAboutMeRoutingModule,
    FormsModule,
    SharedModule,

  ],

})
export class ProfileAboutMeModule { }
