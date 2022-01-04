const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('side_effects', [
      {
        id: 'a9391f2a-b841-4428-bf89-69568c1e22b7',
        order: 0,
        name: '설사',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '0030d786-0dc3-4ca6-9cc8-28260d4394a5',
        order: 1,
        name: '탈모',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '51ead0d3-f235-49f1-916b-3735c3ba3164',
        order: 2,
        name: '구토(음식을 토함)',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'dfabab03-e7b7-45bb-8723-26f3d2b4cee3',
        order: 3,
        name: '근육통',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '8c2203b8-5ddf-4dd9-8002-bef5d586096a',
        order: 4,
        name: '식욕 감소',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2eaaa350-5aae-4e1c-bac1-63ef66ef60fc',
        order: 5,
        name: '입안헐음, 목따가움',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c20aa996-b8cb-4414-9542-d29d3ca7999d',
        order: 6,
        name: '손,발톱의 색깔 변화',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '376c15e1-a4c2-485d-97c9-3a14773299f6',
        order: 7,
        name: '손발저림(감각이 둔해짐)',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '950a6b40-1a3d-4fea-9426-49b1a16d7d2b',
        order: 8,
        name: '어지러움',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '0cfd03f7-6364-4a21-9f4c-785a3daab4fa',
        order: 9,
        name: '피로, 피곤함, 또는 기운 없음',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'aa088172-a221-4683-bb0d-e63815b45113',
        order: 10,
        name: '소변 색의 변화',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3c849cbd-5a70-404f-ada8-adb2ce507f24',
        order: 11,
        name: '몸이 춥고 떨림(오한)',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '7d15d4fb-eecf-4339-9e68-490ba74920e7',
        order: 12,
        name: '항암주사부위 통증, 부기, 빨개짐',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '5e0b8072-1aef-4083-89cb-a9c1154eed04',
        order: 13,
        name: '매스꺼움',
        description: null,
        survey_id: 'fa7b449b-83d4-4f7c-8b0c-ecb14ab91e54',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'efdf6df2-302d-49b7-bba3-bcc06932a499',
        order: 0,
        name: '설사',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'dee6505b-2a2d-48c9-959c-6aac25d35327',
        order: 1,
        name: '탈모',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'bcbafe6c-8f6e-4ac7-af91-ddfe725d72e7',
        order: 2,
        name: '구토(음식을 토함)',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a3d9dbdc-cc09-4f86-b5a1-4f92fe162ca1',
        order: 3,
        name: '근육통',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'fb972765-defa-4a6e-b98e-6be268dc6aca',
        order: 4,
        name: '식욕 감소',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '7e313ff5-ead2-4d55-8041-14f84017d43f',
        order: 5,
        name: '입안헐음, 목따가움',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '56e71b14-08b1-4402-a0cf-496bb61a4a17',
        order: 6,
        name: '손,발톱의 색깔 변화',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'e6dea239-e878-463b-9309-a9774c4c6d78',
        order: 7,
        name: '손발저림(감각이 둔해짐)',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '39b25e49-4d4f-44fb-a9a6-96d32b2298f4',
        order: 8,
        name: '어지러움',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '643ec905-eefa-4b91-b962-34ab1fdfdbf7',
        order: 9,
        name: '피로, 피곤함, 또는 기운 없음',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'acc5f5ab-24ad-4b63-8b0c-335bc7f212f1',
        order: 10,
        name: '소변 색의 변화',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd69fe806-cba6-4c64-ad73-c35a5ba2fba8',
        order: 11,
        name: '몸이 춥고 떨림(오한)',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c8a96a62-8546-41b8-af32-60f7bb0ca0ba',
        order: 12,
        name: '항암주사부위 통증, 부기, 빨개짐',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '96ca0d0b-4cfd-483f-b98b-d168577ba39d',
        order: 13,
        name: '매스꺼움',
        description: null,
        survey_id: '0416e9ba-d1b2-42be-a2b7-bf49e0e42fcf',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('side_effects', {
      id: { 
        [Op.in]: [
          'a9391f2a-b841-4428-bf89-69568c1e22b7',
          '0030d786-0dc3-4ca6-9cc8-28260d4394a5',
          '51ead0d3-f235-49f1-916b-3735c3ba3164',
          'dfabab03-e7b7-45bb-8723-26f3d2b4cee3',
          '8c2203b8-5ddf-4dd9-8002-bef5d586096a',
          '2eaaa350-5aae-4e1c-bac1-63ef66ef60fc',
          'c20aa996-b8cb-4414-9542-d29d3ca7999d',
          '376c15e1-a4c2-485d-97c9-3a14773299f6',
          '950a6b40-1a3d-4fea-9426-49b1a16d7d2b',
          '0cfd03f7-6364-4a21-9f4c-785a3daab4fa',
          'aa088172-a221-4683-bb0d-e63815b45113',
          '3c849cbd-5a70-404f-ada8-adb2ce507f24',
          '7d15d4fb-eecf-4339-9e68-490ba74920e7',
          '5e0b8072-1aef-4083-89cb-a9c1154eed04',
          
          'efdf6df2-302d-49b7-bba3-bcc06932a499',
          'dee6505b-2a2d-48c9-959c-6aac25d35327',
          'bcbafe6c-8f6e-4ac7-af91-ddfe725d72e7',
          'a3d9dbdc-cc09-4f86-b5a1-4f92fe162ca1',
          'fb972765-defa-4a6e-b98e-6be268dc6aca',
          '7e313ff5-ead2-4d55-8041-14f84017d43f',
          '56e71b14-08b1-4402-a0cf-496bb61a4a17',
          'e6dea239-e878-463b-9309-a9774c4c6d78',
          '39b25e49-4d4f-44fb-a9a6-96d32b2298f4',
          '643ec905-eefa-4b91-b962-34ab1fdfdbf7',
          'acc5f5ab-24ad-4b63-8b0c-335bc7f212f1',
          'd69fe806-cba6-4c64-ad73-c35a5ba2fba8',
          'c8a96a62-8546-41b8-af32-60f7bb0ca0ba',
          '96ca0d0b-4cfd-483f-b98b-d168577ba39d'
        ]
      }
    });
  }
};
