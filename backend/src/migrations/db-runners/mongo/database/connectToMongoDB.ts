import { MongoClient } from 'mongodb';
import logger from '@src/common/services/logger';
import Config from '@src/config/config';

export async function connectToMongoDB() {
  const config = Config; // Access the singleton instance
  const MONGO_URI = config.mongodb.uri;
  const DATABASE_NAME = config.mongodb.dbName;

  logger.info('Connecting to MongoDB using MongoClient...');
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  logger.info('MongoClient connected to MongoDB.');

  return { client, db: client.db(DATABASE_NAME) };
}

// Mongoose connection is managed centrally in DatabaseModule.
// If additional Mongoose-specific logic is needed, consider extending DatabaseModule.