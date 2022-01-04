'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyAnswerOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SurveyAnswerOption.belongsTo(models.SurveyAnswerSubType, {
        foreignKey : 'survey_answer_sub_type_id', 
        as: 'survey_answer_sub_type'
      }),
      SurveyAnswerOption.hasMany(models.SurveyAnswerRecord, {
        foreignKey : 'survey_answer_option_id', 
      });
    }
  };
  
  SurveyAnswerOption.init({
    answer: DataTypes.STRING,
    score: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SurveyAnswerOption',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // defaultScope: {
    //     attributes: { exclude: [
    //       'survey_answer_sub_type_id', 
    //     ]},
    // },
  });

  SurveyAnswerOption.beforeCreate(async (surveyAnswerOption, options) => {
    surveyAnswerType.id = uuidv4();
  });

  return SurveyAnswerOption;
};