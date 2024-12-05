import { TestBed } from '@angular/core/testing';

import { AddEducatiomService } from './add-education.service';

describe('AddEducatiomService', () => {
  let service: AddEducatiomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEducatiomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
