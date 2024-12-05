import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportJobsComponent } from './report-jobs.component';

describe('ReportJobsComponent', () => {
  let component: ReportJobsComponent;
  let fixture: ComponentFixture<ReportJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
