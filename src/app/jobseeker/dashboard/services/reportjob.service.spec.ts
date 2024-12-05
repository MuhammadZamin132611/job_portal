import { TestBed } from '@angular/core/testing';

import { ReportjobService } from './reportjob.service';

describe('ReportjobService', () => {
  let service: ReportjobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportjobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
