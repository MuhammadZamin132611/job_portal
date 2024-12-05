/*
Name: Sathvik
Date: 06-10-2023
Purpose: This component handles the rocket launch animation during the onboarding process.
Description: It displays a rocket launch animation and navigates to the congratulations page after a delay.
*/

import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-rocket-launch',
  templateUrl: './onboarding-rocket-launch.component.html',
  styleUrls: ['./onboarding-rocket-launch.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class OnboardingRocketLaunchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Delay the navigation to the congratulations page
    setTimeout(() => {
      this.rout();
    }, 2000);
  }
  // Navigate to the congratulations page
  rout() {
    this.router.navigateByUrl('/onBoarding/congratulation');
  }
}
