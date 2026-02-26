import { MongoConfigBuilder } from '../config/mongo-config-builder';

export default () => ({
  port: parseInt(process.env.PORT, 10),
  allowedOrigins: process.env.ALLOWED_ORIGINS || '',
  logLevel: process.env.LOG_LEVEL || 'info',
  mongodb: {
    uri: MongoConfigBuilder.buildConnectionString(),
    dbName: process.env.MONGODB_DB_NAME,
  },
});
