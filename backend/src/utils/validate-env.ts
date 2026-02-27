import Joi from 'joi';

export function validateEnvVars(requiredVars: string[]) {
  const missingVars = requiredVars.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

export function validateSchema(schema: Joi.ObjectSchema) {
  const { error, value } = schema.validate(process.env, { allowUnknown: true });
  if (error) {
    throw new Error(`Joi validation error: ${error.message}`);
  }
  return value;
}