// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { JobProfileComponent } from './job-profile.component';

// describe('JobProfileComponent', () => {
//   let component: JobProfileComponent;
//   let fixture: ComponentFixture<JobProfileComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ JobProfileComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(JobProfileComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { DashboardJobsService } from '../../services/dashboard-jobs.service';
import { JobProfileComponent } from './job-profile.component';
// import { DashboardJobsService } from 'path/to/dashboard-jobs.service';
import { of } from 'rxjs';

describe('JobProfileComponent', () => {
  let component: JobProfileComponent;
  let mockDashboardJobsService: jasmine.SpyObj<DashboardJobsService>;

  beforeEach(() => {
    mockDashboardJobsService = jasmine.createSpyObj('DashboardJobsService', ['getJobdetails']);
    component = new JobProfileComponent(mockDashboardJobsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set online and offline events', () => {
    spyOn(window, 'Event');
    component.ngOnInit();
    expect(component.subscriptions.length).toEqual(2);
  });

  it('should call share', () => {
    spyOn(navigator, 'share');
    component.share();
    expect(navigator.share).toHaveBeenCalled();
  });

  it('should get job details', () => {
    const mockData = [{ id: 1, title: 'Job 1' }, { id: 2, title: 'Job 2' }];
    mockDashboardJobsService.getJobdetails.and.returnValue(of(mockData));
    spyOn(sessionStorage, 'getItem').and.returnValue('1');
    component.getJobsdetails();
    expect(mockDashboardJobsService.getJobdetails).toHaveBeenCalledWith('1');
    expect(component.jobdetails).toEqual(mockData);
  });
});
