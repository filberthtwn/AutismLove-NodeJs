const express = require('express');
const authController = require('../controllers/authController');
const sideEffectRecordController = require('../controllers/sideEffectRecordController');

const router = express.Router();
router
    .route('/')
    .get(
        authController.protect, 
        sideEffectRecordController.getAllSideEffectRecord
    );

router
    .route('/:side_effect_id')
    .get(
        authController.protect, 
        sideEffectRecordController.getSideEffectRecordDetail
    );

router
    .route('/:id/memo')
    .patch(
        authController.protect, 
        sideEffectRecordController.updateSideEffectRecordMemo
    );

router
    .route('/:id/upload-image')
    .post(
        authController.protect, 
        sideEffectRecordController.checkSideEffectRecord,
        sideEffectRecordController.sideEffectRecordUpload,
        sideEffectRecordController.uploadSideEffectRecordImage
    );

module.exports = router;