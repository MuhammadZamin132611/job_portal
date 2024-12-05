import { TestBed } from '@angular/core/testing';

// Import the service being tested
import { OnboardingSkillEducationService } from './onboarding-skill-education.service';

describe('OnboardingSkillEducationService', () => {
  let service: OnboardingSkillEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Create an instance of the service
    service = TestBed.inject(OnboardingSkillEducationService);
  });

  it('should be created', () => {
    // Expect the service to be created successfully
    expect(service).toBeTruthy();
  });
});
