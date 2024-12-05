import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOtpMobileComponent } from './login-otp-mobile.component';

describe('LoginOtpMobileComponent', () => {
  let component: LoginOtpMobileComponent;
  let fixture: ComponentFixture<LoginOtpMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginOtpMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOtpMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
