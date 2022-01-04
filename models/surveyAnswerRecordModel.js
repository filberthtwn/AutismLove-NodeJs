'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyAnswerRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        SurveyAnswerRecord.belongsTo(models.SurveyQuestion, {
            foreignKey : 'survey_question_id',
            as: 'survey_question'
        });

        SurveyAnswerRecord.belongsTo(models.SurveyAnswerOption, {
            foreignKey : 'survey_answer_option_id', 
            as: 'survey_answer_option'
        });

        SurveyAnswerRecord.belongsTo(models.SurveyRecord, {
          foreignKey : 'survey_record_id', 
          as: 'survey_record'
        });
    }
  };
  
  SurveyAnswerRecord.init({}, {
    sequelize,
    modelName: 'SurveyAnswerRecord',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
        // attributes: { exclude: [
        //   'survey_answer_type_id', 
        // ]},
    },
  });

  SurveyAnswerRecord.beforeCreate(async (surveyAnswerRecord, options) => {
    surveyAnswerRecord.id = uuidv4();
  });

  SurveyAnswerRecord.beforeBulkCreate(async (surveyAnswerRecords, options) => {
    for (let i = 0; i < surveyAnswerRecords.length; i++) {
      surveyAnswerRecords[i].id = `'${uuidv4()}'`;
    }
  });

  return SurveyAnswerRecord;
};