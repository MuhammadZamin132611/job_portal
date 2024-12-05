import { TestBed } from '@angular/core/testing';

import { EditEducationService } from './edit-education.service';

describe('EditEducationService', () => {
  let service: EditEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
