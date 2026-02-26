import dotenv from 'dotenv';

dotenv.config();

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

    if (!MONGODB_PROTOCOL || !MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_HOST || !MONGODB_DB_NAME) {
      throw new Error('Missing required MongoDB configuration');
    }

    return `${MONGODB_PROTOCOL}://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB_NAME}?${MONGODB_OPTIONS}`;
  }
}