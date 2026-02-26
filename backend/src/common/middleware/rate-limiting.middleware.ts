import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from '../services/logger';

export function configureRateLimiting(app: INestApplication, logger: WinstonLogger) {
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
  logger.log(
    `Rate limiting configured: ${isDevelopment ? '999999 requests in dev' : '100 requests in prod'}`
  );
}