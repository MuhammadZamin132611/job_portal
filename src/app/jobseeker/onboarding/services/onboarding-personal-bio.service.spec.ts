import { TestBed } from '@angular/core/testing';

import { OnboardingPersonalBioService } from './onboarding-personal-bio.service';

describe('OnboardingPersonalBioService', () => {
  let service: OnboardingPersonalBioService;

  // Set up the testing environment before each test
  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Inject the OnboardingPersonalBioService for testing
    service = TestBed.inject(OnboardingPersonalBioService);
  });

  // Check if the service is created successfully
  it('should be created', () => {
    // Expect that the service instance is truthy, indicating it has been created
    expect(service).toBeTruthy();
  });
});
