// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SideNavbarComponent } from './side-navbar.component';

// describe('SideNavbarComponent', () => {
//   let component: SideNavbarComponent;
//   let fixture: ComponentFixture<SideNavbarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SideNavbarComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(SideNavbarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });






import { ComponentFixture, TestBed, async } from '@angular/core/testing';
    import { SideNavbarComponent } from './side-navbar.component';
    // import { LogoutService } from '../../services/logout.service';
    import { ExampleService } from '../../services/example.service';
    import { of } from 'rxjs';
import { LogoutService } from 'src/app/jobseeker/authentication/services/logout.service';
    
    describe('SideNavbarComponent', () => {
      let component: SideNavbarComponent;
      let fixture: ComponentFixture<SideNavbarComponent>;
      let logoutService: LogoutService;
      let exampleService: ExampleService;
    
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [SideNavbarComponent],
          providers: [
            { provide: LogoutService, useValue: { signOut: jasmine.createSpy('signOut') } },
            { provide: ExampleService, useValue: { apiJcProfile: jasmine.createSpy('apiJcProfile').and.returnValue(of('test')),
                                                  apiJcProfile1: jasmine.createSpy('apiJcProfile1').and.returnValue(of('test')) } }
          ]
        }).compileComponents();
    
        fixture = TestBed.createComponent(SideNavbarComponent);
        component = fixture.componentInstance;
        logoutService = TestBed.inject(LogoutService);
        exampleService = TestBed.inject(ExampleService);
    
        spyOn(console, 'log');
      }));
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
    
      it('should execute logout method', () => {
        component.logout();
        expect(logoutService.siginOut).toHaveBeenCalled();
      });
    
      it('should execute gettingData method', () => {
        sessionStorage.setItem('profileID', 'test');
    
        component.gettingData();
        expect(exampleService.apiJcProfile).toHaveBeenCalled();
        expect(component.Data).toEqual('test');
        expect(console.log).toHaveBeenCalled();
      });
    
      it('should execute gettingData1 method', () => {
        component.gettingData1();
        expect(exampleService.apiJcProfile1).toHaveBeenCalled();
        expect(component.Data1).toEqual('test');
        expect(console.log).toHaveBeenCalled();
      });
    });
