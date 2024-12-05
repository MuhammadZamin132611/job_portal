import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactemailComponent } from './contactemail.component';

describe('ContactemailComponent', () => {
  let component: ContactemailComponent;
  let fixture: ComponentFixture<ContactemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactemailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
