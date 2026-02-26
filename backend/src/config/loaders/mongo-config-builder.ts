import dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { envVars } from '../config';

dotenv.config();

const logger = new Logger('MongoConfigBuilder');

export class MongoConfigBuilder {
  static buildConnectionString(): string {
    const { protocol, user, password, host, dbName } = envVars;

    const sanitizedOptions = process.env.MONGODB_OPTIONS?.replace(/useNewUrlParser|useUnifiedTopology/g, '') || '';
    return `${protocol}://${user}:${password}@${host}/${dbName}?${sanitizedOptions}`;
  }
}