import Joi from 'joi';
import logger from '../common/logger';
import dotenv from 'dotenv';

// Load environment-specific .env file
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

// Consolidate validation schema
const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required()
    .error((errors) => {
      logger.error('Validation error for NODE_ENV:', errors);
      throw new Error('Invalid NODE_ENV value.');
    }),
  PORT: Joi.number().required(),
  ALLOWED_ORIGINS: Joi.string().allow('').optional(),
  LOG_LEVEL: Joi.string().required(),
  MONGODB_USER: Joi.string().required(),
  MONGODB_PASSWORD: Joi.string().required(),
  MONGODB_HOST: Joi.string().required(),
  MONGODB_DB_NAME: Joi.string().required(),
  MONGODB_PROTOCOL: Joi.string().required(),
  MONGODB_OPTIONS: Joi.string().optional(),
});

// Validate environment variables
const { error, value: validatedEnv } = validationSchema.validate(process.env, { allowUnknown: true });
if (error) {
  logger.error('Environment validation failed:', error);
  throw new Error('Invalid environment configuration.');
}

// Helper function to construct MONGODB_URI dynamically
function constructMongoDbUri(env) {
  const options = env.MONGODB_OPTIONS ? `?${env.MONGODB_OPTIONS}` : '';
  return `${env.MONGODB_PROTOCOL}://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}/${env.MONGODB_DB_NAME}${options}`;
}

// Replace inline URI construction with a call to the helper service
const validatedEnvWithUri = {
  ...validatedEnv,
  MONGODB_URI: constructMongoDbUri(validatedEnv),
};

logger.debug('Validated Configuration with URI:', validatedEnvWithUri);

// Log all validated configuration parameters
logger.debug('Validated Configuration:', validatedEnv);

// Use validated environment variables
const config = {
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
    options: validatedEnv.MONGODB_OPTIONS, // Added options
  },
  database: {
    development: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME || 'development_db',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql',
    },
    test: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME || 'test_db',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
    },
  },
};

// Export Sequelize configuration
export const sequelizeConfig = {
  development: config.database,
  test: config.database,
  production: config.database,
};

// Replace inline URI construction with a call to the helper service
function buildMongoUriService(env) {
  return constructMongoDbUri(env);
}

export default config;