import { ConfigModuleOptions } from '@nestjs/config';
import config from '@src/config/config';
import envSchema from '@src/validation/env-schema';
import { getEnvFilePath } from '@src/utils/env-file-path';

export const configModule: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: getEnvFilePath(),
  validationSchema: envSchema,
  load: [() => config], // Ensure this is a plain object
};