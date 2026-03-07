import { Umzug, MongoDBStorage } from 'umzug';
import path from 'path';
const glob = require('glob');

export async function setupMigrations(db: any) {
  const MIGRATIONS_COLLECTION = 'migrations';
  const collections = await db.listCollections().toArray();

  if (!collections.some(c => c.name === MIGRATIONS_COLLECTION)) {
    console.log(`Creating migrations collection: ${MIGRATIONS_COLLECTION}`);
    await db.createCollection(MIGRATIONS_COLLECTION);
  } else {
    console.log(`Migrations collection already exists: ${MIGRATIONS_COLLECTION}`);
  }

  const migrationScriptsPath = path.join(__dirname, '../mongodb/scripts/*.js');
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