import { TestBed } from '@angular/core/testing';

import { AddAchievementService } from './add-achievement.service';

describe('AddAchievementService', () => {
  let service: AddAchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAchievementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
