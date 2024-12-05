import { TestBed } from '@angular/core/testing';

import { AddJobPreferenceService } from './add-job-preference.service';

describe('AddJobPreferenceService', () => {
  let service: AddJobPreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddJobPreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
