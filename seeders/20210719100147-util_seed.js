'use strict';
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('utils', [
      {
        id: '0bc25a82-9c30-449b-8c90-97214aabbf76',
        name: 'anticancer_record_edit_authority',
        value: 'true',
        created_at: new Date(),
        updated_at: new Date()
      },{
        id: '2ad0eedb-7c96-4954-8664-6baffe1b54b7',
        name: 'anc_side_effect',
        value: '{ "title": "ANC 부작용 관리", "description": "Description" }',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('utils', {
      id: { 
        [Op.in]: [
          '0bc25a82-9c30-449b-8c90-97214aabbf76',
          '2ad0eedb-7c96-4954-8664-6baffe1b54b7'
        ]
      }
    });
  }
};
