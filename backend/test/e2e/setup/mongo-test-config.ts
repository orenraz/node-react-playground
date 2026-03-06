import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigLoader } from '@src/config/loaders/mongo-config-loader';
import mongoose from 'mongoose';
import { loadEnv } from '@test/shared/env-loader';

const env = loadEnv();

config();

/**
 * MongoDB Test configuration object that centralizes test-related settings and utilities.
 */
export const MongoTestConfig = {
  /**
   * Builds the MongoDB connection string using MongoConfigBuilder.
   * Logs errors and exits the process if the URI cannot be built.
   * @returns {string} The MongoDB connection string.
   */
  buildMongoDbUri(): string {
    const { protocol, user, password, host, dbName } = this.createTestDatabaseConnection();
    return `${protocol}://${user}:${password}@${host}/${dbName}`;
  },

  /**
   * The MongoDB URI for tests.
   */
  TEST_DB_URI: '',

  /**
   * Initializes the configuration object.
   */
  initialize() {
    if (!process.env.MONGODB_URI) {
      process.env.MONGODB_URI = this.buildMongoDbUri();
    }
    this.TEST_DB_URI = process.env.MONGODB_URI;
  },

  /**
   * Creates a test database connection module for NestJS.
   * @returns {DynamicModule} The MongooseModule configured for the test database.
   */
  createTestDatabaseConnection() {
    return MongooseModule.forRoot(this.TEST_DB_URI);
  },

  /**
   * Connects to the test database.
   * @param {string} uri - The MongoDB URI.
   */
  async connectTestDb(uri: string) {
    await mongoose.connect(uri);
  },

  /**
   * Disconnects from the test database.
   */
  async disconnectTestDb() {
    await mongoose.disconnect();
  },
};

// Initialize the configuration object
MongoTestConfig.initialize();