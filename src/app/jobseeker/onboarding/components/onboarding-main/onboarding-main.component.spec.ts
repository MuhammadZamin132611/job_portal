import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingMainComponent } from './onboarding-main.component';

describe('OnboardingMainComponent', () => {
  let component: OnboardingMainComponent;
  let fixture: ComponentFixture<OnboardingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
