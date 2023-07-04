import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gestagro.app',
  appName: 'GestAgro',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
