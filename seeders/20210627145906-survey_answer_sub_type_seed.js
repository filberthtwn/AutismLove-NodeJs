'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('survey_answer_sub_types', [
      // SEVERITY
      {
        id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        name: 'MAIN',
        survey_answer_type_id: '7bf13db9-69d2-4825-9ab4-96048ce91625',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        name: 'SEX',
        survey_answer_type_id: '7bf13db9-69d2-4825-9ab4-96048ce91625',
        created_at: new Date(),
        updated_at: new Date()
      },
      // FREQUENCY
      {
        id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        name: 'MAIN',
        survey_answer_type_id: '30210a9b-0ff0-49e4-a141-750098baaf6d',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'fa30d8f2-e4ea-4224-bc78-0c49bc6e5ff4',
        name: 'SEX',
        survey_answer_type_id: '30210a9b-0ff0-49e4-a141-750098baaf6d',
        created_at: new Date(),
        updated_at: new Date()
      },
      // DAILY LIFE
      {
        id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        name: 'MAIN',
        survey_answer_type_id: 'bdd8e5f6-df69-4780-a756-eae3e111ac5e',
        created_at: new Date(),
        updated_at: new Date()
      },
      // YES/NO ANSWER
      {
        id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        name: 'MAIN',
        survey_answer_type_id: '77b48945-8a9b-45cc-b39d-c4165f5b9a56',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('survey_answer_sub_types', null, {});
  }
};
