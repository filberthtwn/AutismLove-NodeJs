'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnticancerMedDesign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        AnticancerMedDesign.hasMany(models.AnticancerMed, { foreignKey : 'anticancer_med_design_id' })
        AnticancerMedDesign.hasMany(models.AnticancerMedDesignElement, { foreignKey : 'anticancer_med_design_id', as: 'anticancer_med_design_elements' })
    }
  };
  
  AnticancerMedDesign.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AnticancerMedDesign',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  AnticancerMedDesign.beforeCreate(async (anticancerMedDesign, options) => {
    anticancerMedDesign.id = uuidv4();
  });

  return AnticancerMedDesign;
};