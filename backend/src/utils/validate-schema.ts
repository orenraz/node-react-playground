// TODO: rename or maybe split into 2 files for env var validation and schema validation?

import Joi from 'joi';

export function validateSchema(schema: Joi.ObjectSchema, obj: Record<string, any>): Record<string, any> {
  // Normalize NODE_ENV
  if (obj.env) {
    obj.NODE_ENV = obj.env.trim().toLowerCase();
  }

  // Convert PORT to a number
  if (obj.port) {
    obj.PORT = parseInt(obj.port, 10);
  }

  // Normalize LOG_LEVEL
  if (obj.logLevel) {
    obj.LOG_LEVEL = obj.logLevel.trim().toLowerCase();
  }

  console.log('Object being validated:', obj);
  console.log('Schema being used:', schema.describe());

  const { error, value } = schema.validate(obj, { allowUnknown: true });
  if (error) {
    throw new Error(`Joi validation error: ${error.message}`);
  }
  return value;
}