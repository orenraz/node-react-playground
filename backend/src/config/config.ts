import envSchema from '@src/validation/env-schema';
import { validateSchema } from '@src/utils/validate-schema';
import mongoDbSchema from '@src/validation/mongo-db-schema';
import { MongoConfigLoader } from '@src/config/loaders/mongo-config-loader';
import { EnvironmentConfigBuilder } from '@src/config/loaders/environment-loader';

class Config {
  private static instance: Config;
  public readonly envConfig: EnvironmentConfigBuilder;
  public readonly mongoConfig: MongoConfigLoader;

  private constructor() {
    // Initialize and validate environment configuration
    this.envConfig = new EnvironmentConfigBuilder();
    console.log('Environment Configuration:', this.envConfig);
    validateSchema(envSchema, this.envConfig);

    // Initialize and validate MongoDB configuration
    this.mongoConfig = new MongoConfigLoader();
    console.log('MongoDB Configuration:', this.mongoConfig);
    validateSchema(mongoDbSchema, this.mongoConfig);
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public getConfig() {
    return {
      ...this.envConfig,
      mongodb: { ...this.mongoConfig },
    };
  }
}

export default Config.getInstance().getConfig();