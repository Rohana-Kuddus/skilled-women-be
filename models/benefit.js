'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Benefit.belongsToMany(models.Job, {
        through: models.JobBenefit,
        foreignKey: 'benefitId',
        otherKey: 'jobId'
      });
    }
  }
  Benefit.init({
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Benefit',
  });
  return Benefit;
};