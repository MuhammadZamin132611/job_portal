import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAchievementsRoutingModule } from './profile-achievements-routing.module';
import { ProfileAchievementsComponent } from './profile-achievements.component';
import { AddAchievementComponent } from './add-achievement/add-achievement.component';
import { ShowallAchievementsComponent } from './showall-achievements/showall-achievements.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievement.component';
import { SharedModule } from 'src/app/jobseeker/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // ProfileAchievementsComponent
  
    AddAchievementComponent,
    ShowallAchievementsComponent,
    EditAchievementComponent
  ],
  imports: [
    CommonModule,
    ProfileAchievementsRoutingModule,
    SharedModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileAchievementsModule { }
