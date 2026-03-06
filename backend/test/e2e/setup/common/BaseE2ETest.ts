import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { AppModule } from '../../../../src/app.module';
import { MongoTestConfig } from '../mongo-test-config';

export abstract class BaseE2ETest {
  protected app!: INestApplication;
  protected module!: TestingModule;
  protected mongoose!: typeof mongoose;

  /**
   * Setup the application and database connection.
   */
  async setup() {
    this.module = await Test.createTestingModule({
      imports: [AppModule, MongoTestConfig.createTestDatabaseConnection()],
    }).compile();

    this.app = this.module.createNestApplication();
    await this.app.init();

    this.mongoose = mongoose;
  }

  /**
   * Teardown the application and database connection.
   */
  async teardown() {
    if (this.app) {
      await this.app.close();
    }
    await MongoTestConfig.disconnectTestDb();
  }

  /**
   * Public getter for the app instance.
   */
  public getApp() {
    return this.app;
  }
}