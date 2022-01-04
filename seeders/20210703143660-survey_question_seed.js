const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('survey_questions', [
      {
        id: '006751fd-644f-47ae-abef-59b1166a0501',
        question: '지난 일주일 동안, 피로, 피곤함, 또는 기운 없음이 가장 심할 때는 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '0cfd03f7-6364-4a21-9f4c-785a3daab4fa',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '035ab05c-10a5-4d0e-bcf4-87b75a2f8d6b',
        question: '지난 일주일 동안, 손발이 저리거나 감각이 둔해지는 증상이 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '376c15e1-a4c2-485d-97c9-3a14773299f6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '0650c873-8e1a-4375-9992-7a6789e4f812',
        question: '지난 일주일 동안, 입안이 헐어서 아프거나 목이 따가운 증상이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '7e313ff5-ead2-4d55-8041-14f84017d43f',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '12fa9086-df8c-4e22-aeaf-b4df7dbec4bd',
        question: '지난 일주일 동안, 구토를 얼마나 자주 했습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: '51ead0d3-f235-49f1-916b-3735c3ba3164',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '16749a0b-347d-4d9d-8b9a-516853bbb937',
        question: '지난 일주일 동안, 항암 주사 맞은 부위가 아프거나 붓고 빨개진 적이 있습니까?',
        survey_answer_sub_type_id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        side_effect_id: 'c8a96a62-8546-41b8-af32-60f7bb0ca0ba',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '1a831d8c-66d6-4638-ba21-d77ddb11a99c',
        question: '지난 일주일 동안, 손톱이나 발톱의 색깔이 변했습니까?',
        survey_answer_sub_type_id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        side_effect_id: 'c20aa996-b8cb-4414-9542-d29d3ca7999d',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '1cc676b6-02f3-4549-b49b-7737f69a5cc6',
        question: '지난 일주일 동안, 입안이 헐어서 아프거나 목이 따가운 증상이 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '7e313ff5-ead2-4d55-8041-14f84017d43f',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '22e48ffb-4bf9-4035-b93f-17b51a48ead4',
        question: '지난 일주일 동안, 몸이 춥고 떨림(오한)이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '3c849cbd-5a70-404f-ada8-adb2ce507f24',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '263f93d3-e50d-4ce9-a0d7-6a2f7b5c3f4c',
        question: '지난 일주일 동안, 근육통이 얼마나 자주 있었습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: 'a3d9dbdc-cc09-4f86-b5a1-4f92fe162ca1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '33d34d06-9c30-4241-a4a0-557a1732ac99',
        question: '지난 일주일 동안, 근육통이 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: 'dfabab03-e7b7-45bb-8723-26f3d2b4cee3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '398e0beb-7173-473b-bedc-47be15f3654e',
        question: '지난 일주일 동안, 소변 색이 변했습니까?',
        survey_answer_sub_type_id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        side_effect_id: 'acc5f5ab-24ad-4b63-8b0c-335bc7f212f1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '44d6107d-1303-4b5d-956c-854975e66c77',
        question: '지난 일주일 동안, 몸이 춥고 떨림(오한)이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: 'd69fe806-cba6-4c64-ad73-c35a5ba2fba8',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '483c4acb-4032-437e-857f-229c1528dfe2',
        question: '지난 일주일 동안, 식욕 감소가 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: 'fb972765-defa-4a6e-b98e-6be268dc6aca',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '4a4f3c6a-7259-4055-9248-2329a3c7a2a1',
        question: '지난 일주일 동안, 피로, 피곤함, 또는 기운 없음이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '643ec905-eefa-4b91-b962-34ab1fdfdbf7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '4bca7cc3-5dfb-4087-8dac-12e8bd4bb69c',
        question: '지난 일주일 동안, 손발이 저리거나 감각이 둔해지는 증상이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: 'e6dea239-e878-463b-9309-a9774c4c6d78',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '52f5f090-3ab0-4ac1-a5ab-5b0c473de535',
        question: '지난 일주일 동안, 식욕 감소가 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: 'fb972765-defa-4a6e-b98e-6be268dc6aca',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '5bdcdd25-146d-4361-88b1-5e9d161c5959',
        question: '지난 일주일 동안, 메스꺼움을 얼마나 자주 느꼈습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: '5e0b8072-1aef-4083-89cb-a9c1154eed04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '5ff09cca-446c-4fc6-863f-234b67a1dbd5',
        question: '지난 일주일 동안, 항암 주사 맞은 부위가 아프거나 붓고 빨개진 적이 있습니까?',
        survey_answer_sub_type_id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        side_effect_id: '7d15d4fb-eecf-4339-9e68-490ba74920e7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '6053d2aa-6c48-47c5-bf4a-32eb418bb378',
        question: '지난 일주일 동안, 입안이 헐어서 아프거나 목이 따가운 증상이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '2eaaa350-5aae-4e1c-bac1-63ef66ef60fc',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '69d62336-590f-4388-b960-f205654f0d36',
        question: '지난 일주일 동안, 메스꺼움을 얼마나 자주 느꼈습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: '96ca0d0b-4cfd-483f-b98b-d168577ba39d',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '73375cc0-0ac4-4321-874c-587de34722d1',
        question: '지난 일주일 동안, 어지러움이 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '39b25e49-4d4f-44fb-a9a6-96d32b2298f4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '7aeb2360-a38b-4291-9ea1-75da3724d555',
        question: '지난 일주일 동안, 구토가 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '51ead0d3-f235-49f1-916b-3735c3ba3164',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '7f764de2-2a28-469f-860e-6a4e1202c963',
        question: '지난 일주일 동안, 어지러움이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '39b25e49-4d4f-44fb-a9a6-96d32b2298f4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '84b3004e-5b36-4397-bb9b-f2fe43788968',
        question: '지난 일주일 동안, 탈모 증상이 있었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: 'dee6505b-2a2d-48c9-959c-6aac25d35327',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '89ce9abf-a8a4-4ea0-9ccc-59050269be52',
        question: '지난 일주일 동안, 손발이 저리거나 감각이 둔해지는 증상이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '376c15e1-a4c2-485d-97c9-3a14773299f6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '8ae9fc9f-64ac-4069-b347-4a9e9268aaf9',
        question: '지난 일주일 동안, 몸이 춥고 떨림(오한)이 얼마나 자주 있었습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: 'd69fe806-cba6-4c64-ad73-c35a5ba2fba8',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '8b979ffe-6a83-455c-9a40-8c3f9fd2d8a9',
        question: '지난 일주일 동안, 피로, 피곤함, 또는 기운 없음이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '0cfd03f7-6364-4a21-9f4c-785a3daab4fa',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '92808b39-60a0-42f7-b928-2076d959a692',
        question: '지난 일주일 동안, 입안이 헐어서 아프거나 목이 따가운 증상이 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '2eaaa350-5aae-4e1c-bac1-63ef66ef60fc',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '96797d87-9df9-44e2-815a-36740bec9733',
        question: '지난 일주일 동안, 메스꺼움이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '5e0b8072-1aef-4083-89cb-a9c1154eed04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '96c1763b-f80a-48a0-8a9c-845acf59aa3a',
        question: '지난 일주일 동안, 어지러움이 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '950a6b40-1a3d-4fea-9426-49b1a16d7d2b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '9dc81759-2c24-4789-a10e-d0bc013c99e0',
        question: '지난 일주일 동안, 근육통이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: 'dfabab03-e7b7-45bb-8723-26f3d2b4cee3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '9fe09206-d1fe-4706-9082-ed8e37cc762c',
        question: '지난 일주일 동안, 손톱이나 발톱의 색깔이 변했습니까?',
        survey_answer_sub_type_id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        side_effect_id: '56e71b14-08b1-4402-a0cf-496bb61a4a17',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a4322fd9-78f6-4c74-9849-765243c0e274',
        question: '지난 일주일 동안, 근육통이 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: 'a3d9dbdc-cc09-4f86-b5a1-4f92fe162ca1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a92c0788-75a4-4487-921d-153d583947a0',
        question: '지난 일주일 동안, 무른 변을 보거나 설사를 한 적이 얼마나 자주 있었습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: 'a9391f2a-b841-4428-bf89-69568c1e22b7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b2a38bbb-e479-469a-a702-7f1ad43a0021',
        question: '지난 일주일 동안, 피로, 피곤함, 또는 기운 없음이 가장 심할 때는 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '643ec905-eefa-4b91-b962-34ab1fdfdbf7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b6ed2fcd-3489-4546-8458-29634741eed3',
        question: '지난 일주일 동안, 식욕 감소가 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '8c2203b8-5ddf-4dd9-8002-bef5d586096a',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b7f289cd-fb44-4b7e-bb98-3e08296c7557',
        question: '지난 일주일 동안, 무른 변을 보거나 설사를 한 적이 얼마나 자주 있었습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: 'efdf6df2-302d-49b7-bba3-bcc06932a499',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b9f56865-9310-4606-99e4-73fbc10d3cd5',
        question: '지난 일주일 동안, 어지러움이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '950a6b40-1a3d-4fea-9426-49b1a16d7d2b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'bba3f532-30d5-4f75-a238-af416400b64f',
        question: '지난 일주일 동안, 구토가 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: 'bcbafe6c-8f6e-4ac7-af91-ddfe725d72e7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'bfa5735b-5d77-442a-a5d4-81bdd3bddeea',
        question: '지난 일주일 동안, 근육통이 얼마나 자주 있었습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: 'a9391f2a-b841-4428-bf89-69568c1e22b7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'ccbc40aa-63bd-489c-bcf1-78baf97735a5',
        question: '지난 일주일 동안, 손발이 저리거나 감각이 둔해지는 증상이 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: 'e6dea239-e878-463b-9309-a9774c4c6d78',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd0e9238e-3db9-43ce-9289-87f288117d45',
        question: '지난 일주일 동안, 식욕 감소가 일상생활에 얼마나 지장을 주었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '8c2203b8-5ddf-4dd9-8002-bef5d586096a',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'dcf148a4-4795-4da1-a7c0-f252b98e3bc5',
        question: '지난 일주일 동안, 소변 색이 변했습니까?',
        survey_answer_sub_type_id: 'f5ff4949-f12b-40a6-8d59-887520553110',
        side_effect_id: 'aa088172-a221-4683-bb0d-e63815b45113',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'de0880ea-36b5-44d2-9fe7-cae47d6bc4dd',
        question: '지난 일주일 동안, 탈모 증상이 있었습니까?',
        survey_answer_sub_type_id: 'cc0ab711-9c4e-4c87-822d-d8cb173bf6ae',
        side_effect_id: '0030d786-0dc3-4ca6-9cc8-28260d4394a5',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'e0d8e5f8-f6ba-49f4-861b-a2979d6b0bd4',
        question: '지난 일주일 동안, 메스꺼움이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: '96ca0d0b-4cfd-483f-b98b-d168577ba39d',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'e69ff9fe-8e45-46b4-b8ee-5a2538e267a7',
        question: '지난 일주일 동안, 몸이 춥고 떨림(오한)이 얼마나 자주 있었습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: '3c849cbd-5a70-404f-ada8-adb2ce507f24',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'e79cadab-0c54-406e-aa20-e5596e8eb7d2',
        question: '지난 일주일 동안, 구토를 얼마나 자주 했습니까?',
        survey_answer_sub_type_id: '2b27c01c-b3b8-4af3-944b-489263e33218',
        side_effect_id: 'bcbafe6c-8f6e-4ac7-af91-ddfe725d72e7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'ec0f1085-f49e-47a6-86be-7524feda4f1e',
        question: '지난 일주일 동안, 근육통이 가장 심할 때는 어느 정도였습니까?',
        survey_answer_sub_type_id: 'f3e0d876-9c19-4cb8-bd9c-a150771f4481',
        side_effect_id: 'a3d9dbdc-cc09-4f86-b5a1-4f92fe162ca1',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('survey_questions', {
      id: { 
        [Op.in]: [
          '006751fd-644f-47ae-abef-59b1166a0501',
          '035ab05c-10a5-4d0e-bcf4-87b75a2f8d6b',
          '0650c873-8e1a-4375-9992-7a6789e4f812',
          '12fa9086-df8c-4e22-aeaf-b4df7dbec4bd',
          '16749a0b-347d-4d9d-8b9a-516853bbb937',
          '1a831d8c-66d6-4638-ba21-d77ddb11a99c',
          '1cc676b6-02f3-4549-b49b-7737f69a5cc6',
          '22e48ffb-4bf9-4035-b93f-17b51a48ead4',
          '263f93d3-e50d-4ce9-a0d7-6a2f7b5c3f4c',
          '33d34d06-9c30-4241-a4a0-557a1732ac99',
          '398e0beb-7173-473b-bedc-47be15f3654e',
          '44d6107d-1303-4b5d-956c-854975e66c77',
          '483c4acb-4032-437e-857f-229c1528dfe2',
          '4a4f3c6a-7259-4055-9248-2329a3c7a2a1',
          '4bca7cc3-5dfb-4087-8dac-12e8bd4bb69c',
          '52f5f090-3ab0-4ac1-a5ab-5b0c473de535',
          '5bdcdd25-146d-4361-88b1-5e9d161c5959',
          '5ff09cca-446c-4fc6-863f-234b67a1dbd5',
          '6053d2aa-6c48-47c5-bf4a-32eb418bb378',
          '69d62336-590f-4388-b960-f205654f0d36',
          '73375cc0-0ac4-4321-874c-587de34722d1',
          '7aeb2360-a38b-4291-9ea1-75da3724d555',
          '7f764de2-2a28-469f-860e-6a4e1202c963',
          '84b3004e-5b36-4397-bb9b-f2fe43788968',
          '89ce9abf-a8a4-4ea0-9ccc-59050269be52',
          '8ae9fc9f-64ac-4069-b347-4a9e9268aaf9',
          '8b979ffe-6a83-455c-9a40-8c3f9fd2d8a9',
          '92808b39-60a0-42f7-b928-2076d959a692',
          '96797d87-9df9-44e2-815a-36740bec9733',
          '96c1763b-f80a-48a0-8a9c-845acf59aa3a',
          '9dc81759-2c24-4789-a10e-d0bc013c99e0',
          '9fe09206-d1fe-4706-9082-ed8e37cc762c',
          'a4322fd9-78f6-4c74-9849-765243c0e274',
          'a92c0788-75a4-4487-921d-153d583947a0',
          'b2a38bbb-e479-469a-a702-7f1ad43a0021',
          'b6ed2fcd-3489-4546-8458-29634741eed3',
          'b7f289cd-fb44-4b7e-bb98-3e08296c7557',
          'b9f56865-9310-4606-99e4-73fbc10d3cd5',
          'bba3f532-30d5-4f75-a238-af416400b64f',
          'bfa5735b-5d77-442a-a5d4-81bdd3bddeea',
          'ccbc40aa-63bd-489c-bcf1-78baf97735a5',
          'd0e9238e-3db9-43ce-9289-87f288117d45',
          'dcf148a4-4795-4da1-a7c0-f252b98e3bc5',
          'de0880ea-36b5-44d2-9fe7-cae47d6bc4dd',
          'e0d8e5f8-f6ba-49f4-861b-a2979d6b0bd4',
          'e69ff9fe-8e45-46b4-b8ee-5a2538e267a7',
          'e79cadab-0c54-406e-aa20-e5596e8eb7d2',
          'ec0f1085-f49e-47a6-86be-7524feda4f1e'
        ]
      }
    });
  }
};
