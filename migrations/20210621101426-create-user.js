'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birth_year: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hormone_receptor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      human_epidermal_receptor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      hospital_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      survey_duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 7
      },
      anticancer_med_id: {
        type: Sequelize.UUID,
        references: { 
          model: 'anticancer_meds', 
          key: 'id',
          as: 'anticancer_med'
        }
      },
      surgery_date: {
        type: Sequelize.STRING
      },
      is_alarm_on: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      alarm_type: {
        type: Sequelize.STRING,
        defaultValue: "SOUND"
      },
      alarm_time: { 
        type: Sequelize.STRING,
        defaultValue: "10:00"
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      last_login_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('users');
  }
};