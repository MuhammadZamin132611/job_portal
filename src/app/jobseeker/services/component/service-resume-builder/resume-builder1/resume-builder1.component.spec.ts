import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilder1Component } from './resume-builder1.component';

describe('ResumeBuilder1Component', () => {
  let component: ResumeBuilder1Component;
  let fixture: ComponentFixture<ResumeBuilder1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilder1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeBuilder1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
