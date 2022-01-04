'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('survey_answer_records', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      survey_record_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'survey_records', key: 'id' }
      },
      survey_question_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'survey_questions', key: 'id' }
      },
      survey_answer_option_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'survey_answer_options', key: 'id' }
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
    await queryInterface.dropTable('survey_answer_records');

  }
};
