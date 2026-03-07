// TODO: rename or maybe split into 2 files for env var validation and schema validation?

import Joi from 'joi';

export function validateEnvVars(requiredVars: string[]) {
  const missingVars = requiredVars.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

export function validateSchema(schema: Joi.ObjectSchema, obj: Record<string, any>): Record<string, any> {
  const { error, value } = schema.validate(obj, { allowUnknown: true });
  if (error) {
    throw new Error(`Joi validation error: ${error.message}`);
  }
  return value;
}