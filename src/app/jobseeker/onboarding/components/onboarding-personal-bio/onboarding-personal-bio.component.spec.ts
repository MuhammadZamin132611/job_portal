import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingPersonalBioComponent } from './onboarding-personal-bio.component';

describe('OnboardingPersonalBioComponent', () => {
  let component: OnboardingPersonalBioComponent;
  let fixture: ComponentFixture<OnboardingPersonalBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingPersonalBioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingPersonalBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
