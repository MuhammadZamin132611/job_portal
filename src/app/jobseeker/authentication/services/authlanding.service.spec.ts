import { TestBed } from '@angular/core/testing';

import { AuthlandingService } from './authlanding.service';

describe('AuthlandingService', () => {
  let service: AuthlandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthlandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
