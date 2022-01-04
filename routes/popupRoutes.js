const express = require('express');
const authController = require('../controllers/authController');
const popupController = require('../controllers/popupController');

const router = express.Router();
router
    .route('/')
    .get(
        authController.protect, 
        popupController.getPopup
    );
module.exports = router;