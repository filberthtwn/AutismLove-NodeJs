const express = require('express');
const adminHospitalController = require('../../controllers/admin/adminHospitalController');

const router = express.Router();
router.post('/', adminHospitalController.createHospital);

module.exports = router;