import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const TEST_DB_URI = configService.get<string>('mongodb.uri');

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(30000); // Increase timeout to 30 seconds
    console.log('Starting beforeAll hook...');

    console.log('Connecting to database...');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(TEST_DB_URI),
      ],
    }).compile();
    console.log('Database connection established.');

    console.log('Initializing application...');
    app = moduleFixture.createNestApplication();
    await app.init();
    console.log('Application initialized successfully.');
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/users (POST) should create a user', async () => {
    const uniqueUserId = `test_${Date.now()}`; // Generate a unique userId
    const createUserDto = {
      userId: uniqueUserId,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      gender: 'male',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    expect(response.body).toMatchObject(createUserDto);
  });
});