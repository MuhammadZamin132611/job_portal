import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllExperienceComponent } from './show-all-experience.component';

describe('ShowAllExperienceComponent', () => {
  let component: ShowAllExperienceComponent;
  let fixture: ComponentFixture<ShowAllExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
