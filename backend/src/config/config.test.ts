import dotenv from 'dotenv';
import { MongoConfigBuilder } from '../config/mongo-config-builder';

dotenv.config();

const testConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  logLevel: process.env.LOG_LEVEL || 'debug',
  mongodb: {
    uri: MongoConfigBuilder.buildConnectionString(),
    dbName: process.env.MONGODB_DB_NAME,
  },
};

export default testConfig;