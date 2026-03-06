import { loadEnv } from './env-loader';

const env = loadEnv();

export const configLoader = {
  dbUri: env.MONGODB_URI,
  apiBaseUrl: env.API_BASE_URL,
};