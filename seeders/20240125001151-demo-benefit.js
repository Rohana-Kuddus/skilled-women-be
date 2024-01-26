'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Benefits', [{
      description: 'Peluang setara untuk mencapai posisi kepemimpinan.',
      image: 'https://i.imgur.com/quVzJh2.png',
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Benefits', null, {});
  }
};
