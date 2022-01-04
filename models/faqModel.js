'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  
  Faq.init({
    question: DataTypes.STRING,
    answer: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Faq',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Faq.beforeCreate(async (faq, options) => {
    faq.id = uuidv4();
  });

  return Faq;
};