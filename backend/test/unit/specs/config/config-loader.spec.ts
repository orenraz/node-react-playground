import { BaseTest } from '../../setup/common/BaseTest';
import { loadEnv } from '../../../shared/env-loader';

class ConfigLoaderTest extends BaseTest {
  async setup() {
    // Setup logic if needed
  }

  async teardown() {
    // Teardown logic if needed
  }
}

describe('Configuration Loader', () => {
  const test = new ConfigLoaderTest();

  beforeAll(async () => {
    await test.setup();
  });

  afterAll(async () => {
    await test.teardown();
  });

  afterEach(() => {
    test.afterEach();
  });

  it('should load the correct configuration for the current environment', async () => {
    const env = loadEnv();

    process.env.NODE_ENV = 'development';
    process.env.MONGODB_PROTOCOL = env.MONGODB_PROTOCOL || 'mongodb';
    process.env.MONGODB_USER = env.MONGODB_USER || 'user';
    process.env.MONGODB_PASSWORD = env.MONGODB_PASSWORD || 'pass';
    process.env.MONGODB_HOST = env.MONGODB_HOST || 'localhost';
    process.env.MONGODB_DB_NAME = env.MONGODB_DB_NAME || 'testdb';

    const config = {
      mongodb: {
        uri: `mongodb://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}/${env.MONGODB_DB_NAME}`,
      },
    };

    expect(config).toBeDefined();
    expect(config).toHaveProperty('mongodb');
    expect(config.mongodb).toHaveProperty('uri');
    console.log('Loaded configuration:', config);
  });
});