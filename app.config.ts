import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';
import { version } from './package.json'

export default ({ config }: ConfigContext): ExpoConfig => {
  const env = process.env.APP_ENV || 'dev';
  if (env === 'prod') {
    require('dotenv').config({ path: '.env.prod' });
  } else {
    require('dotenv').config({ path: '.env.dev' });
  }

  return {
    ...config,
    name: process.env.EXPO_PUBLIC_APP_NAME || 'Satlantis',
    slug: "satlantis",
    owner: "satlantis",
    runtimeVersion: version,
    version: process.env.EXPO_PUBLIC_APP_VERSION,
    sdkVersion: "51.0.0",
    splash: {
      backgroundColor: "#ffffff"
    },
    platforms: [
      'ios',
      'android'
    ],
    android: {
      package: process.env.EXPO_PUBLIC_APP_IDENTIFIER,
      versionCode: isNaN(Number(process.env.EXPO_PUBLIC_BUILD_VERSION)) ?
        config.android?.versionCode :
        Number(process.env.EXPO_PUBLIC_BUILD_VERSION)
    },
    ios: {
      bundleIdentifier: process.env.EXPO_PUBLIC_APP_IDENTIFIER,
      buildNumber: process.env.EXPO_PUBLIC_BUILD_VERSION
    },
    extra: {
      eas: {
        projectId: "8dccd390-753b-40d9-b945-5d7722569c17"
      }
    },
    updates: {
      url: "https://u.expo.dev/8dccd390-753b-40d9-b945-5d7722569c17"
    }
  }
};
