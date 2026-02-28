import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import config from '../../src/config/config';
import { MongoClient } from 'mongodb';
import { Umzug, MongoDBStorage } from 'umzug';
const glob = require('glob');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.development') });

const MONGO_URI = config.mongodb.uri;
const DATABASE_NAME = config.mongodb?.dbName || process.env.DATABASE_NAME;
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

  console.log('Ensuring migrations collection exists...');
  const migrationsCollectionExists = collections.some(c => c.name === MIGRATIONS_COLLECTION);
  if (!migrationsCollectionExists) {
    console.log(`Creating migrations collection: ${MIGRATIONS_COLLECTION}`);
    await db.createCollection(MIGRATIONS_COLLECTION);
  } else {
    console.log(`Migrations collection already exists: ${MIGRATIONS_COLLECTION}`);
  }

  console.log('Inspecting migrations collection contents...');
  const migrations = await db.collection(MIGRATIONS_COLLECTION).find().toArray();
  console.log('Migrations collection contents:', migrations);

  const migrationScriptsPath = path.join(__dirname, '../mongodb/scripts/*.js');
  console.log('Corrected migration scripts folder path:', migrationScriptsPath);

  const migrationFiles = glob.sync(migrationScriptsPath);
  console.log('Migration files detected by glob:', migrationFiles);

  const umzug = new Umzug({
    migrations: {
      glob: migrationScriptsPath,
    },
    context: db,
    storage: new MongoDBStorage({
      collection: db.collection(MIGRATIONS_COLLECTION),
    }),
    logger: {
      info: console.log,
      warn: console.warn,
      error: console.error,
      debug: console.log, // Use this for detailed logging
    },
  });

  console.log('Verifying Umzug configuration...');
  console.log('Using migrations collection:', MIGRATIONS_COLLECTION);
  console.log('Database name:', DATABASE_NAME);

  try {
    console.log('Forcing migration execution...');
    const executedMigrations = await umzug.up();
    console.log('Executed Migrations:', executedMigrations);
  } catch (error) {
    console.error('Error during forced migration execution:', error);
  }

  const pendingMigrations = await umzug.pending();
  console.log('Detected Pending Migrations:', pendingMigrations.map(m => m.name));

  console.log('Starting migration execution...');
  const executedMigrations = await umzug.executed();
  console.log('Executed migrations:', executedMigrations);

  await umzug.up();
  console.log('Migrations executed successfully.');
  await client.close();
})();