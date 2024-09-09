import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

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
    runtimeVersion: process.env.EXPO_PUBLIC_RUNTIME_VERSION,
    version: process.env.EXPO_PUBLIC_APP_VERSION,
    sdkVersion: "51.0.0",
    icon: './assets/icon/icon.png',
    splash: {
      image: './assets/splash/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#000000'
    },
    platforms: [
      'ios',
      'android'
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icon/android-adaptive-icon.png',
      },
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
    },
    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        }
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
          isAccessMediaLocationEnabled: true
        }
      ]
    ]
  }
};
