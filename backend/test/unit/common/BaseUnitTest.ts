import BaseTest from '../../common/baseTest';

export class BaseUnitTest extends BaseTest {
  public async beforeAll() {
    await super.beforeAll();
  }

  public async beforeEach() {
    await super.beforeEach();
  }

  public async afterAll() {
    await super.afterAll();
  }

  public afterEach() {
    super.afterEach();
    jest.clearAllMocks();
  }
}