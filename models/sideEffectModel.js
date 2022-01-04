'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SideEffect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SideEffect.belongsTo(models.Survey, {
        foreignKey : 'survey_id', 
        as: 'survey'
      })

      SideEffect.hasMany(models.SurveyQuestion, {
        foreignKey : 'side_effect_id', 
        as: 'survey_questions'
      })
    }
  };
  
  SideEffect.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    order: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SideEffect',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  SideEffect.beforeCreate(async (sideEffect, options) => {
    sideEffect.id = uuidv4();
  });
  
  return SideEffect;
};