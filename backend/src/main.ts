import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from './common/logger';
import { join } from 'path';
import * as express from 'express';
import 'reflect-metadata';
console.log('Reflect-metadata loaded at runtime');
console.log('Reflect object:', Reflect);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {  });
  const logger = new WinstonLogger();
  app.useLogger(logger);

  logger.log('Initializing application...');

  // Serve static files for uploads and public assets
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  logger.log('Static file serving configured for /uploads');

  app.use('/public', express.static(join(__dirname, '..', 'public')));
  logger.log('Static file serving configured for /public');

  // Security headers
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow images to be loaded
  }));
  logger.log('Security headers configured');

  // Rate limiting configuration
  const rateLimit = require('express-rate-limit');
  const configService = app.get(ConfigService);
  const isDevelopment = configService.get<string>('NODE_ENV') === 'development';

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: isDevelopment ? 999999 : 100, // 999999 requests in dev, 100 in prod
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
  logger.log(`Rate limiting configured: ${isDevelopment ? '999999 requests in dev' : '100 requests in prod'}`);

  // Global validation pipe (uses class-validator + class-transformer)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true }
    })
  );
  logger.log('Global validation pipe configured');

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3030;
  const allowedOrigins = config.get<string>('ALLOWED_ORIGINS');

  // Enable CORS based on config (comma-separated origins) or allow all in dev
  if (allowedOrigins) {
    const origins = allowedOrigins.split(',').map((s) => s.trim());
    app.enableCors({ origin: origins });
    logger.log(`CORS enabled for origins: ${origins}`);
  } else {
    app.enableCors({ origin: true });
    logger.log('CORS enabled for all origins');
  }

  // Enable shutdown hooks and graceful shutdown
  app.enableShutdownHooks();
  logger.log('Shutdown hooks enabled');

  await app.listen(port, () => {
    logger.log(`Backend listening on http://localhost:${port}`);
  });
}

bootstrap();
