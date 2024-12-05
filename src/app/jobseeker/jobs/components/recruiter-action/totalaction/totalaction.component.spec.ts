import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalactionComponent } from './Totalaction.Component';

describe('TotalactionComponent', () => {
  let component: TotalactionComponent;
  let fixture: ComponentFixture<TotalactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
