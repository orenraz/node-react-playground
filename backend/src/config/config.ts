import envSchema from '@src/validation/env-schema';
import { validateSchema } from '@src/utils/validate-env';
import { mongoSchema } from '@src/modules/database';
import { MongoConfigLoader } from '@src/config/loaders/mongo-config-loader';
import { EnvironmentConfigBuilder } from '@src/config/loaders/environment-loader';

const envConfig = new EnvironmentConfigBuilder();
validateSchema(envSchema, envConfig);

const mongoConfig = new MongoConfigLoader();
validateSchema(mongoSchema, mongoConfig);

const config = {
  ...envConfig,
  mongodb: mongoConfig,
};

export default config;