'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users', // table name
        'role', // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'USER'
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'role');
  }
};
