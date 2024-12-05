import { TestBed } from '@angular/core/testing';

import { EditBasicDetailsService } from './edit-basic-details.service';

describe('EditBasicDetailsService', () => {
  let service: EditBasicDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBasicDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
