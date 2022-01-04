'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'other_survey_answer_records',
      'other_survey_record_id',
      {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: { model: 'other_survey_records', key: 'id' }
      },
    );

    await queryInterface.removeColumn(
      'other_survey_answer_records',
      'survey_record_id',
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'other_survey_answer_records',
      'other_survey_record_id',
    );
  }
};
