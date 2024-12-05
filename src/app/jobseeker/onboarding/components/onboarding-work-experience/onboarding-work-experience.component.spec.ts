import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingWorkExperienceComponent } from './onboarding-work-experience.component';

describe('OnboardingWorkExperienceComponent', () => {
  let component: OnboardingWorkExperienceComponent;
  let fixture: ComponentFixture<OnboardingWorkExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingWorkExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
