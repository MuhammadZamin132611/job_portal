// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SavedJobsComponent } from './saved-jobs.component';

// describe('SavedJobsComponent', () => {
//   let component: SavedJobsComponent;
//   let fixture: ComponentFixture<SavedJobsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SavedJobsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(SavedJobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { SavedJobsService } from 'src/app/jobseeker/jobs/services/saved-jobs.service';
import { SavedJobsComponent } from './saved-jobs.component';
import { of } from 'rxjs';

describe('SavedJobsComponent', () => {
  let component: SavedJobsComponent;
  let service: SavedJobsService;

  beforeEach(() => {
    const savedJobs = [{ jobTitle: 'Test Job 1' }, { jobTitle: 'Test Job 2' }];
    const savedJobsServiceSpy = jasmine.createSpyObj('SavedJobsService', {
      getSavedJobsCount: of(2),
      getSavedJobs: of(savedJobs)
    });
    component = new SavedJobsComponent(savedJobsServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the jobSeekerDetailsId to the value from sessionStorage', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('123');
    component.ngOnInit();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('profileID');
    expect(component.jobSeekerDetailsId).toBe('123');
  });

  it('should get the count of saved jobs from the service', () => {
    component.ngOnInit();
    expect(service.getSavedJobsCount).toHaveBeenCalledWith(component.jobSeekerDetailsId);
    expect(component.getCountOfSavedJobs).toBe(2);
  });

  it('should get all saved jobs from the service', () => {
    component.ngOnInit();
    expect(service.getSavedJobs).toHaveBeenCalledWith(component.jobSeekerDetailsId);
    expect(component.storeSavedJobs).toEqual([{ jobTitle: 'Test Job 1' }, { jobTitle: 'Test Job 2' }]);
  });

  it('should filter the saved jobs based on job title', () => {
    component.storeSavedJobs = [{ jobTitle: 'Test Job 1' }, { jobTitle: 'Test Job 2' }, { jobTitle: 'Not a Test Job' }];
    component.JobSearch({ target: { value: 'test' }});
    expect(component.Savedjob).toEqual([{ jobTitle: 'Test Job 1' }, { jobTitle: 'Test Job 2' }]);
    expect(component.storeSavedJobs).toEqual([{ jobTitle: 'Test Job 1' }, { jobTitle: 'Test Job 2' }]);
  });

  it('should return a style object based on the value of show', () => {
    component.show = true;
    expect(component.filterstyle()).toEqual({ 'rotate-180': true });
    component.show = false;
    expect(component.filterstyle()).toEqual({ 'rotate-180': false });
  });
});


