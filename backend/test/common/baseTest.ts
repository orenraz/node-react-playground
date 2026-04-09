import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';

export class BaseTest {
  module?: TestingModule = undefined;
  appInstance?: INestApplication = undefined;
  config?: Record<string, any> = undefined;

  // Public lifecycle hooks for Jest
  public async beforeAll() {
    await this.setupApp();
  }

  public async afterAll() {
    await this.teardownApp();
  }

  public async beforeEach() {
    // Override for per-test setup if needed
  }

  public afterEach() {
    // Override for per-test teardown if needed
  }

  // Private setup/teardown
  protected async setupApp(): Promise<INestApplication> {
    if (this.appInstance) {
      return this.appInstance;
    }

    await this.initializeApp();
    // getApp() can return undefined, but after initializeApp it should be set
    const app = this.getApp();
    if (!app) {
      throw new Error('Nest application failed to initialize');
    }
    return app;
  }

  protected async initializeApp() {
    // Load environment config before app initialization
    this.loadConfigIfNeeded();

    // Initialize app
    const module = await this.createTestingModule();
    const app = await this.createNestApp(module);
    this.module = module;
    this.appInstance = app;
  }

  // Private function to create TestingModule
  private async createTestingModule(): Promise<TestingModule> {
    return await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  }

  protected async teardownApp() {
    if (this.appInstance) {
      await this.appInstance.close();
      this.appInstance = undefined;
    }
  }

  // Public getter for app instance
  public getApp(): INestApplication | undefined {
    return this.appInstance;
  }

  // Private config loader
  private loadConfigIfNeeded() {
    if (!this.config) {
      const testType = process.env.TEST_TYPE;
      if (testType === 'e2e') {
        this.config = require('../e2e/config/e2e-config').e2eConfig();
      } else if (testType === 'unit') {
        this.config = require('../unit/config/unit-config').unitConfig();
      } else {
        throw new Error('Config missing or TEST_TYPE not recognized. Set TEST_TYPE=unit or TEST_TYPE=e2e in your test script.');
      }
    }
  }

  // Private function to create Nest app
  private async createNestApp(module: TestingModule): Promise<INestApplication> {
    const app = module.createNestApplication();
    await app.init();
    return app;
  }
}

export default BaseTest;
