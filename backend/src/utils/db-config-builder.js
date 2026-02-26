const config = require(`../config/config.${process.env.NODE_ENV || 'development'}`);

class DbConfigBuilder {
  static buildConnectionString() {
    const { MONGODB_PROTOCOL, MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DB_NAME, MONGODB_OPTIONS } = config;

    // TODO: Remove sensitive logs before deploying to production
    console.log('MongoDB Configuration:', {
      MONGODB_PROTOCOL,
      MONGODB_USER,
      MONGODB_PASSWORD,
      MONGODB_HOST,
      MONGODB_DB_NAME,
      MONGODB_OPTIONS,
    });

    if (!MONGODB_PROTOCOL || !MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_HOST || !MONGODB_DB_NAME) {
      throw new Error('Missing required MongoDB configuration');
    }

    return `${MONGODB_PROTOCOL}://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB_NAME}?${MONGODB_OPTIONS}`;
  }
}

module.exports = DbConfigBuilder;