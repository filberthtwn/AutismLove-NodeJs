'use strict';

const { parse:uuidParse } = require('uuid');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('anticancer_med_designs', [
      {
        id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        name: 'AC + TC',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        name: 'AC + Paclitaxel',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        name: 'AC',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '30864454-70f9-4b25-90ae-3e700452c917',
        name: "I_DONT_KNOW",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('anticancer_med_designs', null, {});
  }
};
