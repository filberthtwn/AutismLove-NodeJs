const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
router.post('/login', authController.login);
router.post('/login-naver', authController.loginNaver);
router.post('/login-kakao', authController.loginKakao);

router.post('/register', authController.register);
router.post('/logout', 
    authController.protect,
    authController.logout
);
router.post('/verify-otp', authController.verifyOTP);
router.get('/check-id', authController.checkId);
router.get('/find-id', authController.findId);
router.patch('/reset-password', authController.resetPassword);

router.post('/login-pattern', authController.loginPattern);
router.patch('/update-pattern', 
    authController.protect,
    authController.updatePattern
);

router.patch('/update-nickname', 
    authController.protect,
    authController.updateNickname
);

router
    .route('/check-phone')
    .get(authController.checkPhoneNumber);

/**
 * Testing Purpose
 */
router.patch('/reset-phone', authController.resetPhoneNumber);

module.exports = router;