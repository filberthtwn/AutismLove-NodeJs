'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnticancerRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AnticancerRecord.belongsTo(models.User, { foreignKey : 'user_id', as: 'user' })
    }
  };
  
  AnticancerRecord.init({
    date: DataTypes.STRING,
    purpose: DataTypes.STRING,
    anc_number: DataTypes.INTEGER,
    anc_calculate_method: DataTypes.INTEGER,
    is_anc_calculated_result: DataTypes.INTEGER,
    injection: DataTypes.ENUM('YES', 'NO', 'LESSEN'),
    stimulator: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'AnticancerRecord',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  AnticancerRecord.beforeCreate(async (anticancerRecord, options) => {
    anticancerRecord.id = uuidv4();
  });

  return AnticancerRecord;
};