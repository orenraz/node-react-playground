import dotenv from 'dotenv';
import { MongoConfigBuilder } from '../config/mongo-config-builder';

dotenv.config();

const productionConfig = {
  port: parseInt(process.env.PORT || '3030', 10),
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4000'],
  logLevel: process.env.LOG_LEVEL || 'info',
  mongodb: {
    uri: MongoConfigBuilder.buildConnectionString(),
    dbName: process.env.MONGODB_DB_NAME,
  },
};

export default productionConfig;