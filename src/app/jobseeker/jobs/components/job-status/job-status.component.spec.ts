// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { JobStatusComponent } from './job-status.component';

// describe('JobStatusComponent', () => {
//   let component: JobStatusComponent;
//   let fixture: ComponentFixture<JobStatusComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ JobStatusComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(JobStatusComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });






import { TestBed, ComponentFixture } from '@angular/core/testing';
import { JobStatusComponent } from './job-status.component';
import { of } from 'rxjs';

describe('JobStatusComponent', () => {
  let component: JobStatusComponent;
  let fixture: ComponentFixture<JobStatusComponent>;
  let onlineEventSpy: jasmine.Spy;
  let offlineEventSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobStatusComponent);
    component = fixture.componentInstance;
    onlineEventSpy = spyOn<any>(window, 'fromEvent').and.returnValue(of(new Event('online')));
    offlineEventSpy = spyOn<any>(window, 'fromEvent').and.returnValue(of(new Event('offline')));
    fixture.detectChanges();
  });

  afterEach(() => {
    component.subscriptions.forEach((s) => s.unsubscribe());
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial values of the component', () => {
    expect(component.subscriptions.length).toBe(2); // online and offline events subscriptions
    expect(component.connectionStatusMessage).toBeUndefined();
    expect(component.connectionStatus).toBeUndefined();
    expect(component.status).toBeUndefined();
    expect(component.buttonName).toEqual('show');
    expect(component.show).toBeFalse();
    expect(component.tick).toBeFalse();
    expect(component.existUser).toEqual('');
  });

  it('should handle online event', () => {
    onlineEventSpy.and.returnValue(of(new Event('online')));
    window.dispatchEvent(new Event('online'));
    expect(component.connectionStatusMessage).toEqual('connected');
    expect(component.connectionStatus).toEqual('online');
    expect(component.status).toBeUndefined();
  });

  it('should handle offline event', () => {
    offlineEventSpy.and.returnValue(of(new Event('offline')));
    window.dispatchEvent(new Event('offline'));
    expect(component.connectionStatusMessage).toEqual('No internet connection! ');
    expect(component.connectionStatus).toEqual('offline');
    expect(component.status).toBeUndefined();
  });    
});
