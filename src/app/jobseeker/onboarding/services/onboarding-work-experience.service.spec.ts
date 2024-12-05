import { TestBed } from '@angular/core/testing';

import { OnboardingWorkExperienceService } from './onboarding-work-experience.service';

describe('OnboardingWorkExperienceService', () => {
  let service: OnboardingWorkExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnboardingWorkExperienceService]
    });
  });

  it('should be created', () => {
    // Ensure that the service is created successfully
    expect(service).toBeTruthy();
  });
});
