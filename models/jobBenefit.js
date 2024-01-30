'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobBenefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobBenefit.belongsTo(models.Job, { foreignKey: 'jobId' });
      JobBenefit.belongsTo(models.Benefit, { foreignKey: 'benefitId' });
    }
  }
  JobBenefit.init({}, {
    sequelize,
    modelName: 'JobBenefit',
  });
  return JobBenefit;
};