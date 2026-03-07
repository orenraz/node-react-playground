import Joi from 'joi';

const mongoDbSchema = Joi.object({
  PROTOCOL: Joi.string()
    .valid('mongodb', 'mongodb+srv')
    .required()
    .error(() => new Error('PROTOCOL must be either mongodb or mongodb+srv.')),

  USER: Joi.string()
    .required()
    .error(() => new Error('USER is required.')),

  PASSWORD: Joi.string()
    .required()
    .error(() => new Error('PASSWORD is required.')),

  HOST: Joi.string()
    .required()
    .error(() => new Error('HOST is required.')),

  DB_NAME: Joi.string()
    .required()
    .error(() => new Error('DB_NAME is required.')),

  OPTIONS: Joi.string()
    .optional()
    .error(() => new Error('OPTIONS must be a valid string.')),

  URI: Joi.string()
    .uri()
    .required()
    .error(() => new Error('URI must be a valid MongoDB connection string.')),
});

export default mongoDbSchema;