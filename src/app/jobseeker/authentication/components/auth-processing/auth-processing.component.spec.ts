import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProcessingComponent } from './auth-processing.component';

describe('AuthProcessingComponent', () => {
  let component: AuthProcessingComponent;
  let fixture: ComponentFixture<AuthProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
