import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from './common/services/logger';
import { join } from 'path';
import * as express from 'express';
import 'reflect-metadata';
console.log('Reflect-metadata loaded at runtime');
console.log('Reflect object:', Reflect);

// TODO: check if i should refactor and exatract some of the setup logic to separate files for better organization and testability
import { configureStaticFiles } from './common/middleware/static-files.middleware';
import { configureSecurityHeaders } from './common/middleware/security-headers.middleware';
import { configureRateLimiting } from './common/middleware/rate-limiting.middleware';
import { configureValidationPipe } from './common/pipes/validation.pipe';
import { configureCors } from './common/middleware/cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {  });
  const logger = new WinstonLogger();
  app.useLogger(logger);

  logger.log('Initializing application...');

  // Modularized setup logic
  configureStaticFiles(app, logger);
  configureSecurityHeaders(app, logger);
  configureRateLimiting(app, logger);
  configureValidationPipe(app, logger);
  configureCors(app, logger);

  // Enable shutdown hooks and graceful shutdown
  app.enableShutdownHooks();
  logger.log('Shutdown hooks enabled');

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3030;
  await app.listen(port, () => {
    logger.log(`Backend listening on http://localhost:${port}`);
  });
}

bootstrap();
