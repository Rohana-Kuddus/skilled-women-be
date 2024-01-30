'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoadmapCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RoadmapCourse.belongsTo(models.Roadmap, { foreignKey: 'roadmapId' });
      RoadmapCourse.belongsTo(models.Course, { foreignKey: 'courseId' });
    }
  }
  RoadmapCourse.init({}, {
    sequelize,
    modelName: 'RoadmapCourse',
  });
  return RoadmapCourse;
};