import { loadConfig } from '../../src/config/loaders/config-builder';

describe('Configuration Loader', () => {
  it('should load the correct configuration for the current environment', () => {
    process.env.NODE_ENV = 'development';
    const config = loadConfig();

    expect(config).toBeDefined();
    expect(config).toHaveProperty('MONGODB_URI');
    console.log('Loaded configuration:', config);
  });
});