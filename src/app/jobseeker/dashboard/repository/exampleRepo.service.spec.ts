import { TestBed } from '@angular/core/testing';

import { ExampleRepoService } from './exampleRepo.service';

describe('ExapleService', () => {
  let service: ExampleRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
