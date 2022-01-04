const express = require('express');
const authController = require('../controllers/authController');
const utilController = require('../controllers/utilController');

const router = express.Router();
router.get('/check-anticancer-record-authority', 
    authController.protect, 
    utilController.getAnticancerRecordAuthority
);

router.get('/anc-side-effect', 
    authController.protect, 
    utilController.getANCSideEffect
);

module.exports = router;