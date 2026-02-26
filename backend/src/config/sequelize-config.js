require('dotenv').config();

const validateEnv = (key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return process.env[key];
};

module.exports = {
  development: {
    username: validateEnv('DB_USER'),
    password: validateEnv('DB_PASSWORD'),
    database: validateEnv('DB_NAME'),
    host: validateEnv('DB_HOST'),
    dialect: 'mysql',
    logging: console.log,
  },
  test: {
    username: validateEnv('DB_USER'),
    password: validateEnv('DB_PASSWORD'),
    database: validateEnv('DB_NAME'),
    host: validateEnv('DB_HOST'),
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: validateEnv('DB_USER'),
    password: validateEnv('DB_PASSWORD'),
    database: validateEnv('DB_NAME'),
    host: validateEnv('DB_HOST'),
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 1,
      acquire: 30000,
      idle: 10000,
    },
  },
};