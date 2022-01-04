'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyAnswerType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SurveyAnswerType.hasMany(models.SurveyAnswerSubType, {
        foreignKey : 'survey_answer_type_id', 
        as: 'survey_answer_sub_types'
      });
    }
  };
  
  SurveyAnswerType.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SurveyAnswerType',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  SurveyAnswerType.beforeCreate(async (surveyAnswerType, options) => {
    surveyAnswerType.id = uuidv4();
  });

  return SurveyAnswerType;
};