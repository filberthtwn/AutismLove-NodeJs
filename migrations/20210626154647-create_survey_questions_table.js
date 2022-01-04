'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('survey_questions', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      survey_answer_sub_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'survey_answer_sub_types', key: 'id' }
      },
      side_effect_id:{
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'side_effects', key: 'id' }
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
    await queryInterface.dropTable('survey_questions');
  }
};
