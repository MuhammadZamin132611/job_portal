// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ShowAllCertificateComponent } from './show-all-certificate.component';

// describe('ShowAllCertificateComponent', () => {
//   let component: ShowAllCertificateComponent;
//   let fixture: ComponentFixture<ShowAllCertificateComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ShowAllCertificateComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ShowAllCertificateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowAllCertificateComponent } from './show-all-certificate.component';

describe('ShowAllCertificateComponent', () => {
  let component: ShowAllCertificateComponent;
  let fixture: ComponentFixture<ShowAllCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
