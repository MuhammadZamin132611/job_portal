import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallProjectsComponent } from './showall-projects.component';

describe('ShowallProjectsComponent', () => {
  let component: ShowallProjectsComponent;
  let fixture: ComponentFixture<ShowallProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowallProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
