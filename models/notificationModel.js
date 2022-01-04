'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PushNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  };
  
  PushNotification.init({
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PushNotification',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  PushNotification.beforeCreate(async (pushNotification, options) => {
    pushNotification.id = uuidv4();
  });

  return PushNotification;
};