'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('survey_answer_options', [
      // SEVERITY (MAIN)
      {
        id: '5400c159-da3c-4e9a-bd07-af2c9ddb6506',
        answer: '전혀 없다',
        score: 0,
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a400626d-5d94-477b-9f18-1a191699398f',
        answer: '약간 있다',
        score: 1,
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '810e3bdb-c472-484c-b3c0-29114dfce260',
        answer: '보통이다',
        score: 2,
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '4a0eeb12-8bfe-404f-b282-c56117d3cb30',
        answer: '심하다',
        score: 3,
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3fe88c60-362c-4cc6-92ac-94111d415caf',
        answer: '매우 심하다',
        score: 4,
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        created_at: new Date(),
        updated_at: new Date()
      },

      //* SERVERITY (SEX)
      {
        id: '2a2e01bf-dccd-4624-a439-e78eddd33d42',
        answer: '전혀 없다',
        score: 0,
        survey_answer_sub_type_id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3fb54a37-5f83-4580-8d9c-c535854720f9',
        answer: '약간 있다',
        score: 1,
        survey_answer_sub_type_id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '289be083-f5c2-46ef-a05f-992578096154',
        answer: '보통이다',
        score: 2,
        survey_answer_sub_type_id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '36562a24-f9f4-4c5d-a234-28359862c0b1',
        answer: '심하다',
        score: 3,
        survey_answer_sub_type_id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'ed453492-4eec-4303-bf9d-77a7c56d2165',
        answer: '매우 심하다',
        score: 4,
        survey_answer_sub_type_id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '876a648c-6bae-4f2b-8727-2343fc00c782',
        answer: '해당사항없다',
        score: 0,
        survey_answer_sub_type_id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '9c86f649-6d01-4232-a14f-3be6f795026d',
        answer: '성생활을 하지 않는다',
        score: 0,
        survey_answer_sub_type_id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c2b8f6fd-cc54-483c-ac61-7a38974bd5b6',
        answer: '답하고 싶지 않다',
        score: 0,
        survey_answer_sub_type_id: '70570013-50c3-4a06-9482-75a8dc6dda00',
        created_at: new Date(),
        updated_at: new Date()
      },

      //* FREQUENCY (MAIN)
      {
        id: 'e2579c22-db21-44d3-9ee8-bbd907a25b14',
        answer: '전혀 없다',
        score: 0,
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '297363a5-748e-4a4a-9796-d7a7ad5cb249',
        answer: '드물게 있다',
        score: 1,
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'ae2e249f-594c-428d-b840-81422b90c44f',
        answer: '가끔 있다',
        score: 2,
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '0327055e-0fac-46fa-a877-f6e8499f9731',
        answer: '자주 있다',
        score: 3,
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '00bd88ce-d9bc-489c-9bb8-bda471fec8d3',
        answer: '거의항상있다',
        score: 4,
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        created_at: new Date(),
        updated_at: new Date()
      },

      //* FREQUENCY (SEX)
      {
        id: 'e9deb0bc-9e1c-4f9f-a7df-95f4906cde47',
        answer: '전혀 없다',
        score: 0,
        survey_answer_sub_type_id: 'fa30d8f2-e4ea-4224-bc78-0c49bc6e5ff4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '80f14e3b-1011-4756-9767-078f9b907d57',
        answer: '드물게 있다',
        score: 1,
        survey_answer_sub_type_id: 'fa30d8f2-e4ea-4224-bc78-0c49bc6e5ff4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '0b9e11e4-4415-40c3-967b-41a39a213219',
        answer: '가끔 있다',
        score: 2,
        survey_answer_sub_type_id: 'fa30d8f2-e4ea-4224-bc78-0c49bc6e5ff4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '693fa2e8-e987-48f6-bef6-a583bb756d72',
        answer: '자주 있다',
        score: 3,
        survey_answer_sub_type_id: 'fa30d8f2-e4ea-4224-bc78-0c49bc6e5ff4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '33734f5f-fd0c-4fed-ae77-e2ebb6ce3d27',
        answer: '거의항상있다',
        score: 4,
        survey_answer_sub_type_id: 'fa30d8f2-e4ea-4224-bc78-0c49bc6e5ff4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '9866b826-7521-469f-bd51-2b8ab14aecf7',
        answer: '성생활을 하지 않는다',
        score: 0,
        survey_answer_sub_type_id: 'fa30d8f2-e4ea-4224-bc78-0c49bc6e5ff4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '90d20194-8718-4b7f-be1b-b1a41c7e9442',
        answer: '답하고 싶지 않다 ',
        score: 0,
        survey_answer_sub_type_id: 'fa30d8f2-e4ea-4224-bc78-0c49bc6e5ff4',
        created_at: new Date(),
        updated_at: new Date()
      },


      //* 일상생활 영향
      {
        id: '91dd4224-49eb-4dfb-a943-172dcd4cc37e',
        answer: '전혀 없다',
        score: 0,
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '99c079d3-72b6-488c-a5de-c3d15b5b8797',
        answer: '약간 있다',
        score: 1,
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '72ec5550-6e8c-45fb-b48e-f374e8610ad6',
        answer: '다소 있다',
        score: 2,
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '62b5a5b3-dde6-48fd-95f4-ad0744f928fc',
        answer: '많다',
        score: 3,
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b3b33afc-fd7b-40b9-8309-bb5b6a34638b',
        answer: '매우 많다',
        score: 4,
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        created_at: new Date(),
        updated_at: new Date()
      },

      //* 이상유무
      {
        id: '787611cb-b05c-4357-b57d-5b9237d52b8d',
        answer: '네',
        score: 0,
        survey_answer_sub_type_id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd27f566d-a225-4b13-b698-e928ec691142',
        answer: '아니오',
        score: 1,
        survey_answer_sub_type_id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('survey_answer_options', null, {});
  }
};
