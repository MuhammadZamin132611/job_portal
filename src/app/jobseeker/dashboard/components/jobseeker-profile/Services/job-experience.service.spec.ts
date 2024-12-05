import { TestBed } from '@angular/core/testing';

import { JobExperienceService } from './job-experience.service';

describe('JobExperienceService', () => {
  let service: JobExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
