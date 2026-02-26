import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/schema';
import { loadConfig } from './common/utils/config-builder';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { GreetController } from './modules/greet/greet.controller';
import { GreetService } from './modules/greet/greet.service';
import { InfoController } from './modules/info/info.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { Logger } from '@nestjs/common';
import { GreetModule } from './modules/greet/greet.module';

const logger = new Logger('AppModule');
logger.debug(`NODE_ENV at startup: ${process.env.NODE_ENV}`);
logger.debug(`Attempting to load configuration for environment: ${process.env.NODE_ENV || 'development'}`);

let config: any;
(async () => {
  config = await loadConfig();
  process.env.NODE_ENV = process.env.NODE_ENV?.trim(); 
  logger.debug(`Loaded configuration: ${JSON.stringify(config)}`);
  const envFilePath = `${__dirname}/../.env.${config?.NODE_ENV || 'development'}`;
  logger.debug(`Resolved envFilePath: ${envFilePath}`);
  logger.debug(`NODE_ENV value: ${process.env.NODE_ENV}`);
})();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../.env.${config?.NODE_ENV || 'development'}`,
      validationSchema,
      load: [() => config],
    }),
    UserModule, // Add UserModule to imports
    DatabaseModule, // Add DatabaseModule to imports
    GreetModule, // Import GreetModule to provide GreetService
  ],
  controllers: [GreetController, InfoController, AppController, UserController],
  providers: [AppService], 
})
export class AppModule {}
