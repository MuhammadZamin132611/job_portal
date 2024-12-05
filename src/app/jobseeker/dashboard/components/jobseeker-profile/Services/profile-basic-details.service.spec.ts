import { TestBed } from '@angular/core/testing';

import { ProfileBasicDetailsService } from './profile-basic-details.service';

describe('ProfileBasicDetailsService', () => {
  let service: ProfileBasicDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileBasicDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
