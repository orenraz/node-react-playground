import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GreetModule } from '../../../src/modules/greet/greet.module';
import { GreetService } from '../../../src/modules/greet/greet.service';

describe('GreetModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [GreetModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Clear the greetings array to ensure a clean state
    const greetService = app.get(GreetService);
    greetService['greetings'] = [];
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await app.init();
    const greetService = app.get<GreetService>(GreetService);
    greetService.clearGreetings(); // Ensure the greetings array is cleared
  });

  it('/greet (POST)', () => {
    return request(app.getHttpServer())
      .post('/greet')
      .send({ name: 'Test', message: 'Hello, Test!' })
      .expect(201)
      .expect({ id: '1', name: 'Test', message: 'Hello, Test!' });
  });

  it('/greet (GET)', () => {
    return request(app.getHttpServer())
      .get('/greet')
      .expect(200)
      .expect([]);
  });

  it('/greet/:id (GET)', async () => {
    // Create a greeting first
    await request(app.getHttpServer())
      .post('/greet')
      .send({ name: 'Test', message: 'Hello, Test!' })
      .expect(201);

    // Then test the GET endpoint
    return request(app.getHttpServer())
      .get('/greet/1')
      .expect(200)
      .expect({ id: '1', name: 'Test', message: 'Hello, Test!' });
  });
});