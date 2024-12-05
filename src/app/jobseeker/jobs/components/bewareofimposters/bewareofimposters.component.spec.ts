import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewareofimpostersComponent } from './bewareofimposters.component';

describe('BewareofimpostersComponent', () => {
  let component: BewareofimpostersComponent;
  let fixture: ComponentFixture<BewareofimpostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BewareofimpostersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BewareofimpostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
