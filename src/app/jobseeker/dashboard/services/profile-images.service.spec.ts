import { TestBed } from '@angular/core/testing';

import { ProfileImagesService } from './profile-images.service';

describe('ProfileImagesService', () => {
  let service: ProfileImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
