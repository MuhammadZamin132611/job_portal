import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSkillEducationComponent } from './onboarding-skill-education.component';

describe('OnboardingSkillEducationComponent', () => {
  let component: OnboardingSkillEducationComponent;
  let fixture: ComponentFixture<OnboardingSkillEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingSkillEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingSkillEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
