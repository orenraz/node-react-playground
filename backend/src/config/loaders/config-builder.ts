import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import 'ts-node/register'; // Ensure ts-node is registered for TypeScript files
import { MongoConfigBuilder } from './mongo-config-builder';

// Create a centralized constants file for environment variable keys
export const ENV_KEYS = {
  MONGODB_PROTOCOL: 'MONGODB_PROTOCOL',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_HOST: 'MONGODB_HOST',
  MONGODB_DB_NAME: 'MONGODB_DB_NAME',
  MONGODB_OPTIONS: 'MONGODB_OPTIONS',
  TEST_TIMEOUT: 'TEST_TIMEOUT',
};

export async function loadConfig() {
  const env = process.env.NODE_ENV?.trim() || 'development';

  console.log(`NODE_ENV: ${env}`);

  // Force loading of .env.test for test environment
  let envFilePath = path.resolve(process.cwd(), `.env.${env}`);
  console.log('Attempting to load environment file:', envFilePath);
  if (!fs.existsSync(envFilePath)) {
    console.error('Environment file does not exist:', envFilePath);
  }

  const config = {
    mongodb: {
      uri: MongoConfigBuilder.buildConnectionString(),
      dbName: process.env.MONGODB_DB_NAME || '',
    },
    TEST_TIMEOUT: process.env.TEST_TIMEOUT ? parseInt(process.env.TEST_TIMEOUT, 10) : 30000,
  };

  return config;
}