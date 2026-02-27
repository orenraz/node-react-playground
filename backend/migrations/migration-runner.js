const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { MongoConfigBuilder } = require('../src/config/loaders/mongo-config-builder');
const config = require('../src/config'); // Import centralized configuration

const dbType = process.argv[2];

if (!dbType || dbType !== 'mongodb') {
  console.error(`Usage: node migration-runner.js <dbType>`);
  console.error(`Supported dbTypes: mongodb`);
  process.exit(1);
}

// Dynamically build MongoDB URI using MongoConfigBuilder
const mongoUri = MongoConfigBuilder.buildConnectionString({
  protocol: config.mongodb.protocol,
  user: config.mongodb.user,
  password: config.mongodb.password,
  host: config.mongodb.host,
  dbName: config.mongodb.dbName
});

(async () => {
  try {
    console.log(`Connecting to MongoDB (${config.env})...`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const migrationFiles = fs.readdirSync(path.join(__dirname, 'mongodb', 'scripts'));

    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const migration = require(path.join(__dirname, 'mongodb', 'scripts', file));
      if (migration.up) {
        await migration.up();
        console.log(`Migration ${file} applied successfully.`);
      }
    }

    console.log('All migrations executed successfully.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
})();