import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyTermCookiesComponent } from './privacy-term-cookies.component';

describe('PrivacyTermCookiesComponent', () => {
  let component: PrivacyTermCookiesComponent;
  let fixture: ComponentFixture<PrivacyTermCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyTermCookiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyTermCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
