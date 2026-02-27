import Joi from 'joi';
import { validateSchema } from '../utils/validate-env';

describe('Environment Schema Validation', () => {
  const envSchema = Joi.object({
    MONGODB_PROTOCOL: Joi.string().required(),
    MONGODB_USER: Joi.string().required(),
    MONGODB_PASSWORD: Joi.string().required(),
    MONGODB_HOST: Joi.string().required(),
    MONGODB_DB_NAME: Joi.string().required(),
    PORT: Joi.number().default(3000),
    ALLOWED_ORIGINS: Joi.string().default('http://localhost:4000'),
    LOG_LEVEL: Joi.string().default('info'),
  });

  it('should pass validation with valid environment variables', () => {
    const mockEnv = {
      MONGODB_PROTOCOL: 'mongodb',
      MONGODB_USER: 'user',
      MONGODB_PASSWORD: 'password',
      MONGODB_HOST: 'localhost',
      MONGODB_DB_NAME: 'testdb',
      PORT: 4000,
      ALLOWED_ORIGINS: 'http://localhost:3000',
      LOG_LEVEL: 'debug',
    };

    const validatedEnv = validateSchema(envSchema.validate(mockEnv));
    expect(validatedEnv).toMatchObject(mockEnv);
  });

  it('should throw an error for missing required variables', () => {
    const mockEnv = {
      MONGODB_PROTOCOL: 'mongodb',
      MONGODB_USER: 'user',
      MONGODB_PASSWORD: 'password',
      MONGODB_HOST: 'localhost',
    };

    expect(() => validateSchema(envSchema.validate(mockEnv))).toThrow();
  });
});