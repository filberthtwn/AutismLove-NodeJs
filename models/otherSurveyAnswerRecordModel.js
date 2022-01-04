'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtherSurveyAnswerRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OtherSurveyAnswerRecord.belongsTo(models.OtherSurveyRecord, {
          foreignKey : 'other_survey_record_id', 
          as: 'other_survey_record'
        });
    }
  };
  
  OtherSurveyAnswerRecord.init({
    symtomps: DataTypes.STRING,
    severity: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'OtherSurveyAnswerRecord',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  OtherSurveyAnswerRecord.beforeCreate(async (otherSurveyAnswerRecord, options) => {
    otherSurveyAnswerRecord.id = uuidv4();
  });

  OtherSurveyAnswerRecord.beforeBulkCreate(async (otherSurveyAnswerRecords, options) => {
    for (let i = 0; i < otherSurveyAnswerRecords.length; i++) {
      otherSurveyAnswerRecords[i].id = `'${uuidv4()}'`;
    }
  });

  return OtherSurveyAnswerRecord;
};