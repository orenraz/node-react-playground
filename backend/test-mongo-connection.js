const mongoose = require('mongoose');
const { MongoConfigBuilder } = require('./src/config/mongo-config-builder');

const uri = MongoConfigBuilder.buildConnectionString();

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connection successful!');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

testConnection();