'use strict';

const mongoose = require('mongoose');

module.exports = {
  async up() {
    const users = [
      {
        userId: '1',
        firstName: 'Admin',
        lastName: 'User',
        gender: 'Other',
        age: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: '2',
        firstName: 'Regular',
        lastName: 'User',
        gender: 'Male',
        age: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const collectionName = 'users';
    const db = mongoose.connection.db;

    console.log(`Seeding data into collection: ${collectionName}`);

    for (const user of users) {
      const existingUser = await db.collection(collectionName).findOne({ userId: user.userId });
      if (!existingUser) {
        await db.collection(collectionName).insertOne(user);
        console.log(`User with userId ${user.userId} inserted successfully.`);
      } else {
        console.log(`User with userId ${user.userId} already exists. Skipping insertion.`);
      }
    }

    console.log('Seed data inserted successfully.');
  },

  async down() {
    const collectionName = 'users';
    const db = mongoose.connection.db;

    console.log(`Reverting seed data from collection: ${collectionName}`);
    await db.collection(collectionName).deleteMany({});
    console.log('Seed data reverted successfully.');
  },
};