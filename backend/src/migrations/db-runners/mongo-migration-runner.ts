import { loadConfig } from '../config/loadConfig';
import { connectToMongoDB, connectMongoose, disconnectMongoose } from '../database/connectToMongoDB';
import { setupMigrations } from '../setup/setupMigrations';
import { runMigrations } from '../runner/runMigrations';

async function main() {
  loadConfig();

  const { client, db } = await connectToMongoDB();

  await connectMongoose();

  const umzug = await setupMigrations(db);
  await runMigrations(umzug);

  await disconnectMongoose();
  await client.close();
  console.log('MongoDB connection closed.');
}

main().catch(err => console.error('Migration runner encountered an error:', err));