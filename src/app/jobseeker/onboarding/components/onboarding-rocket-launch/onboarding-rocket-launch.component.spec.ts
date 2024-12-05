import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingRocketLaunchComponent } from './onboarding-rocket-launch.component';

describe('OnboardingRocketLaunchComponent', () => {
  let component: OnboardingRocketLaunchComponent;
  let fixture: ComponentFixture<OnboardingRocketLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingRocketLaunchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingRocketLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
