import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOtpEmailComponent } from './login-otp-email.component';

describe('LoginOtpEmailComponent', () => {
  let component: LoginOtpEmailComponent;
  let fixture: ComponentFixture<LoginOtpEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginOtpEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOtpEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
