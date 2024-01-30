'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.belongsTo(models.Industry);
      Job.belongsTo(models.Figure);
      Job.hasMany(models.Roadmap);
      Job.belongsToMany(models.Benefit, {
        through: models.JobBenefit,
        foreignKey: 'jobId',
        otherKey: 'benefitId'
      });
    }
  }
  Job.init({
    name: DataTypes.STRING,
    cta: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    percentage: DataTypes.STRING,
    percentageSource: DataTypes.ENUM('INA', 'WLD'),
    percentageLink: DataTypes.TEXT,
    income: DataTypes.STRING,
    incomeLink: DataTypes.TEXT,
    video: DataTypes.STRING,
    roadmapSummary: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};