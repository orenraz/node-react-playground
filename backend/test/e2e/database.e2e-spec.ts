import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../../src/app.module';
import * as dotenv from 'dotenv';

const configService = new ConfigService();
const TEST_DB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB_NAME}?${process.env.MONGODB_OPTIONS || ''}`;
Logger.log(`Dynamically constructed MongoDB URI: ${TEST_DB_URI}`, 'DatabaseE2ETest');

describe('Database Connection (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    // Ensure MongooseModule is properly configured
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(TEST_DB_URI),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Verify if the connection is established
    try {
      connection = moduleFixture.get<Connection>('DatabaseConnection');
      Logger.log(`Connection readyState: ${connection?.readyState}`, 'DatabaseE2ETest');
    } catch (error) {
      Logger.error('Failed to retrieve connection:', error, 'DatabaseE2ETest');
    }
  });

  it('should connect to the database successfully', async () => {
    expect(connection.readyState).toBe(1); // 1 means connected
  });

  afterAll(async () => {
    await app.close();
  });
});