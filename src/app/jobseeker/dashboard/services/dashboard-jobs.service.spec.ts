import { TestBed } from '@angular/core/testing';

import { DashboardJobsService } from './dashboard-jobs.service';

describe('DashboardJobsService', () => {
  let service: DashboardJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
