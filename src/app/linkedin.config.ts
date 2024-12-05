import { isPlatform } from '@ionic/angular';
import config from '../../capacitor.config';

export const domain = 'dev-tg5p3f7eb3e6jx3v.us.auth0.com';
export const clientId = 'G8vc37GQ4FRBBjdZyh3FCs7fJmyZY6sx';
const { appId } = config;

// Use `auth0Domain` in string interpolation below so that it doesn't
// get replaced by the quickstart auto-packager
const auth0Domain = domain;
const iosOrAndroid = isPlatform('hybrid');

export const callbackUri = iosOrAndroid
  ? `${appId}://${auth0Domain}/capacitor/${appId}/callback`
  : 'http://localhost:4200';
