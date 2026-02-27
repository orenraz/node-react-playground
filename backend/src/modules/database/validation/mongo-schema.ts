import Joi from 'joi';

const mongoSchema = Joi.object({
  MONGODB_PROTOCOL: Joi.string().required(),
  MONGODB_USER: Joi.string().required(),
  MONGODB_PASSWORD: Joi.string().required(),
  MONGODB_HOST: Joi.string().required(),
  MONGODB_DB_NAME: Joi.string().required(),
});

export default mongoSchema;