'use strict';

const mongoose = require('mongoose');

module.exports = {
  async up() {
    const collectionName = 'users';
    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(collection => collection.name === collectionName);

    if (!collectionExists) {
      console.log(`Creating collection: ${collectionName}`);
      await db.createCollection(collectionName, {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'firstName', 'lastName', 'gender', 'age'],
            properties: {
              userId: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              firstName: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              lastName: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              gender: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              age: {
                bsonType: 'int',
                minimum: 0,
                maximum: 120,
                description: 'must be an integer between 0 and 120',
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
  async down() {
    const collectionName = 'users';
    const db = mongoose.connection.db;

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