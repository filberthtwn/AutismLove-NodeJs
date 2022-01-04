const express = require('express');
const authController = require('../../controllers/authController');
const anticancerController = require('../../controllers/admin/adminAnticancerController');

const router = express.Router();
router.post('/', 
    authController.protect, 
    anticancerController.createAnticancerRecord
);
module.exports = router;