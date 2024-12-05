import { TestBed } from '@angular/core/testing';

import { RecruiterActionService } from './recruiter-action.service';

describe('RecruiterActionService', () => {
  let service: RecruiterActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
