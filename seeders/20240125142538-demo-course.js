'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id from Users;`
    );

    await queryInterface.bulkInsert('Courses', [{
      name: 'Introduction To Graphic Design',
      image: '',
      description: 'Learn the basics of graphic design using Canva to create real world projects.',
      paid: false,
      link: 'https://www.udemy.com/course/graphic-design-intro/',
      rating: 0,
      userId: users[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
