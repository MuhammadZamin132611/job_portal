import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyviewedComponent } from './companyviewed.component';

describe('CompanyviewedComponent', () => {
  let component: CompanyviewedComponent;
  let fixture: ComponentFixture<CompanyviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
