'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Util extends Model {
    /** 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { }
  };

  Util.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Util',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });


  Util.beforeSave(async (util, options) => {
    util.id = uuidv4();
  });

  return Util;
};