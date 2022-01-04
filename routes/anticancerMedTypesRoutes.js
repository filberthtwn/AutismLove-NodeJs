const express = require('express');
const authController = require('../controllers/authController');
const injectionRouteController = require('../controllers/injectionRouteController');

const router = express.Router();
router
    .route('/')
    .get( 
        authController.protect, 
        injectionRouteController.updateInjectionRoute
    );
module.exports = router;