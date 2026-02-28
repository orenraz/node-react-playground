import dotenv from 'dotenv';
import logger from '../common/services/logger';
import envSchema from '../validation/env-schema';
import { validateSchema } from '../utils/validate-env';
import { mongoSchema } from '../modules/database';
import { MongoConfigBuilder } from './loaders/mongo-config-builder';

// Load environment-specific .env file
const env: string = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

// Validate environment variables
const envSchemaObject = validateSchema(envSchema);

// Validate MongoDB configuration
const validatedMongoConfig = validateSchema(mongoSchema);

const mongodbConfig = {
  uri: MongoConfigBuilder.buildConnectionString({
    protocol: envSchemaObject.MONGODB_PROTOCOL,
    user: envSchemaObject.MONGODB_USER,
    password: envSchemaObject.MONGODB_PASSWORD,
    host: envSchemaObject.MONGODB_HOST,
    dbName: envSchemaObject.MONGODB_DB_NAME,
  }),
  dbName: envSchemaObject.MONGODB_DB_NAME,
  protocol: envSchemaObject.MONGODB_PROTOCOL,
  user: envSchemaObject.MONGODB_USER,
  password: envSchemaObject.MONGODB_PASSWORD,
  host: envSchemaObject.MONGODB_HOST,
  options: envSchemaObject.MONGODB_OPTIONS,
};

const baseConfig = {
  env: envSchemaObject.NODE_ENV,
  port: envSchemaObject.PORT,
  allowedOrigins: envSchemaObject.ALLOWED_ORIGINS.split(','),
  logLevel: envSchemaObject.LOG_LEVEL,
  TEST_TIMEOUT: envSchemaObject.TEST_TIMEOUT || 30000, // Add default timeout
};

const config = {
  ...baseConfig,
  mongodb: mongodbConfig,
};

export default config;