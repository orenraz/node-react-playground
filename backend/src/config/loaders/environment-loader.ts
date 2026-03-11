
import fs from 'fs';
import dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { getEnvFilePath } from '../../utils/env-file-path';
import { EnvironmentConfigOverrides } from '@src/config/types/environment-config-overrides';

export class EnvironmentConfigBuilder {
  public NODE_ENV: string;
  public PORT: string | undefined;
  public ALLOWED_ORIGINS: string;
  public LOG_LEVEL: string | undefined;
  public TEST_TIMEOUT: number;

  constructor(overrides: EnvironmentConfigOverrides = {}, envFilePath?: string) {
    // Load environment file if not in test mode or if explicitly provided
    const resolvedEnvFilePath = envFilePath || getEnvFilePath();
    if (resolvedEnvFilePath && fs.existsSync(resolvedEnvFilePath)) {
      dotenv.config({ path: resolvedEnvFilePath });
      Logger.debug(`Loaded environment file: ${resolvedEnvFilePath}`);
    }

    this.NODE_ENV = overrides.NODE_ENV ?? process.env.NODE_ENV?.trim() ?? 'development';
    this.PORT = overrides.PORT ?? process.env.PORT;
    this.ALLOWED_ORIGINS = overrides.ALLOWED_ORIGINS ?? process.env.ALLOWED_ORIGINS;
    this.LOG_LEVEL = overrides.LOG_LEVEL ?? process.env.LOG_LEVEL;
    this.TEST_TIMEOUT = overrides.TEST_TIMEOUT ?? parseInt(process.env.TEST_TIMEOUT ?? '10000', 10);
  }
}