import { MongoConfigBuilder } from '../loaders/mongo-config-builder';

interface DevConfig {
  port: number;
  allowedOrigins: string;
  logLevel: string;
  mongodb: {
    uri: string;
    dbName: string;
  };
  MONGODB_PROTOCOL: string;
}

const devConfig: () => DevConfig = () => ({
  port: parseInt(process.env.PORT, 10),
  allowedOrigins: '',
  logLevel: 'debug',
  mongodb: {
    uri: MongoConfigBuilder.buildConnectionString({
      protocol: process.env.MONGODB_PROTOCOL,
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      host: process.env.MONGODB_HOST,
      dbName: process.env.MONGODB_DB_NAME,
    }),
    dbName: process.env.MONGODB_DB_NAME,
  },
  MONGODB_PROTOCOL: process.env.MONGODB_PROTOCOL,
});

export default devConfig;
