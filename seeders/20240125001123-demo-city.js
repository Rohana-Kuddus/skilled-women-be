'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Cities', [{
    name: 'Jakarta',
    createdAt: new Date(),
    updatedAt: new Date()
   }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
