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







import { TestBed } from '@angular/core/testing';
import { AppliedJobsComponent } from './applied-jobs.component';
import { AppliedJobsService } from '../../services/applied-jobs.service';
// import { AppliedJobsService } from './applied-jobs.service';


describe('AppliedJobsComponent', () => {
  let component: AppliedJobsComponent;
  let service: AppliedJobsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AppliedJobsService ],
      declarations: [ AppliedJobsComponent ]
    });
    component = TestBed.createComponent(AppliedJobsComponent).componentInstance;
    service = TestBed.get(AppliedJobsService);
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should set jobSeekerDetailsId on initialization', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('sampleID');
    component.ngOnInit();
    expect(component.jobSeekerDetailsId).toEqual('sampleID');
  });


  it('should load applied jobs from service on initialization', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('sampleID');
    const testAppliedJobs = [{id: 1, title: 'Test Job 1'}, {id: 2, title: 'Test Job 2'}];
    
    // });spyOn(service, 'getAppliedJobs').and.callFake(()=>{
    //   return (testAppliedJobs);
    component.ngOnInit();
    expect(service.getAppliedJobs).toHaveBeenCalledWith('sampleID');
    expect(component.storeAppliedJobs).toEqual(testAppliedJobs);
  });


  it('should toggle showFilters on showFilter call', () => {
    component.showFilters = false;
    component.showFilter();
    expect(component.showFilters).toBeTruthy();
    component.showFilter();
    expect(component.showFilters).toBeFalsy();
  });


});

