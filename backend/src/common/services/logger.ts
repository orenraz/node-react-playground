import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `${timestamp} [${level.toUpperCase()}] ${message} - ${stack}`
        : `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  defaultMeta: { service: process.env.npm_package_name || 'backend' },
  transports: [new winston.transports.Console()]
});

export class WinstonLogger implements LoggerService {
  log(message: string, ...meta: any[]) {
    logger.info(message, ...meta);
  }
  error(message: string, ...meta: any[]) {
    logger.error(message, ...meta);
  }
  warn(message: string, ...meta: any[]) {
    logger.warn(message, ...meta);
  }
  debug?(message: string, ...meta: any[]) {
    logger.debug(message, ...meta);
  }
}

export default logger;
