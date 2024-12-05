// import { TestBed } from '@angular/core/testing';
// import { AuthlandingService } from './jobseeker/authentication/services/authlanding.service';


// describe('AuthenticationGuard', () => {
//   let guard:AuthlandingService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     guard = TestBed.inject(AuthlandingService);
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });
// });

// import { IsAuthenticated } from './is-authenticated';
import { IsAuthenticated } from './authentication.guard';
// import { LoginEmailService } from './login-email.service';
import { Router } from '@angular/router';
import { LoginEmailService } from './jobseeker/authentication/services/login-email.service';

describe('IsAuthenticated', () => {
  let auth: LoginEmailService;
  let router: Router;
  let isAuthenticated: IsAuthenticated;
 

  beforeEach(() => {
    auth = jasmine.createSpyObj('LoginEmailService', ['isAuthenticated']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    isAuthenticated = new IsAuthenticated(auth, router);
  });

  it('should allow access if user is authenticated', async () => {
    // auth.isAuthenticated.and.returnValue(Promise.resolve(true));
    isAuthenticated.isAuthenticated.returnValue(Promise.resolve(true));

    const result = await isAuthenticated.canActivate();

    expect(result).toBe(true);
    expect(auth.isAuthenticated).toHaveBeenCalled();
  });

  it('should block access and redirect to login page if user is not authenticated', async () => {
    // auth.isAuthenticated.and.returnValue(Promise.resolve(false));
    isAuthenticated.isAuthenticated.returnValue(Promise.resolve(true));

    const result = await isAuthenticated.canActivate();

    expect(result).toBe(false);
    expect(auth.isAuthenticated).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/loginMobile']);
  });
});



