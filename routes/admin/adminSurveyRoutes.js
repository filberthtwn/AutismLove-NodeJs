const express = require('express');
const adminSurveyController = require('../../controllers/admin/adminSurveyController');

const router = express.Router();
router.post('/', adminSurveyController.createSurvey);

module.exports = router;