import "dotenv/config";
import { defineEasConfig } from "eas-config-ts";

const env = process.env.APP_ENV || 'dev';
const isProd = env === 'prod'
if (isProd) {
  require('dotenv').config({ path: '.env.prod' });
} else {
  require('dotenv').config({ path: '.env.dev' });
}

const expoVariables =
  Object.keys(process.env)
  .filter(key => key.startsWith('EXPO_PUBLIC'))
  .reduce((acc, key) => {
  return {
    ...acc,
    [key]: process.env[key]
  };
}, {});

// you can write type-safe config
export default defineEasConfig({
  build: {
    development: {
      ...!isProd && {env: expoVariables},
      distribution: "internal",
      channel: "development",
    },
    production: {
      distribution: "internal",
      channel: "production",
      ...isProd && {env: expoVariables},
    },
    release: {
      distribution: "store",
      channel: "release",
      ...isProd && {env: expoVariables},
    },
  },
  submit: {
    release: {
      ios: {
        ascAppId: "6648819135"
      },
      android: {
        track: "internal",
        releaseStatus: 'draft'
      }
    },
  }
});
