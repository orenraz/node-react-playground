import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../src/app.module';

export abstract class BaseTest {
  protected module?: TestingModule;
  protected app?: INestApplication;

  /**
   * Creates a testing module with the given providers.
   * @param providers - Array of providers for the module.
   */
  async createTestingModule(providers: any[]) {
    this.module = await Test.createTestingModule({
      imports: [AppModule],
      providers,
    }).compile();

    this.app = this.module.createNestApplication();
    await this.app.init();
  }

  /**
   * Clears mocks after each test.
   */
  afterEach() {
    jest.clearAllMocks();
  }

  /**
   * Closes the app after all tests.
   */
  async closeApp() {
    if (this.app) {
      await this.app.close();
    }
  }

  /**
   * Runs before each test to execute app startup logic.
   */
  async beforeEach() {
    // Add app startup logic here
    console.log('App startup logic executed before each test.');
  }

  /**
   * Abstract method to define test-specific setup.
   */
  abstract setup(): Promise<void>;

  /**
   * Abstract method to define test-specific teardown.
   */
  abstract teardown(): Promise<void>;
}