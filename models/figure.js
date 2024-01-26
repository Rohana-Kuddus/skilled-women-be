'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Figure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Figure.hasMany(models.Job);
    }
  }
  Figure.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Figure',
  });
  return Figure;
};