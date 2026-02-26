import { INestApplication, ValidationPipe } from '@nestjs/common';
import { WinstonLogger } from '../services/logger';

export function configureValidationPipe(app: INestApplication, logger: WinstonLogger) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  logger.log('Global validation pipe configured');
}