// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DashboardJobsComponent } from './dashboard-jobs.component';

// describe('DashboardJobsComponent', () => {
//   let component: DashboardJobsComponent;
//   let fixture: ComponentFixture<DashboardJobsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ DashboardJobsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(DashboardJobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardJobsComponent } from './dashboard-jobs.component';
import { DashboardJobsService } from '../../services/dashboard-jobs.service';

describe('DashboardJobsComponent', () => {
  let component: DashboardJobsComponent;
  let fixture: ComponentFixture<DashboardJobsComponent>;
  let dashboardJobsService: DashboardJobsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardJobsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardJobsComponent);
    component = fixture.componentInstance;
    dashboardJobsService = TestBed.inject(DashboardJobsService);
    spyOn(window, 'Event').and.returnValue;
  }); 

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the count of saved jobs and set the SavedJobsNumber property', () => {
    spyOn(dashboardJobsService, 'getNumberOfSavedJobs').and.returnValue(of(3));
    component.getCountOfSavedJobs();
    expect(component.SavedJobsNumber).toBe(3);
  });

  it('should get the count of applied jobs and set the AppliedNumber property', () => {
    spyOn(dashboardJobsService, 'getNumberOfAppliedJobs').and.returnValue(of(2));
    component.getCountOfAppliedJobs();
    expect(component.AppliedNumber).toBe(2);
  });

  it('should get the count of shortlisted jobs and set the ShortlistedNumber property', () => {
    spyOn(dashboardJobsService, 'getNumberOfShortlistedJobs').and.returnValue(of(1));
    component.getCountOfShortlistedJobs();
    expect(component.ShortlistedNumber).toBe(1);
  });

  it('should get the count of recommended jobs and set the RecommendedNumber property', () => {
    spyOn(dashboardJobsService, 'getNumberOfRecommendedJobs').and.returnValue(of(4));
    component.getCountOfRecommendedJobs();
    expect(component.RecommendedNumber).toBe(4);
  });

  it('should get the list of applied jobs and set the Appliedjobs and Applied properties', () => {
    spyOn(dashboardJobsService, 'getAppliedJobs').and.returnValue(
      of([{ id: 1, title: 'Software Engineer' }, { id: 2, title: 'Data Analyst' }])
    );
    component.getAppliedJobs();
    expect(component.Appliedjobs).toEqual([{ id: 1, title: 'Software Engineer' }, { id: 2, title: 'Data Analyst' }]);
    expect(component.Applied).toEqual([{ id: 1, title: 'Software Engineer' }, { id: 2, title: 'Data Analyst' }]);
  });

  it('should set the jobId property and navigate to the application-status page', () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(component.router, 'navigate');
    component.setId(1);
    expect(component.jobId).toBe(1);
    expect(sessionStorage.setItem);
    expect(component.router.navigate).toHaveBeenCalledWith(['application-status']);
  });
});

