import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingJobsComponent } from './matching-jobs.component';

describe('MatchingJobsComponent', () => {
  let component: MatchingJobsComponent;
  let fixture: ComponentFixture<MatchingJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchingJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
