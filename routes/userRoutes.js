const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', 
    authController.protect, 
    userController.getUserDetail
);

router.patch('/', 
    authController.protect, 
    userController.updateUser
);

router.patch('/update-alarm-setting', 
    authController.protect, 
    userController.updateAlarmSetting
);

router.patch('/visited', 
    authController.protect, 
    userController.updateVisited
);

module.exports = router;