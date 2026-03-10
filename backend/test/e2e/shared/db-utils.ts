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
