import Joi from 'joi';

console.log('Validation schema initialized.');

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required()
    .error((errors) => {
      console.error('Validation error for NODE_ENV:', errors);
      return errors;
    }),
  PORT: Joi.number(),
  ALLOWED_ORIGINS: Joi.string().allow('').optional(),
  LOG_LEVEL: Joi.string(),
  MONGODB_USER: Joi.string().required(),
  MONGODB_PASSWORD: Joi.string().required(),
  MONGODB_HOST: Joi.string().required(),
  MONGODB_DB_NAME: Joi.string(),
  MONGODB_OPTIONS: Joi.string().optional(),
  MONGODB_PROTOCOL: Joi.string(),
  MONGODB_URI: Joi.string().optional(), 
});
