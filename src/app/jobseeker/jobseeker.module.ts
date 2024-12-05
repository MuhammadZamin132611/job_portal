import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobseekerRoutingModule } from './jobseeker-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        JobseekerRoutingModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule, IonicModule.forRoot(),
        SharedModule
    ]
})
export class JobseekerModule { }
