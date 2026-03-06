import mongoose from 'mongoose';

export default async function globalSetup() {
  const uri = 'mongodb://localhost:27017';
  if (!uri) {
    console.error('globalSetup: TEST DB URI is not defined. Ensure .env.test or test/config provides a URI');
    throw new Error('TEST DB URI is required for tests');
  }

  // Ensure DB is reachable
  try {
    await mongoose.connect(uri);
    await mongoose.disconnect();
  } catch (err) {
    console.error('globalSetup: failed to connect to MongoDB during setup', err);
    throw err;
  }
}
