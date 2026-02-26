import { Logger } from '@nestjs/common';

const logger = new Logger('MongoUriBuilder');

export class MongoUriBuilder {
  static protocol = process.env.MONGODB_PROTOCOL;
  static user = process.env.MONGODB_USER;
  static password = process.env.MONGODB_PASSWORD;
  static host = process.env.MONGODB_HOST;
  static dbName = process.env.MONGODB_DB_NAME;
  static options = process.env.MONGODB_OPTIONS;

  static buildUri(): string {
    // Validate required properties
    const missingProperties = [];
    if (!this.protocol) missingProperties.push('MONGODB_PROTOCOL');
    if (!this.user) missingProperties.push('MONGODB_USER');
    if (!this.password) missingProperties.push('MONGODB_PASSWORD');
    if (!this.host) missingProperties.push('MONGODB_HOST');
    if (!this.dbName) missingProperties.push('MONGODB_DB_NAME');

    if (missingProperties.length > 0) {
      throw new Error(`Missing required MongoDB configuration values: ${missingProperties.join(', ')}`);
    }

    // URL-encode user and password
    const encodedUser = encodeURIComponent(this.user);
    const encodedPassword = encodeURIComponent(this.password);

    // Sanitize options
    const sanitizedOptions = this.options?.replace(/useNewUrlParser|useUnifiedTopology/g, '') || '';

    // Construct and return the URI
    const constructedUri = `${this.protocol}://${encodedUser}:${encodedPassword}@${this.host}/${this.dbName}`;
    const finalUri = sanitizedOptions ? `${constructedUri}?${sanitizedOptions}` : constructedUri;
    logger.debug(`Constructed MongoDB URI: ${finalUri}`);

    // Return the URI
    return finalUri;
  }
}
