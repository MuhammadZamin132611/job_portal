import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilder2Component } from './resume-builder2.component';

describe('ResumeBuilder2Component', () => {
  let component: ResumeBuilder2Component;
  let fixture: ComponentFixture<ResumeBuilder2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilder2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeBuilder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
