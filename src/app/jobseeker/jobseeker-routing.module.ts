import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticated, IsNotAuthenticated } from '../authentication.guard';

const routes: Routes = [
{path:'dashboard',
loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),canActivate: [IsAuthenticated] },
{path:'onBoarding',
loadChildren:()=>import('./onboarding/onboarding.module').then(m=>m.OnboardingModule),canActivate: [IsAuthenticated]},
{path:'',
loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule),},
{path:'jobs',
loadChildren:()=>import('./jobs/jobs.module').then(m=>m.JobsModule)},


{path:'shared',
loadChildren:()=>import('./shared/shared.module').then(m=>m.SharedModule)},

{path:'services',
loadChildren:()=>import('./services/services.module').then(m=>m.ServicesModule)},

{path:'gig',
loadChildren:()=>import('./gig/gig.module').then(m=>m.GigModule)},


{path:'club',
loadChildren:()=>import('./club/club.module').then(m=>m.ClubModule)},
{path:'settings',
loadChildren:()=>import('./settings/settings.module').then(m=>m.SettingsModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})  
export class JobseekerRoutingModule { }        
