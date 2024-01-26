'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roadmap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roadmap.belongsTo(models.Job);
      Roadmap.belongsToMany(models.Course, {
        through: models.RoadmapCourse,
        foreignKey: 'roadmapId',
        otherKey: 'courseId'
      });
    }
  }
  Roadmap.init({
    name: DataTypes.STRING,
    step: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Roadmap',
  });
  return Roadmap;
};