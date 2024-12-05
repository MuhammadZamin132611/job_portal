import { TestBed } from '@angular/core/testing';

import { SavedJobsService } from './jobs';

describe('SavedJobsService', () => {
  let service: SavedJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
