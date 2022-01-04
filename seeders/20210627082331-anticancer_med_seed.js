const { v4: uuidv4 } = require('uuid');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('anticancer_meds', [
      {
        id: 'fa3967c3-b6eb-4649-960c-18ffeba5147f',
        name: 'AC4차 + TC4차',
        identifier: 'AC_TC',
        description: '<p>A : 아드리아마이신/에이디마이신(독소루비신)</p><p>C : 엔독산(싸이클로포스파마이드)</p><p>T : 탁소텔(도세탁셀)</p><p><br></p><p>AC 먼저 투여 후 T를 투여하는 일정으로 진행되며, 일반적으로 각각 3주 간격으로 4회 투약해요.</p>',
        record_bg_color: "#3AC8DC",
        record_table_color: "#FFFFFF",
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '45511c8a-99b5-4db4-8724-84255de1561a',
        name: 'AC4차 + Paclitaxel12차',
        identifier: 'AC_PA',
        description: '<p>A : 아드리아마이신/에이디마이신(독소루비신)</p><p>C : 엔독산(싸이클로포스파마이드)</p><p>T : 탁소텔(도세탁셀)</p><p><br></p><p>AC 먼저 투여 후 T를 투여하는 일정으로 진행되며, 일반적으로 각각 3주 간격으로 4회 투약해요.</p>',
        record_bg_color: "#3AC8DC",
        record_table_color: "#FFFFFF",
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '15148c7b-c09f-48c9-adf3-3030848915e1',
        name: 'AC 4차',
        identifier: 'AC',
        description: '<p>A : 아드리아마이신/에이디마이신(독소루비신)</p><p>C : 엔독산(싸이클로포스파마이드)</p><p>T : 탁소텔(도세탁셀)</p><p><br></p><p>AC 먼저 투여 후 T를 투여하는 일정으로 진행되며, 일반적으로 각각 3주 간격으로 4회 투약해요.</p>',
        record_bg_color: "#3AC8DC",
        record_table_color: "#FFFFFF",
        anticancer_med_design_id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b304caf3-9347-4db3-931d-bd4a3cf47d51',
        name: "I Don't Know",
        identifier: 'I_DONT_KNOW',
        description: null,
        record_bg_color: "#000000",
        record_table_color: "#000000",
        anticancer_med_design_id: '30864454-70f9-4b25-90ae-3e700452c917',
        survey_id: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('anticancer_meds', null, {});
  }
};
