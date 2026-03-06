import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import mongoose from 'mongoose';
import { AppModule } from '../../../src/app.module';
import { MongoTestConfig } from './mongo-test-config';

export async function createE2EApp(): Promise<{ app: INestApplication; mongoose: typeof mongoose }> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, MongoTestConfig.createTestDatabaseConnection()],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return { app, mongoose };
}

export async function closeE2EApp(app: INestApplication) {
  if (app) await app.close();
  await MongoTestConfig.disconnectTestDb();
}
