const { getDefaultConfig } = require('expo/metro-config');

/**
 * @type {import('expo/metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true
config.resolver.unstable_conditionNames = [ 'browser', 'require', 'react-native', ]

module.exports = config;
