import Joi from 'joi';

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required()
    .error((errors) => {
      throw new Error('Invalid NODE_ENV value.');
    }),
  PORT: Joi.number().required(),
  ALLOWED_ORIGINS: Joi.string().allow('').optional(),
  LOG_LEVEL: Joi.string().required(),
});

export default envSchema;