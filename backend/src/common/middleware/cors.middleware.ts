import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from '../services/logger';

export function configureCors(app: INestApplication, logger: WinstonLogger) {
  const configService = app.get(ConfigService);
  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS');

  if (allowedOrigins) {
    const origins = allowedOrigins.split(',').map((s) => s.trim());
    app.enableCors({ origin: origins });
    logger.log(`CORS enabled for origins: ${origins}`);
  } else {
    app.enableCors({ origin: true });
    logger.log('CORS enabled for all origins');
  }
}