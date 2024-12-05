// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { OfferedJobsComponent } from './offered-jobs.component';

// describe('OfferedJobsComponent', () => {
//   let component: OfferedJobsComponent;
//   let fixture: ComponentFixture<OfferedJobsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ OfferedJobsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(OfferedJobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });








import { OfferedJobsComponent } from './offered-jobs.component';

describe('OfferedJobsComponent', () => {
  let component: OfferedJobsComponent;

  beforeEach(() => {
    component = new OfferedJobsComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial value of showFilters as false', () => {
    expect(component.showFilters).toBe(false);
  });

  it('should toggle the value of showFilters', () => {
    component.showFilter();
    expect(component.showFilters).toBe(true);

    component.showFilter();
    expect(component.showFilters).toBe(false);
  });
});

