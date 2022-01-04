'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'anticancer_records',
      'is_anc_calculated_result',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('anticancer_records', 'is_anc_calculated_result');
  }
};
