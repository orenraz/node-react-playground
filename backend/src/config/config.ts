import dotenv from 'dotenv';
import { validateSchema } from '../utils/validate-env';
import { mongoSchema } from '../modules/database';
import envSchema from '../validation/env-schema';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// Validate environment variables
const validatedEnv = validateSchema(envSchema);

// Validate MongoDB configuration
const validatedMongoConfig = validateSchema(mongoSchema);

const baseConfig = {
  port: validatedEnv.PORT,
  allowedOrigins: validatedEnv.ALLOWED_ORIGINS.split(','),
  logLevel: validatedEnv.LOG_LEVEL,
  TEST_TIMEOUT: validatedEnv.TEST_TIMEOUT || 30000, // Add default timeout
};

const mongodbConfig = {
  ...validatedMongoConfig,
};

const config = {
  ...baseConfig,
  mongodb: mongodbConfig,
};

export default config;