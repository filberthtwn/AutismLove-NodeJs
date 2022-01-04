'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('survey_answer_types', [
      {
        id: '7bf13db9-69d2-4825-9ab4-96048ce91625',
        name: '심각도',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '30210a9b-0ff0-49e4-a141-750098baaf6d',
        name: '빈도',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'bdd8e5f6-df69-4780-a756-eae3e111ac5e',
        name: '일상생활 영향',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '77b48945-8a9b-45cc-b39d-c4165f5b9a56',
        name: '이상유무',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('survey_answer_types', null, {});
  }
};
