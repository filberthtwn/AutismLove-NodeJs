const express = require('express');
const authController = require('../controllers/authController');
const injectionRouteController = require('../controllers/injectionRouteController');

const router = express.Router();
router
    .route('/')
    .patch( 
        authController.protect, 
        injectionRouteController.updateInjectionRoute
    )
    .get(
        authController.protect, 
        injectionRouteController.getAllInjectionRoute
    );

router.get('/last-injection', 
        authController.protect,
        injectionRouteController.getLastInjectionRoute);
        
module.exports = router;