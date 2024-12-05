import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavbarFilterComponent } from './side-navbar-filter.component';

describe('SideNavbarFilterComponent', () => {
  let component: SideNavbarFilterComponent;
  let fixture: ComponentFixture<SideNavbarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavbarFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavbarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
