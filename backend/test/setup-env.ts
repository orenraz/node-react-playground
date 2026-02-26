import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { writeFileSync } from 'fs';

config();

// Construct MONGODB_URI dynamically
if (!process.env.MONGODB_URI) {
  const protocol = process.env.MONGODB_PROTOCOL;
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;
  const dbName = process.env.MONGODB_DB_NAME;
  const options = process.env.MONGODB_OPTIONS;

  if (protocol && user && password && host && dbName) {
    process.env.MONGODB_URI = `${protocol}://${user}:${password}@${host}/${dbName}?${options}`;
  } else {
    console.error('Missing MongoDB configuration in .env file');
  }
}

// Debug log to confirm .env loading
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Log the path of .env.test and its parent folder contents
try {
  const envTestPath = resolve(__dirname, '../.env.test');
  const parentFolder = dirname(envTestPath);
  const filesInParentFolder = readdirSync(parentFolder);

  console.log('Path to .env.test:', envTestPath);
  console.log('Files in parent folder:', filesInParentFolder);

  // Log the path of .env.test and its parent folder contents to a file
  const logFilePath = resolve(__dirname, '../env_test_log.txt');
  const logContent = `Path to .env.test: ${envTestPath}\nFiles in parent folder:\n${filesInParentFolder.map(file => `File: ${file}, Path: ${resolve(parentFolder, file)}`).join('\n')}`;
  writeFileSync(logFilePath, logContent, 'utf8');
  console.log(`Logged .env.test details to: ${logFilePath}`);
} catch (error) {
  console.error('Error accessing .env.test or its parent folder:', error);
}