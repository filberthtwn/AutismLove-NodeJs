'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('anticancer_meds', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      record_bg_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      record_table_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      survey_id:{
        type: Sequelize.UUID,
        references: { model: 'surveys', key: 'id' }
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
    await queryInterface.dropTable('anticancer_meds');
  }
};
