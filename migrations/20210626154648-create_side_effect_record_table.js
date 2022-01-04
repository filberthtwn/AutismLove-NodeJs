'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('side_effect_records', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      image_urls: {
        type: Sequelize.TEXT,
      },
      memo: {
        type: Sequelize.STRING,
      },
      memo_updated_at: {
        type: Sequelize.DATE,
      },
      side_effect_id: {
        type: Sequelize.UUID,
        references: { model: 'side_effects', key: 'id' }
      },
      injection_route_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: { model: 'injection_routes', key: 'id' }
      },
      user_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' }
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
    await queryInterface.dropTable('side_effect_records');

  }
};
