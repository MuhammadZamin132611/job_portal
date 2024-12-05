import { TestBed } from '@angular/core/testing';

import { ProfileEditLanguageService } from './profile-edit-language.service';

describe('ProfileEditLanguageService', () => {
  let service: ProfileEditLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileEditLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
