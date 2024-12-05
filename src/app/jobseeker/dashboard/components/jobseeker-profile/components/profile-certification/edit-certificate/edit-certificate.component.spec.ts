// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { EditCertificateComponent } from './edit-certificate.component';

// describe('EditCertificateComponent', () => {
//   let component: EditCertificateComponent;
//   let fixture: ComponentFixture<EditCertificateComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ EditCertificateComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(EditCertificateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { EditCertificateComponent } from './edit-certificate.component';

describe('EditCertificateComponent', () => {
  let component: EditCertificateComponent;

  beforeEach(() => {
    component = new EditCertificateComponent();
  });

  afterEach(() => {
    component.subscriptions.forEach(subscription => subscription.unsubscribe()); // Unsubscribe all subscriptions to avoid memory leaks
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set connection status message to "connected" when online', () => {
    window.dispatchEvent(new Event('online')); // Dispatch the online event

    expect(component.connectionStatusMessage).toBe('connected');
    expect(component.connectionStatus).toBe('online');
  });

  it('should set connection status message to "No internet connection!" when offline', () => {
    window.dispatchEvent(new Event('offline')); // Dispatch the offline event

    expect(component.connectionStatusMessage).toBe('No internet connection!');
    expect(component.connectionStatus).toBe('offline');
  });

  it('should show edit page when editcertificate() is called', () => {
    component.editcertificate();

    expect(component.showeditpage).toBe(true);
  });

  it('should hide edit page when save() is called', () => {
    component.showeditpage = true;

    component.save();

    expect(component.showeditpage).toBe(false);
  });
});
