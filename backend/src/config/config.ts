import envSchema from '@src/validation/env-schema';
import { validateSchema } from '@src/utils/validate-schema';
import mongoDbSchema from '@src/validation/mongo-db-schema';
import { MongoConfigLoader } from '@src/config/loaders/mongo-config-loader';
import { EnvironmentConfigBuilder } from '@src/config/loaders/environment-loader';

const envConfig = new EnvironmentConfigBuilder();
console.log('Environment Configuration:', envConfig);
validateSchema(envSchema, envConfig);

const mongoConfig = new MongoConfigLoader();
console.log('MongoDB Configuration:', mongoConfig);
validateSchema(mongoDbSchema, mongoConfig);

const config = {
  ...envConfig,
  mongodb: mongoConfig,
};

export default config;