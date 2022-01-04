'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'side_effects',
      'order',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('side_effects', 'order');
  }
};
