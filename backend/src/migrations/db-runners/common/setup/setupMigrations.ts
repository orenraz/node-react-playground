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

  const migrationScriptsPath = path.resolve(process.cwd(), 'src/migrations/mongodb/scripts/*.js');
  console.log('Migration scripts folder path:', migrationScriptsPath);
  const migrationFiles = glob.sync(migrationScriptsPath);
  console.log('Migration files detected by glob:', migrationFiles);

  const migrationDefs = migrationFiles.map((filePath: string) => {
    const name = path.basename(filePath, path.extname(filePath));
    return {
      name,
      path: filePath,
      up: async (context: any) => {
        // Umzug may pass context as { context: db } or just db
        const db = context && context.constructor && context.constructor.name === 'Db' ? context : context.context;
        const mod = require(filePath);
        if (mod && typeof mod.up === 'function') {
          return mod.up(db);
        }
      },
      down: async (context: any) => {
        const db = context && context.constructor && context.constructor.name === 'Db' ? context : context.context;
        const mod = require(filePath);
        if (mod && typeof mod.down === 'function') {
          return mod.down(db);
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