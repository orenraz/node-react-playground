const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const DbConfigBuilder = require('./src/utils/db-config-builder');

// Load .env.test
try {
  const envFilePath = path.resolve(process.cwd(), '.env.test');

  if (envFilePath) {
    console.log('Successfully loaded .env.test file:', envFilePath);
    console.log('Loaded environment variables:', JSON.stringify(process.env, null, 2));
  } else {
    console.error('Failed to load .env.test file:', envFilePath);
  }
} catch (error) {
  console.error('Error loading .env.test file:', error);
}

// Build MongoDB URI using DbConfigBuilder
const uri = DbConfigBuilder.buildConnectionString();

console.log('MongoDB URI:', uri);

// TODO: Determine if this script is a temporary debugging tool for the test issue or if it should be added as a proper test under the test folder (unit or e2e).

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });