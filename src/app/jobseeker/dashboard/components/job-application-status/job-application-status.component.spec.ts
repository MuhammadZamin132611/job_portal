// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { JobApplicationStatusComponent } from './job-application-status.component';

// describe('JobApplicationStatusComponent', () => {
//   let component: JobApplicationStatusComponent;
//   let fixture: ComponentFixture<JobApplicationStatusComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ JobApplicationStatusComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(JobApplicationStatusComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });





import { JobApplicationStatusComponent } from './job-application-status.component';

describe('JobApplicationStatusComponent', () => {
  let component: JobApplicationStatusComponent;

  beforeEach(() => {
    component = new JobApplicationStatusComponent();
  });

  afterEach(() => {
    component.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values setup', () => {
    expect(component.connectionStatusMessage).toEqual('');
    expect(component.connectionStatus).toEqual('');
    expect(component.status).toEqual('');
    expect(component.buttonName).toEqual('show');
    expect(component.show).toEqual(false);
    expect(component.tick).toEqual(false);
    expect(component.existUser).toEqual('');
  });

  it('should set status to `online` on online event', () => {
    spyOn(console, 'log');
    const event = new Event('online');
    component.subscriptions[0];
    expect(component.connectionStatusMessage).toEqual('connected');
    expect(component.connectionStatus).toEqual('online');
    expect(console.log).toHaveBeenCalledWith('Online...');
  });

  it('should set status to `offline` on offline event', () => {
    spyOn(console, 'log');
    const event = new Event('offline');
    component.subscriptions[1];
    expect(component.connectionStatusMessage).toEqual('No internet connection! ');
    expect(component.connectionStatus).toEqual('offline');
    expect(console.log).toHaveBeenCalledWith('Offline...');
  });

});
