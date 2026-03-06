import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { MongoTestConfig } from '../../../setup/mongo-test-config';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(30000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MongoTestConfig.createTestDatabaseConnection()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    await MongoTestConfig.disconnectTestDb();
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

    const response = await request(app.getHttpServer()).post('/users').send(createUserDto).expect(201);
    expect(response.body).toMatchObject(createUserDto);
  });
});