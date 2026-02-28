import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import config from '../../src/config/config';
import { MongoClient } from 'mongodb';
import { Umzug, MongoDBStorage } from 'umzug';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.development') });

const MONGO_URI = config.mongodb.uri;
const DATABASE_NAME = config.mongodb.dbName; // Dynamically fetch the database name from the environment-specific config
const MIGRATIONS_COLLECTION = 'migrations';

console.log(`Using MongoDB connection string: ${MONGO_URI}`);

(async () => {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DATABASE_NAME);

  console.log('Listing all collections in the database...');
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));

  const umzug = new Umzug({
    migrations: {
      glob: path.join(__dirname, '../mongodb/scripts/*.js'),
    },
    context: db,
    storage: new MongoDBStorage({
      collection: db.collection(MIGRATIONS_COLLECTION),
    }),
    logger: console,
  });

  const pendingMigrations = await umzug.pending();
  console.log('Pending Migrations:', pendingMigrations);

  try {
    console.log('Running migrations...');
    await umzug.up();
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await client.close();
  }
})();