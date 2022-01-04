'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Popup extends Model {
    /** 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { }
  };

  Popup.init({
    title: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    popup_type: DataTypes.ENUM('IMAGE', 'TEXT'),
    image_url: DataTypes.STRING,
    text: DataTypes.STRING,
    button_type: DataTypes.ENUM('SHOW_ONLY', 'LINK'),
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Popup',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });


  Popup.beforeSave(async (popup, options) => {
    popup.id = uuidv4();
  });

  return Popup;
};