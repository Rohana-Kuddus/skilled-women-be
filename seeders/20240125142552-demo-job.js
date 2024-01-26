'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const industries = await queryInterface.sequelize.query(
      `SELECT id from Industries;`
    );

    const figures = await queryInterface.sequelize.query(
      `SELECT id from Figures;`
    );

    await queryInterface.bulkInsert('Jobs', [{
      name: 'Desainer Grafis',
      cta: 'Ciptakan kreasi desain art kamu secara digital!',
      image: 'https://source.unsplash.com/tuned-on-macbook-CGpifH3FjOA',
      description: `Seorang graphic designer menciptakan visual menarik untuk produk dan promosi. 
        Tugas mereka melibatkan penggunaan kemampuan dasar menggambar dan software grafis untuk menyampaikan 
        informasi secara kreatif sesuai keinginan klien.`,
      percentage: '63%',
      percentageSource: 'INA',
      percentageLink: 'https://www.bloggersideas.com/id/graphic-design-statistics/#:~:text=Desainer%20grafis%20terdiri%20dari%2063%20persen%20perempuan%20dan%2037%20persen%20laki%2Dlaki',
      income: 'Rp 2 Juta - 12 Juta',
      incomeLink: 'https://www.idxchannel.com/milenomic/inilah-gaji-desain-grafis-sebulan-capai-rp12-juta/2#:~:text=Rp9.000.000%20%E2%80%93%2012.000.000',
      video: 'https://www.youtube.com/embed/wU_V7fHYVgk?si=3HKpx8cBF4FmOClR',
      roadmapSummary: `Roadmap dalam belajar desain grafis melibatkan pemahaman mendalam terhadap prinsip-prinsip dasar, 
        eksplorasi perangkat lunak khusus, praktik yang konsisten dalam berbagai proyek, pengembangan keterampilan tipografi 
        dan tata letak, pembangunan portofolio yang representatif, serta keteruskan belajar dan eksplorasi terhadap tren 
        serta teknologi terbaru dalam industri, semua untuk menciptakan fondasi yang kokoh bagi pengembangan karier yang 
        sukses dalam dunia desain grafis.`,
      industryId: industries[0][0].id,
      figureId: figures[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Jobs', null, {});
  }
};
