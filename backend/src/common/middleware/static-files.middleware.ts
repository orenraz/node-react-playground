import { INestApplication } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import { WinstonLogger } from '../logger';

export function configureStaticFiles(app: INestApplication, logger: WinstonLogger) {
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  logger.log('Static file serving configured for /uploads');

  app.use('/public', express.static(join(__dirname, '..', 'public')));
  logger.log('Static file serving configured for /public');
}