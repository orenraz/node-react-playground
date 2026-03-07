import { MongoClient } from 'mongodb';
import logger from '@src/common/services/logger';
import Config from '@src/config/config';

export async function connectToMongoDB() {
  const config = Config; // Access the singleton instance
  console.log('config : ', config);
  const MONGO_URI = config.mongodb.URI;
  const DATABASE_NAME = config.mongodb.DB_NAME;

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  logger.info('MongoClient connected to MongoDB.');

  return { client, db: client.db(DATABASE_NAME) };
}
