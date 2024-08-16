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
    dev: {
      ...!isProd && {env: expoVariables},
      distribution: "internal",
      channel: "development",
      ios: {
        simulator: true
      },
    },
    prod: {
      distribution: "internal",
      channel: "production",
      ...isProd && {env: expoVariables},
    }
  },
});
