import 'tsconfig-paths/register';

// Ensure this is the first import to enable path alias resolution
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from '@src/common/services/logger';
import 'reflect-metadata';
import path from 'path';

console.log('--- DEBUG ALIAS RESOLUTION ---');
console.log('process.cwd():', process.cwd());
console.log('__dirname:', __dirname);
console.log('process.argv:', process.argv);
console.log('Tracing @root alias resolution in debug mode:');
console.log('Resolved @root to:', path.resolve('@root'));

// TODO: check if i should refactor and exatract some of the setup logic to separate files for better organization and testability
import { configureStaticFiles } from '@src/common/middleware/static-files.middleware';
import { configureSecurityHeaders } from '@src/common/middleware/security-headers.middleware';
import { configureRateLimiting } from '@src/common/middleware/rate-limiting.middleware';
import { configureValidationPipe } from '@src/common/pipes/validation.pipe';
import { configureCors } from '@src/common/middleware/cors.middleware';
import { GlobalExceptionFilter } from '@src/common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {  });
  const logger = new WinstonLogger();
  app.useLogger(logger);

  app.useGlobalFilters(new GlobalExceptionFilter());
  logger.log('Global exception filter applied.');

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
