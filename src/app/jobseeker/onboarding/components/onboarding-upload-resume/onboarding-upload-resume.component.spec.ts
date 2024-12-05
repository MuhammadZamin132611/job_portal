import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingUploadResumeComponent } from './onboarding-upload-resume.component';

describe('OnboardingUploadResumeComponent', () => {
  let component: OnboardingUploadResumeComponent;
  let fixture: ComponentFixture<OnboardingUploadResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingUploadResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingUploadResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
