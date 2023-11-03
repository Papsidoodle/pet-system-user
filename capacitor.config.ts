import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.petscureuser.app',
  appName: 'PetsCure User',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
