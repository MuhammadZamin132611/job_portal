// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProfileBasicDetailsComponent } from './profile-basic-details.component';

// describe('ProfileBasicDetailsComponent', () => {
//   let component: ProfileBasicDetailsComponent;
//   let fixture: ComponentFixture<ProfileBasicDetailsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ProfileBasicDetailsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ProfileBasicDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileBasicDetailsComponent } from './profile-basic-details.component';

describe('ProfileBasicDetailsComponent', () => {
  let component: ProfileBasicDetailsComponent;
  let fixture: ComponentFixture<ProfileBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBasicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize characterCount to 0', () => {
    expect(component.characterCount).toEqual(0);
  });

  it('should initialize length to 0', () => {
    expect(component.length).toEqual(0);
  });

  it('should initialize text to an empty string', () => {
    expect(component.text).toEqual('');
  });
});
