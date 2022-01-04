'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('anticancer_records', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anc_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      injection: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stimulator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
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
    await queryInterface.dropTable('anticancer_records');
  }
};
