import { createE2EApp, closeE2EApp } from '../../setup';
import mongoose from 'mongoose';
import { MongoConfigLoader } from 'src/config/loaders/mongo-config-loader';

describe('Database Connection (e2e)', () => {
  let app: any;

  beforeAll(async () => {
    const res = await createE2EApp();
    app = res.app;
  });

  it('should connect to the database successfully', async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('should connect using MongoConfigBuilder', async () => {
    const uri = MongoConfigLoader.buildConnectionString({
      protocol: process.env.MONGODB_PROTOCOL || 'mongodb',
      user: process.env.MONGODB_USER || 'testUser',
      password: process.env.MONGODB_PASSWORD || 'testPassword',
      host: process.env.MONGODB_HOST || 'localhost',
      dbName: process.env.MONGODB_DBNAME || 'testDb',
    });

    await mongoose.disconnect(); // Ensure no existing connection

    try {
      await mongoose.connect(uri);
      expect(mongoose.connection.readyState).toBe(1);
    } finally {
      await mongoose.disconnect();
    }
  });

  afterAll(async () => {
    await closeE2EApp(app);
  });
});