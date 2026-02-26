import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';

describe('Production Configuration (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const configService = new ConfigService();
    const PROD_DB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB_NAME}?${process.env.MONGODB_OPTIONS || ''}`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(PROD_DB_URI),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should connect to the production database', async () => {
    expect(app).toBeDefined();
  });
});