import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobPreferenceComponent } from './add-job-preference.component';

describe('AddJobPreferenceComponent', () => {
  let component: AddJobPreferenceComponent;
  let fixture: ComponentFixture<AddJobPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobPreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
