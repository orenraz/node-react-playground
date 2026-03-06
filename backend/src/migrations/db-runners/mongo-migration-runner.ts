import mongoose from 'mongoose';
import config from '@src/config/config';
import { MongoClient } from 'mongodb';
import { Umzug, MongoDBStorage } from 'umzug';
import path from 'path';
import dotenv from 'dotenv';
const glob = require('glob');
import { getEnvFilePath } from '@src/utils/env-file-path';
import tsConfigPaths from 'tsconfig-paths';

function loadConfig() {
  const envFilePath = getEnvFilePath();
  dotenv.config({ path: envFilePath });
  console.log(`Loaded environment configuration from: ${envFilePath}`);
}

async function connectToMongoDB() {
  const MONGO_URI = config.mongodb.uri;
  const DATABASE_NAME = config.mongodb.dbName;

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('MongoDB connected.');

  return { client, db: client.db(DATABASE_NAME) };
}

async function setupMigrations(db) {
  const MIGRATIONS_COLLECTION = 'migrations';
  const collections = await db.listCollections().toArray();

  if (!collections.some(c => c.name === MIGRATIONS_COLLECTION)) {
    console.log(`Creating migrations collection: ${MIGRATIONS_COLLECTION}`);
    await db.createCollection(MIGRATIONS_COLLECTION);
  } else {
    console.log(`Migrations collection already exists: ${MIGRATIONS_COLLECTION}`);
  }

  const migrationScriptsPath = path.resolve('@root/migrations/mongodb/scripts/*.js');
  console.log('Migration scripts folder path:', migrationScriptsPath);
  const migrationFiles = glob.sync(migrationScriptsPath);
  console.log('Migration files detected by glob:', migrationFiles);

  const migrationDefs = migrationFiles.map((filePath: string) => {
    const name = path.basename(filePath, path.extname(filePath));
    return {
      name,
      path: filePath,
      up: async () => {
        const mod = require(filePath);
        if (mod && typeof mod.up === 'function') {
          return mod.up();
        }
      },
      down: async () => {
        const mod = require(filePath);
        if (mod && typeof mod.down === 'function') {
          return mod.down();
        }
      },
    };
  });

  return new Umzug({
    migrations: migrationDefs,
    context: db,
    storage: new MongoDBStorage({
      collection: db.collection(MIGRATIONS_COLLECTION),
    }),
    logger: console,
  });
}

async function runMigrations(umzug) {
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
  }
}

async function main() {
  loadConfig();

  const { client, db } = await connectToMongoDB();

  try {
    await mongoose.connect(config.mongodb.uri, { dbName: config.mongodb.dbName });
    console.log('Mongoose connected for migrations.');
  } catch (err) {
    console.warn('Failed to connect mongoose (migrations may still work if they use native driver):', err);
  }

  const umzug = await setupMigrations(db);
  await runMigrations(umzug);

  try {
    await mongoose.disconnect();
    console.log('Mongoose disconnected.');
  } catch (err) {
    console.warn('Error disconnecting mongoose:', err);
  }

  await client.close();
  console.log('MongoDB connection closed.');
}

main().catch(err => console.error('Migration runner encountered an error:', err));

// Ensure logs are flushed and confirm execution flow
console.log('Starting script execution...');
console.log('Current working directory:', process.cwd());

console.log('Initializing tsconfig-paths...');
const tsConfigPathsConfig = tsConfigPaths.loadConfig();
console.log('tsconfig-paths initialization complete.');

if (tsConfigPathsConfig.resultType === 'success') {
  console.log('tsconfig-paths loaded successfully.');
  console.log('Loaded baseUrl:', tsConfigPathsConfig.baseUrl);
  console.log('Loaded paths:', tsConfigPathsConfig.paths);

  // Manually resolve paths using the loaded configuration
  const paths = tsConfigPathsConfig.paths;
  const baseUrl = tsConfigPathsConfig.baseUrl;

  const resolvedRootPath = paths['@root/*'] ? path.resolve(baseUrl, paths['@root/*'][0]) : null;
  const resolvedSrcPath = paths['@src/*'] ? path.resolve(baseUrl, paths['@src/*'][0]) : null;

  console.log('Resolved @root path:', resolvedRootPath);
  console.log('Resolved @src path:', resolvedSrcPath);
} else {
  console.error('Failed to load tsconfig-paths:', tsConfigPathsConfig.message);
}