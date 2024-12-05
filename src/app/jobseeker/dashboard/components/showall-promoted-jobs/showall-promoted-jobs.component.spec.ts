import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallPromotedJobsComponent } from './showall-promoted-jobs.component';

describe('ShowallPromotedJobsComponent', () => {
  let component: ShowallPromotedJobsComponent;
  let fixture: ComponentFixture<ShowallPromotedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallPromotedJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowallPromotedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
