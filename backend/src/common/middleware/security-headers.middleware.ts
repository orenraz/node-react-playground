import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { WinstonLogger } from '../logger';

export function configureSecurityHeaders(app: INestApplication, logger: WinstonLogger) {
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow images to be loaded
    })
  );
  logger.log('Security headers configured');
}