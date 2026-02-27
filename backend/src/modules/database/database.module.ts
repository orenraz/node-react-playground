import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const protocol = configService.get<string>('MONGODB_PROTOCOL');
        const user = configService.get<string>('MONGODB_USER');
        const password = configService.get<string>('MONGODB_PASSWORD');
        const host = configService.get<string>('MONGODB_HOST');
        const dbName = configService.get<string>('MONGODB_DB_NAME');
        const options = configService.get<string>('MONGODB_OPTIONS');

        const uri = `${protocol}://${user}:${password}@${host}/${dbName}?${options}`;
        return { uri };
      },
    }),
  ],
})
export class DatabaseModule {}
