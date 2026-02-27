import dotenv from 'dotenv';
import { MongoConfigBuilder } from './loaders/mongo-config-builder';

dotenv.config();

const testConfig = {
  port: parseInt(process.env.PORT || '3030', 10),
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4000'],
  logLevel: process.env.LOG_LEVEL || 'debug',
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
};

export default testConfig;