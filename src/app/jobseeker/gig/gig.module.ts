import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GigRoutingModule } from './gig-routing.module';
import { GigComponent } from './gig.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GigComponent
  ],
  imports: [
    CommonModule,
    GigRoutingModule,
    SharedModule
  ]
})
export class GigModule { }
