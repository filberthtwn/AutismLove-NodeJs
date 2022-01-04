const express = require('express');
const authController = require('../controllers/authController');
const anticancerController = require('../controllers/anticancerController');

const router = express.Router();
router.post('/', 
    authController.protect, 
    anticancerController.createAnticancerRecord
);

router.get('/', 
    authController.protect, 
    anticancerController.getAnticancerRecord
);

module.exports = router;