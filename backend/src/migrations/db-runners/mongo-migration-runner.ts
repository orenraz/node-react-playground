import { loadConfig } from './common/config/loadConfig';
import { connectToMongoDB } from './mongo/database/connectToMongoDB';
import { setupMigrations } from './common/setup/setupMigrations';
import { runMigrations } from './common/runner/runMigrations';

async function main() {
  loadConfig();

  const { client, db } = await connectToMongoDB();

  const umzug = await setupMigrations(db);
  await runMigrations(umzug);

  await client.close();
  console.log('MongoDB connection closed.');
}

main().catch(err => console.error('Migration runner encountered an error:', err));