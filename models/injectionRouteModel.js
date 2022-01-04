'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InjectionRoute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InjectionRoute.belongsTo(models.AnticancerMedDesignElement, {
        foreignKey : 'anticancer_med_design_element_id', 
        as: 'anticancer_med_design_element'
      }),

      InjectionRoute.hasMany(models.SideEffectRecord, {
        foreignKey : 'injection_route_id', 
        as: 'side_effect_records'
      })

      InjectionRoute.hasMany(models.OtherSurveyRecord, {
        foreignKey : 'injection_route_id', 
        as: 'other_survey_records'
      })
    }
  };
  
  InjectionRoute.init({
    date: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'InjectionRoute',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      attributes: { exclude: ['anticancer_med_design_element_id'] },
    },
  });

  InjectionRoute.beforeBulkCreate(async (injectionRoutes, options) => {
    for (let i = 0; i < injectionRoutes.length; i++) {
      injectionRoutes[i].id = `'${uuidv4()}'`;
    }
  });

  InjectionRoute.beforeCreate(async (injectionRoute, options) => {
    injectionRoute.id = uuidv4();
  });

  InjectionRoute.beforeSave(async (injectionRoute, options) => {
    injectionRoute.id = uuidv4();
  });

  InjectionRoute.afterUpdate(async (injectionRoute, options) => {
    injectionRoute.order = undefined;
  })

  return InjectionRoute;
};