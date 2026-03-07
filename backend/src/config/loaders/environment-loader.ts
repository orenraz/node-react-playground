import fs from 'fs';
import dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { getEnvFilePath } from '../../utils/env-file-path';

export class EnvironmentConfigBuilder {
  public NODE_ENV: string;
  public PORT: string | undefined;
  public ALLOWED_ORIGINS: string;
  public LOG_LEVEL: string | undefined;
  public TEST_TIMEOUT: number;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV?.trim() || 'development';

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

    this.NODE_ENV = process.env.NODE_ENV?.trim();
    this.PORT = process.env.PORT;
    this.ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
    this.LOG_LEVEL = process.env.LOG_LEVEL;
    this.TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT, 10);
  }
}