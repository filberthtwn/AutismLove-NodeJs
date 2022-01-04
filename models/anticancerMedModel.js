'use strict';
const { v4: uuidv4 } = require('uuid');
// const models = require('./../models');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnticancerMed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        AnticancerMed.hasMany(models.User, { foreignKey : 'anticancer_med_id' })
        AnticancerMed.belongsTo(models.AnticancerMedDesign, { foreignKey : 'anticancer_med_design_id', as: 'anticancer_med_design' })
        AnticancerMed.belongsTo(models.Survey, { foreignKey : 'survey_id', as: 'survey' })
    }
  };
  
  AnticancerMed.init({
    name: DataTypes.STRING,
    identifier: DataTypes.STRING,
    description: DataTypes.STRING,
    record_bg_color: DataTypes.STRING,
    record_table_color: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AnticancerMed',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      attributes: { 
          exclude: [
              'anticancer_med_design_id'
          ]
      },
    },
    // scopes: {
    //   showAnt : {
    //     attributes: { include: ['password'] },
    //   },
    //   showLastLoginAt: {
    //     attributes: { include: ['last_login_at'] },
    //   }
    // }
  });

  AnticancerMed.beforeCreate(async (anticancerMed, options) => {
    anticancerMed.id = uuidv4();
  });

  return AnticancerMed;
};