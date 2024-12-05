// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { EditBasicDetailsComponent } from './edit-basic-details.component';

// describe('EditBasicDetailsComponent', () => {
//   let component: EditBasicDetailsComponent;
//   let fixture: ComponentFixture<EditBasicDetailsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ EditBasicDetailsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(EditBasicDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { EditBasicDetailsComponent } from './edit-basic-details.component';

describe('EditBasicDetailsComponent', () => {
  let component: EditBasicDetailsComponent;

  beforeEach(() => {
    component = new EditBasicDetailsComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.ngOnInit).toBeDefined();
  });
});

