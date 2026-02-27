'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add seed logic here
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user',
        email: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Revert seed logic here
    await queryInterface.bulkDelete('users', null, {});
  }
};