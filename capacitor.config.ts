import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'payslips-app',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "Filesystem": {
      "webPath": "public/"
    }
  }
};

export default config;
