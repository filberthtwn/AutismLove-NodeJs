'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('injection_routes', 'date', {
          type: Sequelize.STRING,
          allowNull: true,
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('injection_routes', 'date', {
          type: Sequelize.STRING,
          allowNull: true,
      })
    ])
  }
};
