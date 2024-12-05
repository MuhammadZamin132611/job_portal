import { TestBed } from '@angular/core/testing';

import { EditJobPreferenceService } from './edit-job-preference.service';

describe('EditJobPreferenceService', () => {
  let service: EditJobPreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditJobPreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
