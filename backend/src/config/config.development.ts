import { MongoConfigBuilder } from './loaders/mongo-config-builder';

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
    uri: MongoConfigBuilder.buildConnectionString(),
    dbName: process.env.MONGODB_DB_NAME,
  },
  MONGODB_PROTOCOL: process.env.MONGODB_PROTOCOL,
});

export default devConfig;
