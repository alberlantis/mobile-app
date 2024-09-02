import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['./jest-setup.ts'],
  preset: 'react-native',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>/'],
  moduleDirectories: ['node_modules'],
  verbose: true,
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|react-redux)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
};

export default config;
