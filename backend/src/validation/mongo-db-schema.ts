import Joi from 'joi';

const mongoDbSchema = Joi.object({
  protocol: Joi.string()
    .valid('mongodb', 'mongodb+srv')
    .required()
    .error(() => new Error('protocol must be either mongodb or mongodb+srv.')),

  user: Joi.string()
    .required()
    .error(() => new Error('user is required.')),

  password: Joi.string()
    .required()
    .error(() => new Error('password is required.')),

  host: Joi.string()
    .required()
    .error(() => new Error('host is required.')),

  dbName: Joi.string()
    .required()
    .error(() => new Error('dbName is required.')),

  options: Joi.string()
    .optional()
    .error(() => new Error('options must be a valid string.')),

  uri: Joi.string()
    .uri()
    .required()
    .error(() => new Error('uri must be a valid MongoDB connection string.')),
});

export default mongoDbSchema;