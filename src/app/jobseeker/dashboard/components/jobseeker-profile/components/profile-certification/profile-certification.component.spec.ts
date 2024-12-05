// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProfileCertificationComponent } from './profile-certification.component';

// describe('ProfileCertificationComponent', () => {
//   let component: ProfileCertificationComponent;
//   let fixture: ComponentFixture<ProfileCertificationComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ProfileCertificationComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ProfileCertificationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ProfileCertificationComponent } from './profile-certification.component';

describe('ProfileCertificationComponent', () => {
    let component: ProfileCertificationComponent;

    beforeEach(() => {
        component = new ProfileCertificationComponent();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit should be defined', () => {
        expect(component.ngOnInit).toBeDefined();
    });
});
