// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ClubComponent } from './club.component';

// describe('ClubComponent', () => {
//   let component: ClubComponent;
//   let fixture: ComponentFixture<ClubComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ClubComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ClubComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubComponent } from './club.component';

describe('ClubComponent', () => {
  let component: ClubComponent;
  let fixture: ComponentFixture<ClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title equal to "Club Page"', () => {
    const title = fixture.nativeElement.querySelector('h1').textContent;
    expect(title).toEqual('Club Page');
  });

  it('should have at least one button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should toggle a boolean variable when clicking a button', () => {
    const button = fixture.nativeElement.querySelector('button');
    const originalValue = component.show;
    button.click();
    fixture.detectChanges();
    expect(component.show).toEqual(!originalValue);
  });
});
