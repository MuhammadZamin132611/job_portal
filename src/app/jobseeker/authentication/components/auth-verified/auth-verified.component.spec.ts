import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthVerifiedComponent } from './auth-verified.component';

describe('AuthVerifiedComponent', () => {
  let component: AuthVerifiedComponent;
  let fixture: ComponentFixture<AuthVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthVerifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
