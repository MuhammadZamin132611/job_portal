import { TestBed } from '@angular/core/testing';

import { OnboardingRepositoryService } from './onboarding-repository.service';

describe('OnboardingRepositoryService', () => {
  let service: OnboardingRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
