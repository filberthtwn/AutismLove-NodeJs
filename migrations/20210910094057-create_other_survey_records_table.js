'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('other_survey_records', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      week:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      injection_route_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: { model: 'injection_routes', key: 'id' }
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
    await queryInterface.dropTable('other_survey_records');
  }
};
