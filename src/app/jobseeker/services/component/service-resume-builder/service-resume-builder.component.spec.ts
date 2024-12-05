import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceResumeBuilderComponent } from './service-resume-builder.component';

describe('ServiceResumeBuilderComponent', () => {
  let component: ServiceResumeBuilderComponent;
  let fixture: ComponentFixture<ServiceResumeBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceResumeBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceResumeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
