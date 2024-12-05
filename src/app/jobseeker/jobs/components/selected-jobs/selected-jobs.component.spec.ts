// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SelectedJobsComponent } from './selected-jobs.component';

// describe('SelectedJobsComponent', () => {
//   let component: SelectedJobsComponent;
//   let fixture: ComponentFixture<SelectedJobsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SelectedJobsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(SelectedJobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });






import { SelectedJobsComponent } from './selected-jobs.component';

describe('SelectedJobsComponent', () => {
  let component: SelectedJobsComponent;

  beforeEach(() => {
    component = new SelectedJobsComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize showFilters to false', () => {
    expect(component.showFilters).toBeFalse();
  });
  

  it('should toggle showFilters when showFilter method is called', () => {
    expect(component.showFilters).toBeFalse();
    component.showFilter();
    expect(component.showFilters).toBeTrue();
    component.showFilter();
    expect(component.showFilters).toBeFalse();
  });
});
