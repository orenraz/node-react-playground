import { EnvironmentConfigBuilder } from '../config/loaders/environment-loader';
import { MongoConfigLoader } from '../config/loaders/mongo-config-loader';
import { validateSchema } from '../utils/validate-schema';
import envSchema from '../validation/env-schema';
import mongoDbSchema from '../validation/mongo-db-schema';
import { EnvironmentConfigOverrides } from '../config/types/environment-config-overrides';
import { MongoConfigOverrides } from '../config/types/mongo-config-overrides';

export class Config {
  public readonly envConfig: EnvironmentConfigBuilder;
  public readonly mongoConfig: MongoConfigLoader;

  private constructor(
    envOverrides: EnvironmentConfigOverrides = {},
    mongoOverrides: MongoConfigOverrides = {},
    envFilePath?: string
  ) {
    this.envConfig = new EnvironmentConfigBuilder(envOverrides, envFilePath);
    validateSchema(envSchema, this.envConfig);

    this.mongoConfig = new MongoConfigLoader(mongoOverrides);
    validateSchema(mongoDbSchema, this.mongoConfig);
  }

  public static create(
    envOverrides: EnvironmentConfigOverrides = {},
    mongoOverrides: MongoConfigOverrides = {},
    envFilePath?: string
  ): Config {
    return new Config(envOverrides, mongoOverrides, envFilePath);
  }

  public getConfig() {
    return {
      ...this.envConfig,
      mongodb: { ...this.mongoConfig },
    };
  }
}

// Default export for app compatibility
export default Config.create().getConfig();