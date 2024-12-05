
// 1. Import required Angular modules 
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

//2.Imports - JobCheck Services
import { LoginEmailService } from './login-email.service';
import { callbackUri } from 'src/app/linkedin.config';

//3. Plugins of Ionic capacitor
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Browser } from '@capacitor/browser';

// Decorate the service class as a root-level service
@Injectable({
  providedIn: 'root'
})

export class LogoutService {
  constructor(private auth: LoginEmailService, private router: Router, private linked: AuthService) {
  }

  // Function to perform LinkedIn logout
  logoutlinkedin() {
    this.linked
      .logout({
        logoutParams: {
          returnTo: callbackUri,
        },
        async openUrl(url: string) {
          return Browser.open({ url, windowName: '_self' });
        }
      }).subscribe();
  }

  // Function to sign out from various authentication providers
  async siginOut() {
    await this.auth.signOut();
    GoogleAuth.signOut();
    FacebookLogin.logout();
    // this.logoutlinkedin();
    // GoogleAuth.signOut();
    localStorage.removeItem('fromjobcheck');
    localStorage.clear();
    console.clear()
    sessionStorage.clear();
    this.router.navigate(['/loginEmail']);

  }
}
