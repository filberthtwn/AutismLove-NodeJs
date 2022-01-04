'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users',
      'main_visited',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    );

    await queryInterface.addColumn(
      'users',
      'survey_visited',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    );

    await queryInterface.addColumn(
      'users',
      'record_visited',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    );

    await queryInterface.addColumn(
      'users',
      'side_effect_visited',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'main_visited');
    await queryInterface.removeColumn('users', 'survey_visited');
    await queryInterface.removeColumn('users', 'record_visited');
    await queryInterface.removeColumn('users', 'side_effect_visited');
  }
};
