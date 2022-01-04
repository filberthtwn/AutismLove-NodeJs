const AppError = require('../utils/appError');
const { Op } = require("sequelize");
const dotenv = require('dotenv');
const crypto = require('crypto');
const {promisify} = require('util');
const catchAsync = require('../utils/catchAsync');
const models = require('./../models');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const strings = require('../constants/strings'); 
const request = require('request');
const messages = require('../constants/messages');

const ROUTE_TITLES = require('../constants/routeTitles');
const MEDICINE_TYPE = require('../constants/medicineType');
const INJECTION_STATUS = require('../constants/injectionStatus');

const admin = require("../firebaseConfig");

const firebase = require("firebase");
const config = {
    apiKey: "AIzaSyBTNKDRDduNDyzD_0xil0qEPIZ6XXSGD0I",
    authDomain: "biock-71c59.firebaseapp.com",
    databaseURL: "https://biock-71c59-default-rtdb.firebaseio.com",
    projectId: "biock-71c59",
    storageBucket: "biock-71c59.appspot.com",
    messagingSenderId: "323396265525",
    appId: "1:323396265525:web:6d6865f292ae0bdcafb37c"
};
firebase.initializeApp(config);

dotenv.config({
    path: './config.env'
});

const signToken = (id, last_login_at) => {
    return jwt.sign({
        id: id,
        last_login_at: last_login_at
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const assignRoutes = async (user, next)  => {
    var totalRoute = 0;
    var injectionRoutesTemp = await models.InjectionRoute.findOne({
        where: {
            user_id: user.id
        }
    })

    if (injectionRoutesTemp){
        return next(new AppError('Route already created', 400));
    }

    const anticancer_med_design_elements = await models.AnticancerMedDesignElement.findAll({
        where: {
            anticancer_med_design_id: user.anticancer_med.anticancer_med_design.id
        },
        order: [
            ['order']
        ]
    })

    var injectionRoutesTemp = []
    for (const [index, val] of anticancer_med_design_elements.entries()) {
        injectionRoutesTemp.push({
            date: null,
            anticancer_med_design_element_id: val.dataValues.id,
            user_id: user.id,
            status: INJECTION_STATUS.IN_COMING
        }); 
        
        if (index < 2){
            injectionRoutesTemp[index].status = INJECTION_STATUS.FINISHED;
            if (index == 1){
                if (user.surgery_date){
                    injectionRoutesTemp[index].date = user.surgery_date
                }
            }
        }

        //* Set status on going after surgery route
        // if (index == 2){
        //     injectionRoutesTemp[index].status = INJECTION_STATUS.ON_GOING;
        // }
    }

    await models.InjectionRoute.bulkCreate(injectionRoutesTemp)
}

exports.login = catchAsync(async (req, res, next) => {
    const {email, password, fcm_token} = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    let user = await models.User.scope('showPassword').findOne({
        where: {
            email: email,
        },
        attributes: { include: ['pattern'] },
        include: [{
            model: models.AnticancerMed,
            as: 'anticancer_med',
            include: [{
                model: models.AnticancerMedDesign,
                as: 'anticancer_med_design'
            }]
        }]
    });

    if (!user || !(await user.isCorrectPassword(password, user.password)) || user.naver_id || user.kakao_id) {
        return next(new AppError(messages.INCORRECT_ID_OR_PASSWORD(), 403));
    };

    if (!user.is_active) {
        return next(new AppError(strings.THIS_IS_INACTIVE_ACCOUNT(), 403));
    }

    const filteredUser = user.toJSON();

    user.password = undefined;
    user.pattern = undefined;
    user.fcm_token = fcm_token;
    user.last_login_at = Date.now();
    user = await user.save();
    
    const token = signToken(user.id, user.last_login_at);

    //* Setup is_pattern_created
    filteredUser.is_pattern_created = (filteredUser.pattern) ? true : false;
    filteredUser.pattern = undefined;
    filteredUser.password = undefined;
    filteredUser.fcm_token = undefined;

    res.status(201).json({
        success: true,
        message: 'Login successful',
        data: {
            token: token,
            user: filteredUser
        }
    });
});

exports.loginPattern = catchAsync(async (req, res, next) => {
    const { email, pattern } = req.body;
    var user = await models.User.findOne(
        { 
            where: {
                email: email
            }, 
            attributes: {
                include: ['pattern']
            },
            include: [{
                model: models.AnticancerMed,
                as: 'anticancer_med',
                include: [{
                    model: models.AnticancerMedDesign,
                    as: 'anticancer_med_design'
                }]
            }]
        }
    );

    console.log(user);
    
    if (!user || !(await user.isCorrectPattern(pattern, user.pattern))) {
        return next(new AppError('Incorrect pattern', 403));
    }

    if (!user.is_active) {
        return next(new AppError(strings.THIS_IS_INACTIVE_ACCOUNT(), 403));
    }

    user = await models.User.update({
        last_login_at: Date.now()
    }, {
        where: { id: user.id },
        returning: true,
        plain: true,
    });

    const token = signToken(user[1].id, user[1].last_login_at);

    user = user[1].toJSON();
    user.is_pattern_created = (user.pattern) ? true : false;

    delete user.password;
    delete user.pattern;

    res.status(201).json({
        success: true,
        message: 'Login successful',
        data: {
            token: token,
            user: user
        }
    });
});

exports.loginNaver = catchAsync(async (req, res, next) => {
    const { naver_id, fcm_token } = req.body;

    var user = await models.User.findOne({
        where: {
            naver_id: naver_id
        },
        include: [{
            model: models.AnticancerMed,
            as: 'anticancer_med',
            include: [{
                model: models.AnticancerMedDesign,
                as: 'anticancer_med_design'
            }]
        }]
    });

    if (!user){
        return next(new AppError("USER_NOT_FOUND", 400));
    }

    if (!user.is_active) {
        return next(new AppError(strings.THIS_IS_INACTIVE_ACCOUNT(), 403));
    }

    user.last_login_at = Date.now();
    user.fcm_token = fcm_token;
    user = await user.save();

    const token = signToken(user.id, user.last_login_at);

    user = user.toJSON();
    user.is_pattern_created = (user.pattern) ? true : false;

    delete user.password;
    delete user.pattern;

    res.status(201).json({
        success: true,
        message: 'Login NAVER successful',
        data: {
            token: token,
            user: user
        }
    });
});

exports.loginKakao = catchAsync(async (req, res, next) => {
    const { kakao_id, fcm_token } = req.body;

    var user = await models.User.findOne({
        where: {
            kakao_id: kakao_id
        },
        include: [{
            model: models.AnticancerMed,
            as: 'anticancer_med',
            include: [{
                model: models.AnticancerMedDesign,
                as: 'anticancer_med_design'
            }]
        }]
    });

    if (!user){
        return next(new AppError("USER_NOT_FOUND", 400));
    }

    if (!user.is_active) {
        return next(new AppError(strings.THIS_IS_INACTIVE_ACCOUNT(), 403));
    }

    user.last_login_at = Date.now();
    user.fcm_token = fcm_token;
    user = await user.save();

    const token = signToken(user.id, user.last_login_at);

    user = user.toJSON();
    user.is_pattern_created = (user.pattern) ? true : false;
    
    delete user.password;
    delete user.pattern;

    res.status(201).json({
        success: true,
        message: 'Login KAKAO successful',
        data: {
            token: token,
            user: user
        }
    });
});

exports.updatePattern = catchAsync(async (req, res, next) => {
    const user = await models.User.findOne({
        where: {
            email: req.user.email
        },
        attributes: {
            include: ['pattern']
        }
    })

    user.pattern = req.body.pattern;
    user.save();

    //* Parse object to hash map
    var filteredUser = {};
    for (const key in user["dataValues"]) {
        filteredUser[key] = user[key];
    }
    filteredUser.is_pattern_created = (user.pattern) ? true : false;

    res.status(201).json({
        success: true,
        message: 'Update pattern successful',
        data: {
            user: filteredUser
        }
    });
});

exports.updateNickname = catchAsync(async (req, res, next) => {
    const user = await req.user.update(
        { nickname: req.body.nickname },
        { 
            where: {id: req.user.id},
            individualHooks: true,
            returning: true,
            plain: true,
        },
    );
    
    res.status(201).json({
        success: true,
        message: 'Update pattern successful',
        data: {
            user: user
        }
    });
});

exports.register = catchAsync(async (req, res, next) => {
    if (req.body.anticancer_med){
        const anticancerMed = await models.AnticancerMed.findOne({
            where: { identifier: req.body.anticancer_med }
        })
    
        if (!anticancerMed){
            return next(new AppError('Anticancer Medicine undefined', 400));
        }
    
        req.body.anticancer_med_id = anticancerMed.id;
    }

    // Register user to firebase for OTP Verification
    await admin.auth().getUserByEmail(req.body.email).then({}).catch(async (err) => {
        // console.log("(DEBUG) ERROR CODE");
        // console.log(err.code);
        
        if (err.code === 'auth/user-not-found') {      
            try {
                await admin.auth().createUser({
                    email: req.body.email,
                    password: req.body.password,
                    phoneNumber: req.body.phone_number,
                })
            } catch (err) {
                if (err.code !== 'auth/phone-number-already-exists') { 
                    return next(new AppError(err.message, 400));
                }
            }
        }
    });

    if(req.body.naver_id && req.body.kakao_id){
        return next(new AppError('Please input naver_id or kakao_id only', 400));
    }

    if(req.body.naver_id || req.body.kakao_id){
        const snsId = (req.body.naver_id) ? req.body.naver_id : req.body.kakao_id;
        req.body.password = `sns-${snsId}`;
    }

    var user = await models.User.create(req.body);
    user = await models.User.findOne({
        where: {
            id: user.id,
        },
        include: [{
            model: models.AnticancerMed,
            as: 'anticancer_med',
            include: [{
                model: models.AnticancerMedDesign,
                as: 'anticancer_med_design',
            }]
        }]
    });

    if (user.anticancer_med){
        await assignRoutes(user, next);
    }

    res.status(201).json({
        success: true,
        message: 'Register successful',
        data: {
            user: user
        }
    });
});

exports.checkId = catchAsync(async (req, res, next) => {
    const user = await models.User.findOne({
        where: {
            email: req.query.email
        }
    })

    res.status(200).json({
        success: true,
        message: 'Check ID successful',
        data: {
            isAvailable: (user) ? false : true,
        }
    });
});

exports.findId = catchAsync(async (req, res, next) => {
    const { token } = req.query;

    if (!token){
        return next(new AppError('Field token required', 400));
    }
    
    await verifyFbToken(token);

    const user = await models.User.findOne(
        { where: {name: req.query.name} },
    )

    if (!user){
        return next(new AppError('User not found', 400));
    }

    res.status(201).json({
        success: true,
        message: 'Find ID successful',
        data: {
            email: user.email
        }
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { token, phone_number, new_password } = req.body;

    // Verify Firebase Token
    await verifyFbToken(token)
    
    const user = await models.User.findOne({
        where: {
            phone_number: phone_number
        }
    });
    
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = new_password;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Password reset successful',
        data: {
            user: user
        }
    });
});

exports.checkPhoneNumber = catchAsync(async (req, res, next) => {
    var { phone_number } = req.query;

    if(phone_number.charAt(0) == ' '){
        phone_number = phone_number.replace(' ' , '+')
    }

    const user = await models.User.findOne({
        where: { phone_number: phone_number }
    })

    if (user){
        var email = user.email;
        if (email.indexOf("@") > 0){
            email = email.substring(0, 1) + '**@' + email.substring(email.indexOf("@") + 1, (email.indexOf("@") + 1) + 1)  + '**.com';
        }else{
            email = email.substring(0, 1) + "**";
        }
        return next(new AppError(`${email} 으로 회원가 입 하셨습니다`, 400));
    }

    return res.status(200).json({
        success: true,
        message: 'Phone number available',
        data: null
    });
})

exports.logout = catchAsync(async (req, res, next) => {
    let user = await models.User.findOne(
        { id: req.user.id },
    );

    user.last_login_at = null;
    user = await user.save();

    res.status(201).json({
        success: true,
        message: 'Logout successful',
        data: {
            user: user
        }
    });
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
    let data = {};

    if (!req.body.id_token){
        return next(new AppError('Field id_token required', 400));
    }

    const user = await models.User.findOne({
        where: {
            phone_number: req.body.phone_number
        }
    });

    if (!user){
        return next(new AppError('User not found', 400));
    }

    switch (req.body.action) {
        case 'RESET_PASSWORD':
            console.log(user.password_reset_token);
            const resetToken = user.createPasswordResetToken();
            console.log(resetToken);
            await user.save();

            console.log(user.password_reset_token);
            console.log(user.password_reset_token);

            data = {
                reset_token: resetToken
            };

            console.log(data);
            
            break;  
        default:
            return next(new AppError('Action undefined', 400));
    }

    res.status(201).json({
        success: true,
        message: 'Verify OTP successfull',
        data: data
    });
});

exports.protect = catchAsync(async (req, res, next) => {

    let token;

    //* Check Token Existing
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401))
    }

    //* Check token blacklist status
    // const blacklistToken = await BlacklistToken.findOne({ 'token': token })
    // if (blacklistToken){
    //     return next(new AppError('Invalid token!', 401))
    // }

    //* Validate Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //* Check Token Belonging to User
    const freshUser = await models.User.findOne({
        where: { 
            id: decoded.id,
        },
        attributes: {
            include: ['last_login_at']
        },
        include: [{
            model: models.AnticancerMed,
            as: 'anticancer_med',
            include: [{
                model: models.AnticancerMedDesign,
                as: 'anticancer_med_design'
            }]
        }]
    });

    if (!freshUser || !freshUser.last_login_at) {
        return next(new AppError('Invalid token!', 401));
    }

    if (!freshUser.is_active){
        return next(new AppError('Account deactived!', 401));
    }

    //* Check If User Change Password After Token Was Issued
    // if (freshUser.isPasswordChanged(decoded.iat)) {
    //     return next(new AppError('Invalid token!', 401))
    // }

    //* Check User Active Status    
    // if (!freshUser.is_active) {
    //     return next(new AppError('Account was terminated!', 403))
    // }

    //* Grand Access to Protected Route
    req.user = freshUser;   
    req.tokenExp = decoded.exp;
    req.token = token;

    next();
});

/**
 * Testing Purpose
 */
exports.resetPhoneNumber = catchAsync(async (req, res, next) => {
    const user = await models.User.update({
        phone_number: ''
    },{
        where: {
            phone_number: '+6287760765346'
        },
        returning: true,
        plain: true
    })

    res.status(201).json({
        success: true,
        message: 'Reset phone number successful',
        data: {
            user: user[1]
        }
    });
})

const verifyFbToken = async (token) => {
    const userFb = await admin.auth().verifyIdToken(token);
    if (!userFb){
        return next(new AppError('User not found', 400));
    }
}