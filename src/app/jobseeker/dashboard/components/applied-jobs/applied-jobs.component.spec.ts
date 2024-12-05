// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AppliedJobsComponent } from './applied-jobs.component';

// describe('AppliedJobsComponent', () => {
//   let component: AppliedJobsComponent;
//   let fixture: ComponentFixture<AppliedJobsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ AppliedJobsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AppliedJobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });



import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppliedJobsComponent } from './applied-jobs.component';
import { AppliedJobsService } from '../../services/applied-jobs.service';
import { of } from 'rxjs';

describe('AppliedJobsComponent', () => {
  let component: AppliedJobsComponent;
  let fixture: ComponentFixture<AppliedJobsComponent>;
  let appliedJobsServiceSpy: jasmine.SpyObj<AppliedJobsService>;

  beforeEach(async () => {
    appliedJobsServiceSpy = jasmine.createSpyObj('AppliedJobsService', ['getAppliedJobs']);

    await TestBed.configureTestingModule({
      declarations: [AppliedJobsComponent],
      providers: [
        { provide: AppliedJobsService, useValue: appliedJobsServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedJobsComponent);
    component = fixture.componentInstance;

    appliedJobsServiceSpy.getAppliedJobs.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all applied jobs from service on ngOnInit', () => {
    component.ngOnInit();

    expect(appliedJobsServiceSpy.getAppliedJobs).toHaveBeenCalledWith(component.jobSeekerDetailsId);

    expect(component.storeAppliedJobs).toEqual([]);
  });

  it('should toggle showFilters property on showFilter method call', () => {
    expect(component.showFilters).toBeFalse();

    component.showFilter();

    expect(component.showFilters).toBeTrue();

    component.showFilter();

    expect(component.showFilters).toBeFalse();
  });
});

