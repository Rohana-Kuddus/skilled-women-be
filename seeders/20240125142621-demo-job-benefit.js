'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const jobs = await queryInterface.sequelize.query(
      `SELECT id from Jobs;`
    );

    const benefits = await queryInterface.sequelize.query(
      `SELECT id from Benefits;`
    );

    await queryInterface.bulkInsert('Job_Benefits', [{
      jobId: jobs[0][0].id,
      benefitId: benefits[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Job_Benefits', null, {});
  }
};
