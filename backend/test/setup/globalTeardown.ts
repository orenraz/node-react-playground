import mongoose from 'mongoose';

export default async function globalTeardown() {
  const uri = 'mongodb://localhost:27017';
  if (!uri) return;

  try {
    await mongoose.connect(uri);
    try {
      if (mongoose.connection?.db) {
        await mongoose.connection.db.dropDatabase();
      }
    } catch (dropErr) {
      console.warn('globalTeardown: dropDatabase failed', dropErr);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.warn('globalTeardown: unable to connect/disconnect', err);
  }
}
