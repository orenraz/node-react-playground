import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModule } from '@src/modules/config/config-module';
import { UserModule } from '@src/modules/user/user.module';
import { DatabaseModule } from '@src/modules/database/database.module';
import { InfoController } from '@src/modules/info/info.controller';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { UserController } from '@src/modules/user/user.controller';
import { UserService } from '@src/modules/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    UserModule,
    DatabaseModule,
  ],
  controllers: [InfoController, AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
