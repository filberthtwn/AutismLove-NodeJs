'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SideEffectRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SideEffectRecord.belongsTo(models.User, {
        foreignKey : 'user_id', 
        as: 'user'
      });
      
      SideEffectRecord.belongsTo(models.SideEffect, {
          foreignKey : 'side_effect_id', 
          as: 'side_effect'
      });

      SideEffectRecord.hasMany(models.SurveyRecord, {
        foreignKey : 'side_effect_record_id', 
        as: 'survey_records'
      });

      SideEffectRecord.belongsTo(models.InjectionRoute, {
        foreignKey : 'injection_route_id', 
        as: 'injection_route'
      });
    }
  };
  
  SideEffectRecord.init({
    image_urls: {
      type: DataTypes.STRING,
      get() {
        if (!this.getDataValue('image_urls')){
          return [];
        }
        return this.getDataValue('image_urls').split(',');
      },
      set(value) {
        console.log(value);
        this.setDataValue('image_urls', value)
      },
    },
    memo: DataTypes.STRING,
    memo_updated_at: DataTypes.DATE,
    }, 
    {
      sequelize,
      modelName: 'SideEffectRecord',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['anticancer_record_id'] 
      },
    },
  });

  SideEffectRecord.beforeCreate(async (sideEffectRecord, options) => {
    sideEffectRecord.id = uuidv4();
  });

  SideEffectRecord.afterUpdate(async (sideEffectRecord, options) => {
    sideEffectRecord.side_effect_id = undefined;
    sideEffectRecord.anticancer_record_id = undefined;
  });

  return SideEffectRecord;
};