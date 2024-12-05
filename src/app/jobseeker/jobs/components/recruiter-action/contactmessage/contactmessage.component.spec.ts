import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactmessageComponent } from './contactmessage.component';

describe('ContactmessageComponent', () => {
  let component: ContactmessageComponent;
  let fixture: ComponentFixture<ContactmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactmessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
