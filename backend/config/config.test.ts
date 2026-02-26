import { Config } from './schema';

const testConfig: Config = {
  MONGODB_URI: `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB_NAME}?${process.env.MONGODB_OPTIONS}`,
  PORT: parseInt(process.env.PORT || '3030', 10),
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4000'],
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
};

export default testConfig;