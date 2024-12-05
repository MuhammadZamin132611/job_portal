import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobQuestionariesComponent } from './job-questionaries.component';

describe('JobQuestionariesComponent', () => {
  let component: JobQuestionariesComponent;
  let fixture: ComponentFixture<JobQuestionariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobQuestionariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobQuestionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
