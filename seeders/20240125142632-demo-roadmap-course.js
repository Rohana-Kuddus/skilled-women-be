'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roadmaps = await queryInterface.sequelize.query(
      `SELECT id from Roadmaps;`
    );

    const courses = await queryInterface.sequelize.query(
      `SELECT id from Courses;`
    );

    await queryInterface.bulkInsert('Roadmap_Courses', [{
      roadmapId: roadmaps[0][0].id,
      courseId: courses[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roadmap_Courses', null, {});
  }
};
