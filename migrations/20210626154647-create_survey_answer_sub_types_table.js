'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('survey_answer_sub_types', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      survey_answer_type_id:{
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'survey_answer_types', key: 'id' }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('survey_answer_sub_types');

  }
};
