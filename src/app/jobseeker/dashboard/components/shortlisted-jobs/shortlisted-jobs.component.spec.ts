// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ShortlistedJobsComponent } from './shortlisted-jobs.component';

// describe('ShortlistedJobsComponent', () => {
//   let component: ShortlistedJobsComponent;
//   let fixture: ComponentFixture<ShortlistedJobsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ShortlistedJobsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ShortlistedJobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });






import { ShortlistedJobsComponent } from './shortlisted-jobs.component';

describe('ShortlistedJobsComponent', () => {
  let component: ShortlistedJobsComponent;

  beforeEach(() => {
    component = new ShortlistedJobsComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize showFilters to false', () => {
    expect(component.showFilters).toBe(false);
  });

  describe('showFilter', () => {
    it('should toggle showFilters', () => {
      component.showFilter();
      expect(component.showFilters).toBe(true);

      component.showFilter();
      expect(component.showFilters).toBe(false);
    });
  });
});
