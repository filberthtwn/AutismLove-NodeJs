'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'gender', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('users', 'hormone_receptor', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('users', 'human_epidermal_receptor', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {}
};
