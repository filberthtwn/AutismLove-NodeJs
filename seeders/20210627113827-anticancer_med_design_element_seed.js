const { v4: uuidv4 } = require('uuid');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('anticancer_med_design_elements', [
      {
        id: 'edd301a8-249a-4e51-a7c3-0a8080f1df8d',
        order: 0,
        name: '진단',
        color_hex: '#75ADD0',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c6da3d36-4352-4564-bea4-91a00508802b',
        order: 1,
        name: '수술',
        color_hex: '#75ADD0',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'e976f8e1-eb83-43be-81c1-b1574639c0b0',
        order: 2,
        name: 'AC1차',
        color_hex: '#FF859C',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '6f2e15b6-8588-44d7-bda1-4ae553669ecd',
        order: 3,
        name: 'AC2차',
        color_hex: '#FF859C',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '50ad5968-e2d1-4932-8682-71a0591831e5',
        order: 4,
        name: 'AC3차',
        color_hex: '#FF859C',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '33d39bbe-ce9e-45f0-8269-26f8356ade33',
        order: 5,
        name: 'AC4차',
        color_hex: '#FF859C',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c44af72c-5e13-42fc-963e-e330670f8dc0',
        order: 6,
        name: 'TC1차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a712d61b-bb06-4489-a0e9-05e075780f27',
        order: 7,
        name: 'TC2차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '1817edf1-26aa-4bbb-b65c-6e769860438b',
        order: 8,
        name: 'TC3차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd75d4027-8eb9-4a8a-9dd3-b7d295100ea3',
        order: 9,
        name: 'TC4차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c81d2534-c124-46e1-8fb9-7ec95e8e2c47',
        order: 10,
        name: '도착',
        color_hex: '#75ADD0',
        anticancer_med_design_id: '79d84da1-62fc-42c6-ae26-158390b732e3',
        created_at: new Date(),
        updated_at: new Date()
      },

      // AC4차 + Paclitaxel12차
      {
        id: '52b9a355-0d34-4902-a00e-d1853d0028bc',
        order: 0,
        name: '도착',
        color_hex: '#75ADD0',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c50e6f08-9a78-431e-afce-8fb9e79558e7',
        order: 1,
        name: '수술',
        color_hex: '#75ADD0',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'dedf8586-9208-42a1-b760-1a2f95e09b52',
        order: 2,
        name: 'AC1차',
        color_hex: '#FF859C',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '239795e5-9ed8-4f93-9e54-de33d78123f6',
        order: 3,
        name: 'AC2차',
        color_hex: '#FF859C',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '54b4f645-3c24-4f6b-ade8-c516b446ca2a',
        order: 4,
        name: 'AC3차',
        color_hex: '#FF859C',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '1f998ebc-c764-496d-bf64-55a6e5ed69b3',
        order: 5,
        name: 'AC4차',
        color_hex: '#FF859C',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '51a543aa-f990-46c6-8f90-d840893a634c',
        order: 6,
        name: 'Paclitaxel 1차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '91d15b8b-590d-43f5-a3d6-920c12401fd1',
        order: 7,
        name: 'Paclitaxel 2차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b31cab3e-3e00-4a08-9a44-4623b1090821',
        order: 8,
        name: 'Paclitaxel 3차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '211fe276-33be-4fbf-b91e-d3da798b69f6',
        order: 9,
        name: 'Paclitaxel 4차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'bfdb09e9-fa18-4bd6-8d2a-17fee4180aff',
        order: 10,
        name: 'Paclitaxel 5차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '89fc274f-a760-4c1f-9cc8-3b8ca37c3b7d',
        order: 11,
        name: 'Paclitaxel 6차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '9abdd3cd-7651-4e98-8580-8ac409341d73',
        order: 12,
        name: 'Paclitaxel 7차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '5b4f00b6-6f01-496a-9e51-18c679c03b0a',
        order: 13,
        name: 'Paclitaxel 8차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '61ae2db2-0598-4e9a-beff-d528b4c8e4b7',
        order: 14,
        name: 'Paclitaxel 9차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '39a2a552-0522-47cb-b28a-35a883682071',
        order: 15,
        name: 'Paclitaxel 10차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd91d4e1f-aa8d-4de0-805b-cb86d8f202ff',
        order: 16,
        name: 'Paclitaxel 11차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'f263a92c-fa78-4747-9c40-e647c733c4c8',
        order: 17,
        name: 'Paclitaxel 12차',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '49baba67-6ed4-41a6-b148-3c9fe26494a3',
        order: 18,
        name: '도착',
        color_hex: '#B4A5F2',
        anticancer_med_design_id: 'a99a5456-bb28-4850-8aab-43a32379fde6',
        created_at: new Date(),
        updated_at: new Date()
      },

      // AC4차
      {
        id: 'a35a99f2-f3f4-4ac8-95d2-6f467796cce6',
        order: 0,
        name: '진단',
        color_hex: '#75ADD0',
        anticancer_med_design_id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'fd8d1909-14ac-4b04-8dca-d8f95a372a6b',
        order: 1,
        name: '수술',
        color_hex: '#75ADD0',
        anticancer_med_design_id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '76abcc8e-78b2-4c81-ae3d-d8efa6119582',
        order: 2,
        name: 'AC1차',
        color_hex: '#FF859C',
        anticancer_med_design_id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b7727d3b-4d95-496d-bcdc-32a2a2fe06e4',
        order: 3,
        name: 'AC2차',
        color_hex: '#FF859C',
        anticancer_med_design_id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'af2b2c27-3c04-40ad-afce-beefc3b59411',
        order: 4,
        name: 'AC3차',
        color_hex: '#FF859C',
        anticancer_med_design_id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '5177fedf-82a8-4032-a1d3-5328fe720146',
        order: 5,
        name: 'AC4차',
        color_hex: '#FF859C',
        anticancer_med_design_id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '6542519e-a188-4680-aa06-7830c2e5d388',
        order: 6,
        name: '도착',
        color_hex: '#75ADD0',
        anticancer_med_design_id: 'c7361d63-cb96-4609-b6e3-6fbcde453181',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('anticancer_med_design_elements', {
      
    }, {});
  }
};
