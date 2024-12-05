import { TestBed } from '@angular/core/testing';

import { ProfileLanguageService } from './profile-language.service';

describe('ProfileLanguageService', () => {
  let service: ProfileLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
