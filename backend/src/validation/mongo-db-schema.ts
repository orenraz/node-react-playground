import Joi from 'joi';

const mongoDbSchema = Joi.object({
  MONGODB_PROTOCOL: Joi.string()
    .valid('mongodb', 'mongodb+srv')
    .required()
    .error(() => new Error('MONGODB_PROTOCOL must be either mongodb or mongodb+srv.')),

  MONGODB_USER: Joi.string()
    .required()
    .error(() => new Error('MONGODB_USER is required.')),

  MONGODB_PASSWORD: Joi.string()
    .required()
    .error(() => new Error('MONGODB_PASSWORD is required.')),

  MONGODB_HOST: Joi.string()
    .required()
    .error(() => new Error('MONGODB_HOST is required.')),

  MONGODB_DB_NAME: Joi.string()
    .required()
    .error(() => new Error('MONGODB_DB_NAME is required.')),

  MONGODB_OPTIONS: Joi.string()
    .optional()
    .error(() => new Error('MONGODB_OPTIONS must be a valid string.')),

  URI: Joi.string()
    .uri()
    .required()
    .error(() => new Error('URI must be a valid MongoDB connection string.')),
});

export default mongoDbSchema;