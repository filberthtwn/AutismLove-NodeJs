
const express = require('express');
const viewsController = require('../../controllers/viewsController');
const feUserController = require('../../controllers/frontend/feUserController');

const router = express.Router();

router.use(viewsController.protect);

router.route('/')
    .get(feUserController.getUserManagement);

router.route('/refresh')
    .get(feUserController.refreshUsers);

router.route('/download-excel')
    .get(feUserController.userExcelDownload);

router.route('/:id')
    .get(feUserController.getUserDetail)
    .post(feUserController.updateUser);

router.route('/:id/change-password')
    .patch(feUserController.updatePassword);

router.route('/:id/status')
    .post(feUserController.updateUserStatus);

module.exports = router;
