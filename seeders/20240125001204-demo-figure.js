'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Figures', [{
      name: 'Yolanda santosa',
      image: 'https://indonesiaproud.files.wordpress.com/2010/02/yolanda-santosa.jpg',
      role: 'Desainer grafis dunia perfilman',
      description: `Yolanda Santosa berhasil mendapatkan pengakuan kelas dunia sebagai desainer grafis dalam dunia perfilman. 
        Beberapa film yang pernah terlibat diantaranya adalah Hulk (2003), Ugly Betty (2006), Desperate Housewife (2004), 
        ataupun Herbie Fully Loaded (2006). Berkat keahliannya, Yolanda Santosa memperoleh gelar seperti Webby Award Honoree 
        dan Graphic Design USA Award.`,
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Figures', null, {});
  }
};
