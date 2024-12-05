import { TestBed } from '@angular/core/testing';

import { ResumeService } from './resume.service';

describe('ResumeService', () => {
  let service: ResumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeService);
  });

  // Test if the ResumeService is created successfully
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
