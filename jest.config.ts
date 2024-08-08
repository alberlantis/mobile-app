import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['./jest-setup.ts'],
  preset: 'react-native',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>/src/'],
  moduleDirectories: ['node_modules', 'src'],
  verbose: true,
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
};

export default config;
