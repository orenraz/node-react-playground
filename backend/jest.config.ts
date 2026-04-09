import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  roots: ['<rootDir>/test'],
  testRegex: '.*\\.(spec|e2e-spec|e2e)\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/src'],
  testTimeout: 10000, 
  // globalSetup: '<rootDir>/test/setup/globalSetup.ts',
  // globalTeardown: '<rootDir>/test/setup/globalTeardown.ts',
  setupFilesAfterEnv: ['./test/setup/jest.setup.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(uuid)/)',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};

globalThis.process.env.NODE_ENV = 'test'; // Ensure NODE_ENV is set globally for Jest

export default config;
