import dotenv from 'dotenv';
import { MongoConfigBuilder } from './loaders/mongo-config-builder';
import { validateEnvVars } from '../utils/validate-env';
import { getMongoConfig } from './loaders/config-builder';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const baseConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4000'],
  logLevel: process.env.LOG_LEVEL || 'info',
  TEST_TIMEOUT: process.env.TEST_TIMEOUT ? parseInt(process.env.TEST_TIMEOUT, 10) : 30000,
};

// Decouple MongoConfigBuilder from envVars
const mongodbConfig = {
  mongodb: getMongoConfig(),
};

const config = {
  ...baseConfig,
  ...mongodbConfig,
};

const requiredEnvVars = ['MONGODB_PROTOCOL', 'MONGODB_USER', 'MONGODB_PASSWORD', 'MONGODB_HOST', 'MONGODB_DB_NAME'];
validateEnvVars(requiredEnvVars);

// Export validated environment variables for shared use
export const envVars = {
  protocol: process.env.MONGODB_PROTOCOL,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  host: process.env.MONGODB_HOST,
  dbName: process.env.MONGODB_DB_NAME,
};

// Debug log to verify envVars initialization
console.log('Exporting envVars:', envVars);

console.log('Loaded environment variables:', envVars);

export default config;