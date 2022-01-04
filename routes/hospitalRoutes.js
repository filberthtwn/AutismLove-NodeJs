const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

router.get('/', hospitalController.getAllHospital);
module.exports = router;