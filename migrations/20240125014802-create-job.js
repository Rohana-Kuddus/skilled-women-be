'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cta: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      percentage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      percentageSource: {
        allowNull: false,
        type: Sequelize.ENUM('INA', 'WLD')
      },
      percentageLink: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      income: {
        allowNull: false,
        type: Sequelize.STRING
      },
      incomeLink: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      video: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roadmapSummary: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      industryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'industries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      figureId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'figures',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};