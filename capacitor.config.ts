import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jobcheck.app',
  appName: 'JobCheck',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: "731942592049-b1gtipk1ni8do3cn3dl7p6sbns45i376.apps.googleusercontent.com"
      },

    PushNotifications: {
        presentationOptions: ['badge', 'sound', 'alert']
    }
}
};

export default config;
