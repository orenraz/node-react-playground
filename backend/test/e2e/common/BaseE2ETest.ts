import BaseTest from '@test/common/baseTest';
import mongoose from 'mongoose';

export class BaseE2ETest extends BaseTest {
  public async beforeAll() {
    await super.beforeAll();
    await mongoose.connect(this.config?.mongodb?.URI);
  }

  public async afterAll() {
    await super.afterAll();
    await mongoose.disconnect();
  }

  public async beforeEach() {
    await super.beforeEach();
  }

  public afterEach() {
    super.afterEach();
  }

  get app() {
    return this.getApp();
  }
}
