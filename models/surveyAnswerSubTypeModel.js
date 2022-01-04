'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyAnswerSubType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        SurveyAnswerSubType.hasMany(models.SurveyAnswerOption, {
            foreignKey : 'survey_answer_sub_type_id', 
        });
        SurveyAnswerSubType.hasMany(models.SurveyQuestion, {
            foreignKey : 'survey_answer_sub_type_id', 
        });
        SurveyAnswerSubType.belongsTo(models.SurveyAnswerType, {
          foreignKey : 'survey_answer_type_id', 
          as: 'survey_answer_type'
        });
    }
  };
  
  SurveyAnswerSubType.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SurveyAnswerSubType',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  SurveyAnswerSubType.beforeCreate(async (surveyAnswerSubType, options) => {
    surveyAnswerSubType.id = uuidv4();
  });

  return SurveyAnswerSubType;
};