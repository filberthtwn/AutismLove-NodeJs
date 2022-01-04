'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('side_effects', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.changeColumn('side_effects', 'description', {
    //   type: Sequelize.TEXT,
    //   allowNull: true
    // });
  }
};
