import { INestApplication } from '@nestjs/common';
import { createApp, closeApp } from '../shared/app-utils';

export abstract class BaseTest {
  protected app!: INestApplication;

  /**
   * Setup the application.
   */
  async setup() {
    const { app } = await createApp();
    this.app = app;
  }

  /**
   * Teardown the application.
   */
  async teardown() {
    await closeApp(this.app);
  }
}