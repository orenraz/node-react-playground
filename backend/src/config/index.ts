import envSchema from './schemas/env-schema';
import logger from '../common/services/logger';
import dotenv from 'dotenv';

// Load environment-specific .env file
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

// Validate environment variables
const { error, value: validatedEnv } = envSchema.validate(process.env, { allowUnknown: true });
if (error) {
  logger.error('Environment validation failed:', error);
  throw new Error('Invalid environment configuration.');
}

// Helper function to construct MONGODB_URI dynamically
function constructMongoDbUri(env) {
  const options = env.MONGODB_OPTIONS ? `?${env.MONGODB_OPTIONS}` : '';
  return `${env.MONGODB_PROTOCOL}://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}/${env.MONGODB_DB_NAME}${options}`;
}

// Define an explicit TypeScript interface for the `mongodb` configuration object
interface MongoDBConfig {
  protocol: string;
  user: string;
  password: string;
  host: string;
  dbName: string;
  uri: string;
}

// Use validated environment variables
const config: {
  env: string;
  port: number;
  allowedOrigins: string[];
  logLevel: string;
  mongodb: MongoDBConfig;
} = {
  env: validatedEnv.NODE_ENV,
  port: parseInt(validatedEnv.PORT, 10),
  allowedOrigins: validatedEnv.ALLOWED_ORIGINS?.split(',') || [],
  logLevel: validatedEnv.LOG_LEVEL,
  mongodb: {
    protocol: validatedEnv.MONGODB_PROTOCOL,
    user: validatedEnv.MONGODB_USER,
    password: validatedEnv.MONGODB_PASSWORD,
    host: validatedEnv.MONGODB_HOST,
    dbName: validatedEnv.MONGODB_DB_NAME,
    uri: constructMongoDbUri(validatedEnv),
  },
};

// Export Sequelize configuration
export const sequelizeConfig = {
  development: config.mongodb,
  test: config.mongodb,
  production: config.mongodb,
};

export type { MongoDBConfig };

export default config;