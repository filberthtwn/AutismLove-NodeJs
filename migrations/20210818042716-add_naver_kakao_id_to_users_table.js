'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users',
      'naver_id',
      {
        type: Sequelize.STRING,
        allowNull: true
      },
    );

    await queryInterface.addColumn(
      'users',
      'kakao_id',
      {
        type: Sequelize.STRING,
        allowNull: true
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'naver_id');
    await queryInterface.removeColumn('users', 'kakao_id');
  }
};
