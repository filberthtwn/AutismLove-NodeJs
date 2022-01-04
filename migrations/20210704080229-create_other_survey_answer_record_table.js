'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('other_survey_answer_records', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      symtomps:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      severity:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      survey_record_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'survey_records', key: 'id' }
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
    await queryInterface.dropTable('other_survey_answer_records');
  }
};
