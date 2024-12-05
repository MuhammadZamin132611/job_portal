import { TestBed } from '@angular/core/testing';

import { EditAchievementService } from './edit-achievement.service';

describe('EditAchievementService', () => {
  let service: EditAchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAchievementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
