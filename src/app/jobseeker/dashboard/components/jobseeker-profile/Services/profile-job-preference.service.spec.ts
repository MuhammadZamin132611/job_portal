import { TestBed } from '@angular/core/testing';

import { ProfileJobPreferenceService } from './profile-job-preference.service';

describe('ProfileJobPreferenceService', () => {
  let service: ProfileJobPreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileJobPreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
