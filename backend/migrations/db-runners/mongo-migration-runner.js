const { Umzug, SequelizeStorage } = require('umzug');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MONGO_URI, {
  dialect: 'mongodb',
});

const umzug = new Umzug({
  migrations: {
    glob: 'migrations/mongodb/*.js',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  try {
    const migrations = await umzug.up();
    console.log('Migrations applied:', migrations);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await sequelize.close();
  }
})();