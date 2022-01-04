'use strict';
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtherSurveyRecord extends Model {
    static associate(models) {
        OtherSurveyRecord.belongsTo(models.InjectionRoute, {
          foreignKey : 'injection_route_id', 
          as: 'injection_route'
        });

        OtherSurveyRecord.hasMany(models.OtherSurveyAnswerRecord, {
            foreignKey : 'other_survey_record_id', 
            as: 'other_survey_answer_records'
          });
    }
  };
  
  OtherSurveyRecord.init({
    week: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OtherSurveyRecord',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  OtherSurveyRecord.beforeCreate(async (otherSurveyRecord, options) => {
    otherSurveyRecord.id = uuidv4();
  });

  return OtherSurveyRecord;
};