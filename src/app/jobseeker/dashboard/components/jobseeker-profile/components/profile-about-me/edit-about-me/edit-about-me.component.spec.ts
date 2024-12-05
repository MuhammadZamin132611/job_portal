// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { EditAboutMeComponent } from './edit-about-me.component';

// describe('EditAboutMeComponent', () => {
//   let component: EditAboutMeComponent;
//   let fixture: ComponentFixture<EditAboutMeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ EditAboutMeComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(EditAboutMeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAboutMeComponent } from './edit-about-me.component';

describe('EditAboutMeComponent', () => {
  let component: EditAboutMeComponent;
  let fixture: ComponentFixture<EditAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAboutMeComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBeDefined();
  });

  it('should set the title to "Edit About Me"', () => {
    expect(component.title).toBe('Edit About Me');
  });
});
