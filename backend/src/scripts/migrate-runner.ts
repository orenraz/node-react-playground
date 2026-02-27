import config from '../config/config';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { MongoConfigBuilder } from '../config/loaders/mongo-config-builder';
import { MongoDBConfig } from '../config';

(async () => {
  const mongoUri = (config.mongodb as MongoDBConfig).uri;

  const sequelize = new Sequelize(mongoUri, {
    dialect: 'mysql', // Replace with the correct dialect for MongoDB if needed
  });

  const umzug = new Umzug({
    migrations: {
      glob: 'src/scripts/migrations/*.js',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  async function runMigrations() {
    try {
      console.log('Running migrations...');
      await umzug.up();
      console.log('All migrations executed successfully.');
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
  }

  runMigrations();
})();