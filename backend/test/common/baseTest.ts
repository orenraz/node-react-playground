import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { loadConfig } from '../config/config-loader';

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
    return this.getApp();
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
      this.config = loadConfig();
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
