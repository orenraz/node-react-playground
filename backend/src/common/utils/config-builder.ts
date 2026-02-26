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
  const result = dotenv.config({ path: envFilePath });
  if (result.error) {
    throw result.error;
  }
  console.log('Loaded environment variables:', process.env);

  // Debugging log to check loaded environment variables
  console.log('Loaded environment variables:', process.env);

  // Debugging MongoDB URI construction
  const mongoUri = `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB_NAME}?${process.env.MONGODB_OPTIONS}`;
  console.log(`Constructed MongoDB URI: ${mongoUri}`);

  if (!process.env.MONGODB_PROTOCOL || !process.env.MONGODB_USER || !process.env.MONGODB_PASSWORD || !process.env.MONGODB_HOST || !process.env.MONGODB_DB_NAME) {
    console.error('One or more MongoDB environment variables are missing.');
    throw new Error('Incomplete MongoDB configuration.');
  }

  const basePath = path.resolve(__dirname, `../../config/config.${env}`).trim();
  const tsConfigPath = `${basePath}.ts`;
  const jsConfigPath = `${basePath}.js`;

  console.log(`Checking existence of: ${tsConfigPath}`);
  console.log(`File exists: ${fs.existsSync(tsConfigPath)}`);
  console.log(`Checking existence of: ${jsConfigPath}`);
  console.log(`File exists: ${fs.existsSync(jsConfigPath)}`);

  let configPath;
  if (fs.existsSync(tsConfigPath)) {
    console.log(`Found TypeScript config file: ${tsConfigPath}`);
    configPath = tsConfigPath;
  } else if (fs.existsSync(jsConfigPath)) {
    console.log(`Found JavaScript config file: ${jsConfigPath}`);
    configPath = jsConfigPath;
  } else {
    console.error(`No configuration file found for environment: ${env}`);
    throw new Error(`Failed to load configuration for environment: ${env}`);
  }

  console.log(`Resolved config path: ${configPath}`);
  console.log(`Attempting to resolve and load config file for environment: ${env}`);
  console.log(`Attempting to require TypeScript config file: ${tsConfigPath}`);
  console.log(`Attempting to import JavaScript config file: ${jsConfigPath}`);

  try {
    let config;
    if (configPath.endsWith('.ts')) {
      config = require(configPath).default;
      console.log(`Imported TypeScript module:`, config);
    } else {
      config = await import(configPath);
      console.log(`Imported JavaScript module:`, config);
    }

    config.MONGODB_URI = buildMongoUri();
    console.log(`Constructed MONGODB_URI: ${config.MONGODB_URI}`);

    return config;
  } catch (error) {
    console.error(`Failed to import module from path: ${configPath}`);
    throw error;
  }
}