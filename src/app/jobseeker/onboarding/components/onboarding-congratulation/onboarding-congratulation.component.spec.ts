import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingCongratulationComponent } from './onboarding-congratulation.component';

describe('OnboardingCongratulationComponent', () => {
  let component: OnboardingCongratulationComponent;
  let fixture: ComponentFixture<OnboardingCongratulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingCongratulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingCongratulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
