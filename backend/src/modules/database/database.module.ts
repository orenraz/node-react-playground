import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { loadConfig } from '../../common/utils/config-builder';

// Extract MongoDB configuration logic into a separate function for clarity
function getMongoConfig(configService: ConfigService) {
  const mongoUri = configService.get<string>('MONGODB_URI');
  const mongoUser = configService.get<string>('MONGODB_USER');
  const mongoPassword = configService.get<string>('MONGODB_PASSWORD');
  const mongoHost = configService.get<string>('MONGODB_HOST');

  if (!mongoUser || !mongoPassword || !mongoHost) {
    throw new Error('Missing required MongoDB configuration: MONGODB_USER, MONGODB_PASSWORD, or MONGODB_HOST');
  }

  const maxPoolSize = configService.get<number>('MONGODB_MAX_POOL_SIZE') || 10;
  const minPoolSize = configService.get<number>('MONGODB_MIN_POOL_SIZE') || 1;
  const connectTimeoutMS = configService.get<number>('MONGODB_CONNECT_TIMEOUT_MS') || 30000;
  const socketTimeoutMS = configService.get<number>('MONGODB_SOCKET_TIMEOUT_MS') || 30000;
  const useNewUrlParser = configService.get<boolean>('MONGODB_USE_NEW_URL_PARSER');
  const useUnifiedTopology = configService.get<boolean>('MONGODB_USE_UNIFIED_TOPOLOGY');
  const retryWrites = configService.get<boolean>('MONGODB_RETRY_WRITES') || true;
  const retryReads = configService.get<boolean>('MONGODB_RETRY_READS') || true;
  const w = configService.get<'majority' | number>('MONGODB_WRITE_CONCERN') || 'majority';

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in the configuration');
  }

  return {
    uri: mongoUri,
    retryWrites,
    retryReads,
    w,
    connectionFactory: (connection) => {
      connection.set('maxPoolSize', maxPoolSize);
      connection.set('minPoolSize', minPoolSize);
      connection.set('connectTimeoutMS', connectTimeoutMS);
      connection.set('socketTimeoutMS', socketTimeoutMS);
      return connection;
    },
  };
}

const config = loadConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
  ],
})
export class DatabaseModule {}
