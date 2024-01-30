'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cities = await queryInterface.sequelize.query(
      `SELECT id from Cities;`
    );

    await queryInterface.bulkInsert('Users', [{
      username: 'janedoe',
      email: 'janedoe@gmail.com',
      password: '1234',
      gender: 'F',
      image: '',
      cityId: cities[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
