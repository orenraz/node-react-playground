import dotenv from 'dotenv';
dotenv.config();

export class SequelizeConfigBuilder {
  static buildConfig() {
    const requiredVars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST'];
    const missingVars = requiredVars.filter((key) => !process.env[key]);

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    const baseConfig = {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
    };

    return {
      development: {
        ...baseConfig,
        logging: console.log,
      },
      test: {
        ...baseConfig,
        logging: false,
      },
      production: {
        ...baseConfig,
        logging: false,
        pool: {
          max: 10,
          min: 1,
          acquire: 30000,
          idle: 10000,
        },
      },
    };
  }
}

export default SequelizeConfigBuilder.buildConfig();