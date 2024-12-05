import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrimarySkillsComponent } from './add-primary-skills.component';

describe('AddPrimarySkillsComponent', () => {
  let component: AddPrimarySkillsComponent;
  let fixture: ComponentFixture<AddPrimarySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrimarySkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrimarySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
