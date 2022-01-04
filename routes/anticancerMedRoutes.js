const express = require('express');
const authController = require('../controllers/authController');
const anticancerController = require('../controllers/anticancerController');

const router = express.Router();
router.get('/', 
    authController.protect, 
    anticancerController.getAnticancerMedDetail
);

module.exports = router;