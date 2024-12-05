import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingJobsProfileComponent } from './matching-jobs-profile.component';

describe('MatchingJobsProfileComponent', () => {
  let component: MatchingJobsProfileComponent;
  let fixture: ComponentFixture<MatchingJobsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchingJobsProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingJobsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
