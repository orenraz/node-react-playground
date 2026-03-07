import { ConfigModule } from '@nestjs/config';
import { configModule } from '@src/modules/config/config-module';

export function loadConfig() {
  console.log('Loading configuration...');
  ConfigModule.forRoot(configModule);
  console.log('Configuration loaded successfully.');
}