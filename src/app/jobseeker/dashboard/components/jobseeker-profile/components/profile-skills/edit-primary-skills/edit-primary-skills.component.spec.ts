import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrimarySkillsComponent } from './edit-primary-skills.component';

describe('EditPrimarySkillsComponent', () => {
  let component: EditPrimarySkillsComponent;
  let fixture: ComponentFixture<EditPrimarySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPrimarySkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrimarySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
