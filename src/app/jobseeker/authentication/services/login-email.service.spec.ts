import { TestBed } from '@angular/core/testing';

import { LoginEmailService } from './login-email.service';

describe('LoginEmailService', () => {
  let service: LoginEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
