import { ConfigModule } from '@nestjs/config';
import { configModule } from '@src/modules/config/config-module';
import config from '@src/config/config';

export function getConfig() {
  return config;
}

export function loadConfig() {
  console.log('Loading configuration...');
  ConfigModule.forRoot(configModule);

  return getConfig();
}