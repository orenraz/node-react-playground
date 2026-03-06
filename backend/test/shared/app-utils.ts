import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

/**
 * Utility to create and initialize the NestJS application.
 */
export async function createApp(): Promise<{ app: INestApplication; module: TestingModule }> {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  return { app, module };
}

/**
 * Utility to close the NestJS application.
 */
export async function closeApp(app: INestApplication) {
  if (app) {
    await app.close();
  }
}