import fs from 'fs';
import dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { getEnvFilePath } from '../../utils/env-file-path';

// Refactor `EnvironmentConfigBuilder` to use a constructor for building the configuration
export class EnvironmentConfigBuilder {
  public nodeEnv: string;
  public port: string | undefined;
  public allowedOrigins: string[];
  public logLevel: string | undefined;
  public testTimeout: number;

  constructor() {
    this.nodeEnv = process.env.NODE_ENV?.trim() || 'development';

    // Dynamically resolve .env file path
    const envFilePath = getEnvFilePath();
    Logger.debug(`Resolved environment file path: ${envFilePath}`);
    if (fs.existsSync(envFilePath)) {
      dotenv.config({ path: envFilePath });
      console.log(`Loaded environment file: ${envFilePath}`);
      console.log('Loaded Environment Variables:', process.env);
    } else {
      Logger.error(`Environment file not found: ${envFilePath}`);
      throw new Error(`Environment file not found: ${envFilePath}`);
    }

    this.nodeEnv = process.env.NODE_ENV?.trim();
    this.port = process.env.PORT;
    this.allowedOrigins = (process.env.ALLOWED_ORIGINS).split(',');
    this.logLevel = process.env.LOG_LEVEL;
    this.testTimeout = parseInt(process.env.TEST_TIMEOUT, 10);
  }
}