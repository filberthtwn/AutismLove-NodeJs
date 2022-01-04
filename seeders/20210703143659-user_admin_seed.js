const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 'e7829ed5-2d30-4a4b-8747-279ce33884ee',
        name: 'Admin',
        email: 'admin@heal.com',
        password: bcrypt.hashSync('123456789', 12),
        phone_number: "+6280",
        birth_year: "1998",
        gender: 'MALE',
        hormone_receptor: 'POSITIVE',
        human_epidermal_receptor: 'POSITIVE',
        note: 'Lorem Ipsum',
        role: 'ADMIN',
        hospital_name: 'Healstation Hospital',
        surgery_date: '2021-01-01',
        anticancer_med_id: 'fa3967c3-b6eb-4649-960c-18ffeba5147f',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      id: { 
        [Op.in]: [
          'e7829ed5-2d30-4a4b-8747-279ce33884ee'
        ]
      }
    });
  }
};
