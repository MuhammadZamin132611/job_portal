/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OnboardingSharedService } from './onboarding-shared.service';

describe('Service: OnboardingShared', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnboardingSharedService],
    });
  });

  it('should create the service', inject(
    [OnboardingSharedService],
    (service: OnboardingSharedService) => {
      // Expect the service to be created successfully
      expect(service).toBeTruthy();
    }
  ));
});
