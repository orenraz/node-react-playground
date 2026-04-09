'use strict';

const mongoose = require('mongoose');

module.exports = {
  async up(db) {
    const collectionName = 'users';
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(collection => collection.name === collectionName);

    if (!collectionExists) {
      console.log(`Creating collection: ${collectionName}`);
      await db.createCollection(collectionName, {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'email', 'firstName', 'createdAt', 'updatedAt'],
            properties: {
              userId: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              email: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              googleId: {
                bsonType: 'string',
                description: 'optional googleId',
              },
              provider: {
                bsonType: 'string',
                description: 'optional provider',
              },
              firstName: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              lastName: {
                bsonType: 'string',
                description: 'optional last name',
              },
              gender: {
                bsonType: 'string',
                // IMPORTANT: Keep these values in sync with the Gender enum in src/modules/user/enums/gender.enum.ts
                enum: ['male', 'female', 'other'],
                description: 'optional gender, must be one of: male, female, other (from Gender enum)',
              },
              birthDate: {
                bsonType: 'date',
                description: 'optional birth date',
              },
              createdAt: {
                bsonType: 'date',
                description: 'must be a date and is required',
              },
              updatedAt: {
                bsonType: 'date',
                description: 'must be a date and is required',
              },
            },
          },
        },
      });
      console.log(`Collection ${collectionName} created successfully.`);
    } else {
      console.log(`Collection ${collectionName} already exists.`);
    }
  },
  async down(db) {
    const collectionName = 'users';
    console.log(`Checking if collection exists: ${collectionName}`);
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(collection => collection.name === collectionName);

    if (collectionExists) {
      console.log(`Dropping collection: ${collectionName}`);
      await db.collection(collectionName).drop();
      console.log(`Collection ${collectionName} dropped successfully.`);
    } else {
      console.log(`Collection ${collectionName} does not exist. Skipping drop.`);
    }
  }
};