import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.petscure.app',
  appName: 'PetsCure User',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
