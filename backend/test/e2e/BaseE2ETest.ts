import { INestApplication } from '@nestjs/common';
import { createApp, closeApp } from '../shared/app-utils';
import { connectTestDb, disconnectTestDb } from '../shared/db-utils';
import { loadEnv } from '../shared/env-loader';

export abstract class BaseE2ETest {
  protected app!: INestApplication;

  /**
   * Setup the application and database connection.
   */
  async setup() {
    const env = loadEnv();
    await connectTestDb(env.MONGODB_URI!);

    const { app } = await createApp();
    this.app = app;
  }

  /**
   * Teardown the application and database connection.
   */
  async teardown() {
    await closeApp(this.app);
    await disconnectTestDb();
  }
}