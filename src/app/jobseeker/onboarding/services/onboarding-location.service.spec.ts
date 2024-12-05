//1. Imports - Angular Testing - Mandatory
import { TestBed } from '@angular/core/testing';

//2. Import - Service to be Tested - Mandatory
import { OnboardingLocationService } from './onboarding-location.service';

//3. Describe Block - Test Suite for OnboardingLocationService
describe('OnboardingLocationService', () => {
  let service: OnboardingLocationService;

  //4. beforeEach Block - Test Setup
  beforeEach(() => {
    // TestBed Configuration and Service Injection
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingLocationService);
  });

  //5. it Block - Testing the Service Creation
  it('should be created', () => {
    // Assertion: Check if the service has been successfully created
    expect(service).toBeTruthy();
  });
});
