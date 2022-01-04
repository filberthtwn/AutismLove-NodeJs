'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('anticancer_records', 'date', {
      type: Sequelize.STRING,
      allowNull: true // note this
    });
  },

  down: async (queryInterface, Sequelize) => {}
};
