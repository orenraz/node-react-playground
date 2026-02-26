import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testRegex: '.*\\.(spec|e2e-spec|e2e)\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/src'],
  testTimeout: 10000, 
  setupFiles: ['<rootDir>/test/setup-env.ts'],
};

globalThis.process.env.NODE_ENV = 'test'; // Ensure NODE_ENV is set globally for Jest

export default config;
