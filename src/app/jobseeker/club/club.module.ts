import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubComponent } from './club.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClubComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule,
    SharedModule
  ]
})
export class ClubModule { }
