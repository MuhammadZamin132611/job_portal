import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactwhatsappComponent } from './contactwhatsapp.component';

describe('ContactwhatsappComponent', () => {
  let component: ContactwhatsappComponent;
  let fixture: ComponentFixture<ContactwhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactwhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactwhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
