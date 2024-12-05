import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherSkillsComponent } from './edit-other-skills.component';

describe('EditOtherSkillsComponent', () => {
  let component: EditOtherSkillsComponent;
  let fixture: ComponentFixture<EditOtherSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOtherSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOtherSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
