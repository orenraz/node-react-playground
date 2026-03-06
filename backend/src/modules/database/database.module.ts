import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config from '../../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const { uri } = config.mongodb;
        return { uri };
      },
    }),
  ],
})
export class DatabaseModule {}
