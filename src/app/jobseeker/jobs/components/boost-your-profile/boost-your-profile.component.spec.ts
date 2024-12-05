import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostYourProfileComponent } from './boost-your-profile.component';

describe('BoostYourProfileComponent', () => {
  let component: BoostYourProfileComponent;
  let fixture: ComponentFixture<BoostYourProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoostYourProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoostYourProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
