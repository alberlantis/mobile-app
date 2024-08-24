import type { Config } from 'jest';
import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest'

const config: Config = {
  setupFilesAfterEnv: ['./jest-setup.ts'],
  preset: 'react-native',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>/'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  verbose: true,
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|react-redux)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
};

export default config;
