import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import config from '@src/config/config';

export async function connectToMongoDB() {
  const MONGO_URI = config.mongodb.uri;
  const DATABASE_NAME = config.mongodb.dbName;

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('MongoDB connected.');

  return { client, db: client.db(DATABASE_NAME) };
}

export async function connectMongoose() {
  try {
    await mongoose.connect(config.mongodb.uri, { dbName: config.mongodb.dbName });
    console.log('Mongoose connected.');
  } catch (err) {
    console.warn('Failed to connect Mongoose:', err);
  }
}

export async function disconnectMongoose() {
  try {
    await mongoose.disconnect();
    console.log('Mongoose disconnected.');
  } catch (err) {
    console.warn('Error disconnecting Mongoose:', err);
  }
}