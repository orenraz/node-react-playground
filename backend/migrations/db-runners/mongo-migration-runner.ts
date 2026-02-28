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
  // Also connect mongoose so migration scripts that use `mongoose.connection`
  // have a valid connection and can access `mongoose.connection.db`.
  try {
    await mongoose.connect(MONGO_URI, { dbName: DATABASE_NAME });
    console.log('Mongoose connected for migrations.');
  } catch (err) {
    console.warn('Failed to connect mongoose (migrations may still work if they use native driver):', err);
  }

  console.log('Listing all collections in the database...');
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));

  if (!collections.some(c => c.name === MIGRATIONS_COLLECTION)) {
    console.log(`Creating migrations collection: ${MIGRATIONS_COLLECTION}`);
    await db.createCollection(MIGRATIONS_COLLECTION);
  } else {
    console.log(`Migrations collection already exists: ${MIGRATIONS_COLLECTION}`);
  }

  const migrationScriptsPath = path.resolve(__dirname, '../mongodb/scripts/*.js');
  console.log('Migration scripts folder path:', migrationScriptsPath);
  const migrationFiles = glob.sync(migrationScriptsPath);
  console.log('Migration files detected by glob:', migrationFiles);

  const migrationDefs = migrationFiles.map((filePath: string) => {
    // Use a stable migration name without file extension so storage keys match
    // what Umzug expects and avoid mismatches between runs.
    const name = path.basename(filePath, path.extname(filePath));
    return {
      name,
      path: filePath,
      up: async () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require(filePath);
        if (mod && typeof mod.up === 'function') {
          return mod.up();
        }
      },
      down: async () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require(filePath);
        if (mod && typeof mod.down === 'function') {
          return mod.down();
        }
      },
    };
  });

  const umzug = new Umzug({
    migrations: migrationDefs,
    context: db,
    storage: new MongoDBStorage({
      collection: db.collection(MIGRATIONS_COLLECTION),
    }),
    logger: {
      info: console.log,
      warn: console.warn,
      error: console.error,
      debug: console.log,
    },
  });

  console.log('Verifying Umzug configuration...');
  console.log('Using migrations collection:', MIGRATIONS_COLLECTION);
  console.log('Database name:', DATABASE_NAME);

  // Diagnostic: list migrations Umzug resolves
  const resolvedMigrations = await (umzug as any).migrations();
  console.log('Umzug resolved migrations:', resolvedMigrations.map((m: any) => ({ name: m.name, path: m.path || m.file }))); 

  try {
    const executedMigrations = await umzug.executed();
    console.log('Previously Executed migrations:', executedMigrations.map(m => m.name));

    const pendingMigrations = await umzug.pending();
    console.log('Pending migrations:', pendingMigrations.map(m => m.name));

    if (pendingMigrations.length > 0) {
      console.log(`Executing pending migrations...`);
      const results = await umzug.up();
      console.log('Migrations executed successfully:', results.map(m => m.name));
    } else {
      console.log('No pending migrations to execute.');
    }
  } catch (error) {
    console.error('Error during migration execution:', error);
  } finally {
    try {
      await mongoose.disconnect();
      console.log('Mongoose disconnected.');
    } catch (err) {
      console.warn('Error disconnecting mongoose:', err);
    }
    await client.close();
    console.log('MongoDB connection closed.');
  }
})();