import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherSkillsComponent } from './add-other-skills.component';

describe('AddOtherSkillsComponent', () => {
  let component: AddOtherSkillsComponent;
  let fixture: ComponentFixture<AddOtherSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOtherSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOtherSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
