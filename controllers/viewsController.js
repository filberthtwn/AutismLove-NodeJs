
const catchAsync = require('../utils/catchAsync');
const models = require('./../models');
const AppError = require('../utils/appError');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const authController = require('./authController');
const strings = require('../constants/strings'); 

const response = {
    status: true,
    message: '',
    data: null
}

const signToken = (id, last_login_at) => {
    const token = jwt.sign({
        id: id,
        last_login_at: last_login_at
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token
}

exports.getDashboard = catchAsync(async (req, res, next) => {
    let token = req.cookies.token;
    console.log(token);
    if (!token){
        res.redirect('/login');
    }
    res.redirect('/user-management');
});

exports.getLogin = catchAsync(async (req, res, next) => {
    res.status(200).render('login', {
        path: '/login',
        url: req.originalUrl,
        strings: strings
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    const session = req.session;

    var user = await models.User.scope('showPassword').findOne({
        where:{
            email: email,
        }
    });

    if (!user || !(await user.isCorrectPassword(password, user.password))) {
        req.flash('response', {
            status: false,
            message: 'Incorrect email or password'
        });
        return res.redirect('/login');
    };

    user.password = undefined;
    user.last_login_at = Date.now();
    user = await user.save();
    
    const token = await signToken(user.id, user.last_login_at);
    res.cookie('token', token, {
        maxAge: 24 * 60 * (60 * 1000),
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    
    console.log("COOKIES:" + req.cookies.token);
    // console.log("SIGNED_COOKIES:" + req.signedCookies);

    res.redirect('/');
});

exports.logout = catchAsync(async (req, res, next) => {
    res.clearCookie("token");
    res.redirect('/login');
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        console.log("ABC");
        console.log(req.user);
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
};

exports.protect = catchAsync(async (req, res, next) => {    
    let token = req.cookies.token;
    console.log(token);
    if (!token) {
        /// Clear token cookies
        res.clearCookie('token');
        res.redirect('/login'); 
        return;
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
    });

    if (!freshUser || !freshUser.last_login_at) {
        res.clearCookie("token");
        res.redirect('/login');
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
    // req.tokenExp = decoded.exp;
    // req.token = token;

    next();
});