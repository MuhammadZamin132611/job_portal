import { TestBed } from '@angular/core/testing';

import { MatchingJobsService } from './matching-jobs.service';

describe('MatchingJobsService', () => {
  let service: MatchingJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchingJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
