import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingLocationComponent } from './onboarding-location.component';

describe('OnboardingLocationComponent', () => {
  let component: OnboardingLocationComponent;
  let fixture: ComponentFixture<OnboardingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
