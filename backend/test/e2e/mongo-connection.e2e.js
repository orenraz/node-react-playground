const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { MongoConfigBuilder } = require('../../src/config/mongo-config-builder');

dotenv.config();

const uri = MongoConfigBuilder.buildConnectionString();

async function testMongoConnection() {
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

testMongoConnection();