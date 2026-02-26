import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import 'ts-node/register'; // Ensure ts-node is registered for TypeScript files

export function buildMongoUri(): string {
  const protocol = process.env.MONGODB_PROTOCOL;
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;
  const dbName = process.env.MONGODB_DB_NAME;
  const options = process.env.MONGODB_OPTIONS;

  console.log('Environment variables for MongoDB URI:', {
    protocol,
    user,
    password,
    host,
    dbName,
    options,
  });

  if (!protocol || !user || !password || !host || !dbName) {
    throw new Error('Missing required MongoDB configuration values');
  }

  const sanitizedOptions = options?.replace(/useNewUrlParser|useUnifiedTopology/g, '') || '';
  return `${protocol}://${user}:${password}@${host}/${dbName}?${sanitizedOptions}`;
}

export async function loadConfig() {
  const env = process.env.NODE_ENV?.trim() || 'development';

  console.log(`NODE_ENV: ${env}`);

  // Force loading of .env.test for test environment
  let envFilePath = path.resolve(process.cwd(), `.env.${env}`);
  console.log('Attempting to load environment file:', envFilePath);
  if (!fs.existsSync(envFilePath)) {
    console.error('Environment file does not exist:', envFilePath);
  }
}