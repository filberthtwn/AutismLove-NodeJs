'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Survey.hasMany(models.AnticancerMed, { foreignKey : 'survey_id' }),
      Survey.hasMany(models.SideEffect, { foreignKey : 'survey_id', as: 'side_effects' })
    }
  };
  
  Survey.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Survey',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Survey.beforeCreate(async (survey, options) => {
    survey.id = uuidv4();
  });

  return Survey;
};