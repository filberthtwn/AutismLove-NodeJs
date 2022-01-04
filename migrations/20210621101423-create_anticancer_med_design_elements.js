'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('anticancer_med_design_elements', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      color_hex: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anticancer_med_design_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'anticancer_med_designs', key: 'id' }
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
    await queryInterface.dropTable('anticancer_med_design_elements');
  }
};
