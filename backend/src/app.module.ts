import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '@src/config/config';
import envSchema from '@src/validation/env-schema';
import { UserModule } from '@src/modules/user/user.module';
import { DatabaseModule } from '@src/modules/database/database.module';
import { InfoController } from '@src/modules/info/info.controller';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { UserController } from '@src/modules/user/user.controller';
import { UserService } from '@src/modules/user/user.service';
import { getEnvFilePath } from '@src/utils/env-file-path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      validationSchema: envSchema,
      load: [() => config], // Ensure this is a plain object
    }),
    UserModule,
    DatabaseModule,
  ],
  controllers: [InfoController, AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
