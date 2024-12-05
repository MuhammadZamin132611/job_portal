import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportforbewaresComponent } from './reportforbewares.component';

describe('ReportforbewaresComponent', () => {
  let component: ReportforbewaresComponent;
  let fixture: ComponentFixture<ReportforbewaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportforbewaresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportforbewaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
