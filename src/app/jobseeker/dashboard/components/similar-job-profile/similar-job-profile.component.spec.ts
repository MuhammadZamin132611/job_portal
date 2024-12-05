import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarJobProfileComponent } from './similar-job-profile.component';

describe('SimilarJobProfileComponent', () => {
  let component: SimilarJobProfileComponent;
  let fixture: ComponentFixture<SimilarJobProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarJobProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarJobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
