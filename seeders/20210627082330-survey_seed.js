const { Op } = require("sequelize");

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('surveys', [
      {
        id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        name: 'AC_TC / AC',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        name: 'AC_PA',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('surveys', {
      id: { 
        [Op.in]: [
          '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
          'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54'
        ]
      }
    });
  }
};
