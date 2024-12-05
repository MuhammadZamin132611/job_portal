// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ HomeComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { HomeComponent } from './home.component';
import { of } from 'rxjs';
// import { NotificationsService } from './notifications.service';
// import { HomeService } from './home.service';
// import { LoginEmailService } from './login-email.service';
// import { ExampleService } from './example.service';
import { NotificationsService } from '../../services/notifications.service';
import { HomeService } from '../../services/home.service';
import { LoginEmailService } from 'src/app/jobseeker/authentication/services/login-email.service';
import { ExampleService } from '../../services/example.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let pushNotificationSpy: jasmine.SpyObj<NotificationsService>;
  let apiSpy: jasmine.SpyObj<HomeService>;
  let loginSpy: jasmine.SpyObj<LoginEmailService>;
  let exampleSpy: jasmine.SpyObj<ExampleService>;

  beforeEach(() => {
    let spyPush = jasmine.createSpyObj('NotificationsService', ['postToken']);
    let spyApi = jasmine.createSpyObj('HomeService', ['getRecommendedJobs']);
    let spyLogin = jasmine.createSpyObj('LoginEmailService', ['getExistUser']);
    let spyExample = jasmine.createSpyObj('ExampleService', ['apiJcProfile']);
    component = new HomeComponent(spyPush, spyApi, spyLogin, spyExample);
    pushNotificationSpy = spyPush;
    apiSpy = spyApi;
    loginSpy = spyLogin;
    exampleSpy = spyExample;
  });

  // afterEach(() => {
  //   pushNotificationSpy = null;
  //   apiSpy = null;
  //   loginSpy = null;
  //   exampleSpy = null;
  //   component = null;
  // });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllJobs and api.getRecommendedJobs', () => {
    let expectedData = [{ id: 1, title: 'job 1' }];
    apiSpy.getRecommendedJobs.and.returnValue(of(expectedData));
    component.getAllJobs();
    expect(apiSpy.getRecommendedJobs.calls.count()).toBe(1);
    expect(component.jobData).toEqual(expectedData);
  });

  it('should call gettingData and example.apiJcProfile', () => {
    let expectedData = { name: 'example name' };
    exampleSpy.apiJcProfile.and.returnValue(of(expectedData));
    component.gettingData();
    expect(exampleSpy.apiJcProfile.calls.count()).toBe(1);
    expect(component.Data).toEqual(expectedData);
  });

  it('should call posttoken and pushNotification.postToken', () => {
    let expectedData = { message: 'success' };
    pushNotificationSpy.postToken.and.returnValue(of(expectedData));
    component.posttoken();
    expect(pushNotificationSpy.postToken.calls.count()).toBe(1);
  });

  it('should call setId and set profileID in sessionStorage', () => {
    let expectedId = 123;
    component.setId(expectedId);
    expect(sessionStorage.getItem('profileID')).toBe(expectedId.toString());
    expect(sessionStorage.getItem('JobId')).toBe(expectedId.toString());
  });

  it('should call getExistUser with email or sms', () => {
    let expectedEmail = 'test@test.com';
    let expectedProfileID = 123;
    loginSpy.getExistUser.and.returnValue(of(expectedProfileID));
    sessionStorage.setItem('Email', expectedEmail);
    component.getId();
    expect(loginSpy.getExistUser.calls.count()).toBe(1);
    expect(loginSpy.getExistUser.calls.argsFor(0)).toEqual([expectedEmail]);
    expect(sessionStorage.getItem('profileID')).toBe(expectedProfileID.toString());
  });

  it('should set connectionStatus to offline when window is offline', () => {
    let offlineEvent = new Event('offline');
    // component.offlineEvent.next(offlineEvent);
    expect(component.connectionStatusMessage).toBe('No internet connection! ');
    expect(component.connectionStatus).toBe('offline');
  });

  it('should set connectionStatus to online when window is online', () => {
    let onlineEvent = new Event('online');
    // component.onlineEvent.next(onlineEvent);
    expect(component.connectionStatusMessage).toBe('connected');
    expect(component.connectionStatus).toBe('online');
  });

});
