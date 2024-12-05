import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDetailsCardComponent } from './side-details-card.component';

describe('SideDetailsCardComponent', () => {
  let component: SideDetailsCardComponent;
  let fixture: ComponentFixture<SideDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
