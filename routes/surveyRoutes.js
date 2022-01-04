const express = require('express');
const authController = require('../controllers/authController');
const surveyController = require('../controllers/surveyController');

const router = express.Router();
router
    .route('')
    .get(authController.protect, 
    surveyController.getAllSurvey)
    .post(authController.protect, 
        surveyController.createSurvey);

module.exports = router;