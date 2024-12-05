// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddCertificateComponent } from './add-certificate.component';

// describe('AddCertificateComponent', () => {
//   let component: AddCertificateComponent;
//   let fixture: ComponentFixture<AddCertificateComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ AddCertificateComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AddCertificateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { AddCertificateComponent } from './add-certificate.component';

describe('AddCertificateComponent', () => {
  let component: AddCertificateComponent;

  beforeEach(() => {
    component = new AddCertificateComponent();
  });

  afterEach(() => {
    component.subscriptions.forEach(s => s.unsubscribe());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize online and offline event observables and set default values', () => {
    expect(component.onlineEvent).toBeDefined();
    expect(typeof component.onlineEvent.subscribe).toEqual('function');

    expect(component.offlineEvent).toBeDefined();
    expect(typeof component.offlineEvent.subscribe).toEqual('function');

    expect(component.subscriptions).toEqual([]);
    expect(component.connectionStatusMessage).toBeFalsy();
    expect(component.connectionStatus).toBeFalsy();
    expect(component.buttonName).toEqual('show');
    expect(component.show).toBeFalsy();
    expect(component.tick).toBeFalsy();
    expect(component.existUser).toBeFalsy();
  });

  describe('when online', () => {
    beforeEach(() => {
      spyOn(console, 'log');
      window.dispatchEvent(new Event('online'));
    });

    it('should set the connection status message and status', () => {
      expect(component.connectionStatusMessage).toEqual('connected');
      expect(component.connectionStatus).toEqual('online');
    });

    it('should log "Online..." to the console', () => {
      expect(console.log).toHaveBeenCalledWith('Online...');
    });
  });

  describe('when offline', () => {
    beforeEach(() => {
      spyOn(console, 'log');
      window.dispatchEvent(new Event('offline'));
    });

    it('should set the connection status message and status', () => {
      expect(component.connectionStatusMessage).toEqual('No internet connection! ');
      expect(component.connectionStatus).toEqual('offline');
    });

    it('should log "Offline..." to the console', () => {
      expect(console.log).toHaveBeenCalledWith('Offline...');
    });
  });
});
