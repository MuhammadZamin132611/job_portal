import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FMLearnComponent } from './fm-learn.component';

describe('FMLearnComponent', () => {
  let component: FMLearnComponent;
  let fixture: ComponentFixture<FMLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FMLearnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FMLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
