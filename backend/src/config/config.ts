import dotenv from 'dotenv';
import logger from '../common/services/logger';
import envSchema from '../validation/env-schema';
import { validateSchema } from '../utils/validate-env';
import { mongoSchema } from '../modules/database';
import { MongoConfigBuilder } from './loaders/mongo-config-builder';
import { MongoDBConfig } from '../types/mongodb-config';

// Load environment-specific .env file
const env: string = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

// Validate environment variables
const validatedEnv = validateSchema(envSchema);

// Validate MongoDB configuration
const validatedMongoConfig = validateSchema(mongoSchema);

const mongodbConfig = {
  ...validatedMongoConfig,
  uri: MongoConfigBuilder.buildConnectionString({
    protocol: validatedEnv.MONGODB_PROTOCOL,
    user: validatedEnv.MONGODB_USER,
    password: validatedEnv.MONGODB_PASSWORD,
    host: validatedEnv.MONGODB_HOST,
    dbName: validatedEnv.MONGODB_DB_NAME,
  }),
};

const baseConfig = {
  env: validatedEnv.NODE_ENV,
  port: validatedEnv.PORT,
  allowedOrigins: validatedEnv.ALLOWED_ORIGINS.split(','),
  logLevel: validatedEnv.LOG_LEVEL,
  TEST_TIMEOUT: validatedEnv.TEST_TIMEOUT || 30000, // Add default timeout
};

const config = {
  ...baseConfig,
  mongodb: mongodbConfig,
};

export default config;