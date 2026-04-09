import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import mongoose from 'mongoose';

/**
 * Centralized setup for e2e tests: bootstraps Nest app and connects to DB.
 */
export async function setupE2EApp(): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleFixture.createNestApplication();
  await app.init();
  // Optionally connect mongoose if not handled by AppModule
  // await mongoose.connect(process.env.MONGODB_URI!);
  return app;
}

/**
 * Centralized teardown for e2e tests: disconnects DB and closes app.
 */
export async function teardownE2EApp(app: INestApplication) {
  await app.close();
  // Optionally disconnect mongoose if not handled by AppModule
  // await mongoose.disconnect();
}
