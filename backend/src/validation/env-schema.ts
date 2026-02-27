import Joi from 'joi';
import mongoSchema from '../modules/database/validation/mongo-schema';

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required()
    .error(() => new Error('NODE_ENV must be one of: development, production, test.')),

  PORT: Joi.number()
    .integer()
    .min(1024)
    .max(65535)
    .required()
    .error(() => new Error('PORT must be a number between 1024 and 65535.')),

  ALLOWED_ORIGINS: Joi.string()
    .pattern(/^https?:\/\/.+/)
    .allow('')
    .optional()
    .error(() => new Error('ALLOWED_ORIGINS must be a valid URL or empty.')),

  LOG_LEVEL: Joi.string()
    .valid('debug', 'info', 'warn', 'error')
    .required()
    .error(() => new Error('LOG_LEVEL must be one of: debug, info, warn, error.')),

  TEST_TIMEOUT: Joi.number()
    .integer()
    .min(1000)
    .max(60000)
    .optional()
    .error(() => new Error('TEST_TIMEOUT must be a number between 1000 and 60000 milliseconds.')),
}).concat(mongoSchema);

export default envSchema;