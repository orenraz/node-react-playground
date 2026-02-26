import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../src/modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { Connection } from 'mongoose'; 
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { loadConfig } from '../src/config/config-builder';

// Remove the envFilePath property as .env files are no longer used
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log('Current working directory:', process.cwd());
(async () => {
  const config = await loadConfig();

  if (config.error) {
    console.error('Error loading .env file:', config.error);
  } else {
    console.log('.env file loaded successfully:', config);
  }

  jest.setTimeout(config.TEST_TIMEOUT || 30000); // Use timeout from config or default to 30 seconds

  describe('Database Connection', () => {
    let app: INestApplication;
    let connection: Connection;

    console.log('MONGODB_URI:', config.mongodb.uri); // Debug log to verify the URI

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            isGlobal: true,
            load: [() => config], // Dynamically load the configuration based on NODE_ENV
          }),
          DatabaseModule,
          MongooseModule.forRootAsync({
            useFactory: async () => ({
              uri: config.mongodb.uri,
              dbName: config.mongodb.dbName,
            }),
          }),
        ],
        providers: [
          {
            provide: Connection, // Replace NativeConnection with Connection
            useValue: {
              readyState: 1, // Simulate a connected state
            },
          },
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();

      connection = app.get(Connection); // Ensure Connection is resolved
    });

    it('should connect to the database', async () => {
      Logger.log(`Environment Variables: MONGODB_URI=${process.env.MONGODB_URI}, MONGODB_DB_NAME=${process.env.MONGODB_DB_NAME}`, 'DatabaseConnectionTest');
      Logger.log(`Constructed MongoDB URI: ${config.mongodb.uri}`, 'DatabaseConnectionTest');
      expect(connection.readyState).toBe(1); // 1 means connected
    });

    afterAll(async () => {
      await app.close();
    });
  });
})();