import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllEducationComponent } from './show-all-education.component';

describe('ShowAllEducationComponent', () => {
  let component: ShowAllEducationComponent;
  let fixture: ComponentFixture<ShowAllEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
