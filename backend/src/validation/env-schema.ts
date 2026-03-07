import Joi from 'joi';

const envSchema = Joi.object({
  nodeEnv: Joi.string()
    .valid('development', 'production', 'test')
    .required()
    .error(() => new Error('nodeEnv must be one of: development, production, test.')),

  port: Joi.number()
    .integer()
    .min(1024)
    .max(65535)
    .required()
    .error(() => new Error('port must be a number between 1024 and 65535.')),

  allowedOrigins: Joi.array()
    .items(Joi.string().pattern(/^(http|https):\/\/.+/))
    .optional()
    .error(() => new Error('allowedOrigins must be a list of valid URLs.')),

  logLevel: Joi.string()
    .valid('debug', 'info', 'warn', 'error')
    .required()
    .error(() => new Error('logLevel must be one of: debug, info, warn, error.')),

  testTimeout: Joi.number()
    .integer()
    .min(1000)
    .max(60000)
    .optional()
    .error(() => new Error('testTimeout must be a number between 1000 and 60000 milliseconds.')),
});

export default envSchema;