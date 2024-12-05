import { TestBed } from '@angular/core/testing';

import { ProfileEducationService } from './profile-education.service';

describe('ProfileEducationService', () => {
  let service: ProfileEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
