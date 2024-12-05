import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileJobPreferenceComponent } from './profile-job-preference.component';

describe('ProfileJobPreferenceComponent', () => {
  let component: ProfileJobPreferenceComponent;
  let fixture: ComponentFixture<ProfileJobPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileJobPreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileJobPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
