'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const jobs = await queryInterface.sequelize.query(
      `SELECT id from Jobs;`
    );

    await queryInterface.bulkInsert('Roadmaps', [{
      name: 'Pengantar Desain Grafis',
      step: 1,
      jobId: jobs[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roadmaps', null, {});
  }
};
