'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'anticancer_meds',
      'identifier',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('anticancer_meds', 'identifier');
  }
};
