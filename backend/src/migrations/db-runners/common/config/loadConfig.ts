import { ConfigModule } from '@nestjs/config';
import { configModule } from '@src/modules/config/config-module';

export function loadConfig() {
  ConfigModule.forRoot(configModule);
  console.log('Configuration loaded successfully.');
}