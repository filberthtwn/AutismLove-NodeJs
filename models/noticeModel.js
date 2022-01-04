'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  
  Notice.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Notice',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Notice.beforeCreate(async (notice, options) => {
    notice.id = uuidv4();
  });

  return Notice;
};