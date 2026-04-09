'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(db) {

    const user = {
      userId: uuidv4(),
      email: 'oren1407@gmail.com',
      password: 'hashed-password-123', // example hash, replace as needed
      googleId: 'google-oauth-id',
      provider: 'google',
      firstName: 'Oren',
      lastName: 'Raz',
      gender: 'male',
      birthDate: new Date('1981-07-14T00:00:00.000Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const collectionName = 'users';
    console.log(`Seeding data into collection: ${collectionName}`);

    const existingUser = await db.collection(collectionName).findOne({ email: user.email });
    if (!existingUser) {
      await db.collection(collectionName).insertOne(user);
      console.log(`User with email ${user.email} inserted successfully.`);
    } else {
      console.log(`User with email ${user.email} already exists. Skipping insertion.`);
    }

    console.log('Seed data inserted successfully.');
  },

  async down(db) {
    const collectionName = 'users';
    console.log(`Reverting seed data from collection: ${collectionName}`);
    await db.collection(collectionName).deleteMany({ email: 'oren1407@gmail.com' });
    console.log('Seed data reverted successfully.');
  },
};