import { MongoConfigBuilder } from './loaders/mongo-config-builder';

export default () => ({
  port: parseInt(process.env.PORT, 10),
  allowedOrigins: process.env.ALLOWED_ORIGINS || '',
  logLevel: process.env.LOG_LEVEL || 'info',
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
});
