import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallAchievementsComponent } from './showall-achievements.component';

describe('ShowallAchievementsComponent', () => {
  let component: ShowallAchievementsComponent;
  let fixture: ComponentFixture<ShowallAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallAchievementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowallAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
