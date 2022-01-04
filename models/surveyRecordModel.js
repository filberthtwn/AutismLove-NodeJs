'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        SurveyRecord.belongsTo(models.SideEffectRecord, {
            foreignKey : 'side_effect_record_id', 
            as: 'side_effect_record'
        }),
        
        SurveyRecord.hasMany(models.SurveyAnswerRecord, {
            foreignKey : 'survey_record_id', 
            as: 'survey_answer_records'
        });

        // SurveyRecord.hasMany(models.OtherSurveyAnswerRecord, {
        //     foreignKey : 'survey_record_id', 
        //     as: 'other_survey_answer_records'
        // });
    }
  };
  
  SurveyRecord.init({
    week: DataTypes.INTEGER,
    survey_date: DataTypes.STRING,
    expected_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SurveyRecord',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  SurveyRecord.beforeCreate(async (surveyRecord, options) => {
    surveyRecord.id = uuidv4();
  });

  return SurveyRecord;
};