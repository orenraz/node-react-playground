// Jest setup file for backend tests
// Use this to configure globals, timeouts and common hooks
import 'reflect-metadata';

jest.setTimeout(30000);

afterEach(() => {
  jest.clearAllMocks();
});
