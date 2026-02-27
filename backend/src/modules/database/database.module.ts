import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { validateSchema } from '../../utils/validate-env';
import { mongoSchema } from './index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const validatedMongoConfig = validateSchema(mongoSchema);
        const { MONGODB_PROTOCOL, MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DB_NAME } = validatedMongoConfig;

        const uri = `${MONGODB_PROTOCOL}://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB_NAME}`;
        return { uri };
      },
    }),
  ],
})
export class DatabaseModule {}
