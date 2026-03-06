import dotenv from 'dotenv';
import { getEnvFilePath } from '@src/utils/env-file-path';

export function loadConfig() {
  const envFilePath = getEnvFilePath();
  dotenv.config({ path: envFilePath });
  console.log(`Loaded environment configuration from: ${envFilePath}`);
}