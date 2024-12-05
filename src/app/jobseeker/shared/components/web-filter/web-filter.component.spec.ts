import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFilterComponent } from './web-filter.component';

describe('WebFilterComponent', () => {
  let component: WebFilterComponent;
  let fixture: ComponentFixture<WebFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
