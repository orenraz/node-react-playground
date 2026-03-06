import mongoose from 'mongoose';

/**
 * Utility to connect to the test database.
 */
export async function connectTestDb(uri: string) {
  await mongoose.connect(uri);
}

/**
 * Utility to disconnect from the test database.
 */
export async function disconnectTestDb() {
  await mongoose.disconnect();
}

/**
 * Utility to clear a specific collection in the test database.
 */
export async function clearCollection(collectionName: string, filter: Record<string, any> = {}) {
  const collection = mongoose.connection.collection(collectionName);
  await collection.deleteMany(filter);
}