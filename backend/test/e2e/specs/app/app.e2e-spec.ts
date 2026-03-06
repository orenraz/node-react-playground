import { BaseE2ETest } from '../../setup/common/BaseE2ETest';
import request from 'supertest';

describe('App Module (e2e)', () => {
  class AppE2ETest extends BaseE2ETest {}

  const test = new AppE2ETest();

  beforeAll(async () => {
    jest.setTimeout(30000);
    await test.setup();
  });

  afterEach(async () => {
  });

  afterAll(async () => {
    await test.teardown();
  });

  it('/users (POST) should create a user', async () => {
    const uniqueUserId = `test_${Date.now()}`;
    const createUserDto = {
      userId: uniqueUserId,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      gender: 'male',
    };

    const response = await request(test.getApp().getHttpServer()).post('/users').send(createUserDto).expect(201);
    expect(response.body).toMatchObject(createUserDto);
  });
});
