import dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

const logger = new Logger('MongoConfigBuilder');

export class MongoConfigBuilder {
  static buildConnectionString(): string {
    const {
      MONGODB_PROTOCOL,
      MONGODB_USER,
      MONGODB_PASSWORD,
      MONGODB_HOST,
      MONGODB_DB_NAME,
      MONGODB_OPTIONS,
    } = process.env;

    // Validate required properties
    const missingProperties = [];
    if (!MONGODB_PROTOCOL) missingProperties.push('MONGODB_PROTOCOL');
    if (!MONGODB_USER) missingProperties.push('MONGODB_USER');
    if (!MONGODB_PASSWORD) missingProperties.push('MONGODB_PASSWORD');
    if (!MONGODB_HOST) missingProperties.push('MONGODB_HOST');
    if (!MONGODB_DB_NAME) missingProperties.push('MONGODB_DB_NAME');

    if (missingProperties.length > 0) {
      throw new Error(`Missing required MongoDB configuration values: ${missingProperties.join(', ')}`);
    }

    // URL-encode user and password
    const encodedUser = encodeURIComponent(MONGODB_USER);
    const encodedPassword = encodeURIComponent(MONGODB_PASSWORD);

    // Sanitize options
    const sanitizedOptions = MONGODB_OPTIONS?.replace(/useNewUrlParser|useUnifiedTopology/g, '') || '';

    // Construct and return the URI
    const constructedUri = `${MONGODB_PROTOCOL}://${encodedUser}:${encodedPassword}@${MONGODB_HOST}/${MONGODB_DB_NAME}`;
    const finalUri = sanitizedOptions ? `${constructedUri}?${sanitizedOptions}` : constructedUri;
    logger.debug(`Constructed MongoDB URI: ${finalUri}`);

    return finalUri;
  }
}