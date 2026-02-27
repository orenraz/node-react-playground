import Joi from 'joi';

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  LOG_LEVEL: Joi.string().default('info'),
  ALLOWED_ORIGINS: Joi.string().default('*'),
});

export default envSchema;