'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SurveyQuestion.belongsTo(models.SurveyAnswerSubType, {
        foreignKey : 'survey_answer_sub_type_id', 
        as: 'survey_answer_sub_type'
      }),

      SurveyQuestion.belongsTo(models.SideEffect, {
        foreignKey : 'side_effect_id', 
        as: 'side_effect'
      }),
      
      SurveyQuestion.hasMany(models.SurveyAnswerRecord, {
        foreignKey : 'survey_question_id', 
        as: 'survey_answer_records'
      });
    }
  };
  
  SurveyQuestion.init({
    question: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SurveyQuestion',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      attributes: { exclude: [
        'side_effect_id', 
      ]},
    },
  });

  SurveyQuestion.beforeCreate(async (surveyQuestion, options) => {
    surveyQuestion.id = uuidv4();
  });

  return SurveyQuestion;
};