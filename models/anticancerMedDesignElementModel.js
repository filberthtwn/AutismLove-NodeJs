'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnticancerMedDesignElement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        AnticancerMedDesignElement.hasMany(models.InjectionRoute, { foreignKey : 'anticancer_med_design_element_id' })
        AnticancerMedDesignElement.belongsTo(models.AnticancerMedDesign, { foreignKey : 'anticancer_med_design_id' })
    }
  };
  
  AnticancerMedDesignElement.init({
    order: DataTypes.INTEGER,
    name: DataTypes.STRING,
    color_hex: DataTypes.STRING,
    // anticancer_med_design_id: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'AnticancerMedDesignElement',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // include: [{
    //     model: AnticancerMed,
    //     as: 'anticancer_med'
    // }],
  });

  AnticancerMedDesignElement.beforeCreate(async (anticancerMedDesignElement, options) => {
    anticancerMedDesignElement.id = uuidv4();
  });

  return AnticancerMedDesignElement;
};