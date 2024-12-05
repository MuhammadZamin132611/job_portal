import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterActionComponent } from './recruiter-action.component';

describe('RecruiterActionComponent', () => {
  let component: RecruiterActionComponent;
  let fixture: ComponentFixture<RecruiterActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
