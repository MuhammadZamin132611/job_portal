import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAchievementComponent } from './add-achievement/add-achievement.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievement.component';
import { ShowallAchievementsComponent } from './showall-achievements/showall-achievements.component';

const routes: Routes = [
  {path:'add-achievement', component:AddAchievementComponent},
  {path:'edit-achievement', component:EditAchievementComponent},
  {path:'showall-achievement', component:ShowallAchievementsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileAchievementsRoutingModule { }
