import BaseTest from '@root/test/common/baseTest';
import { connectTestDb, disconnectTestDb } from '../shared/db-utils';

export class BaseE2ETest extends BaseTest {

  public async beforeAll() {
    await super.beforeAll();
    await connectTestDb(this.config?.MONGODB_URI);
  }

  public async afterAll() {
    await super.afterAll();
    await disconnectTestDb();
  }

  public async beforeEach() {
    await super.beforeEach();
  }

  public afterEach() {
    super.afterEach();
  }

  public getApp() {
    return this.getApp();
  }
}
