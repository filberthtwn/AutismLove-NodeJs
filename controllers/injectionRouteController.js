const AppError = require('../utils/appError');
const { Op } = require("sequelize");
const catchAsync = require('../utils/catchAsync');
const models = require('../models');
const INJECTION_STATUS = require('../constants/injectionStatus');
const moment = require('moment');

exports.updateInjectionRoute = catchAsync(async (req, res, next) => {
    const { date } = req.body;

    // Get all current user injection route
    const injectionRoutes = await models.InjectionRoute.findAll({
        where: {
            user_id: req.user.id
        },
        include: [
            {
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element',
                attributes: { exclude: ['anticancer_med_design_id'] },
                where: {
                    name: {
                        [Op.not]: ['진단', '수술'],
                    }
                }
            }
        ],
        order: [
            ['anticancer_med_design_element', 'order', 'ASC']
        ]
    })

    if (injectionRoutes.length == 0){
        return next(new AppError('Please fill anticancer med. type', 400));
    }

    const firstInjectionRoute = injectionRoutes[0];

    // Return error when first injection date already filled
    if (firstInjectionRoute.date){
        return next(new AppError('First injection date already filled', 400));
    }
    
    // Return error when first injection route date is equal or less than surgery date
    if (date <= req.user.surgery_date){
        return next(new AppError('First injection route date must be more than surgery date'))
    }

    // Search anticancer med by user anticancer_med_id
    const anticancerMed = await models.AnticancerMed.findOne({
        where: { 
            id: req.user.anticancer_med.id
        }
    });

    // Return error if anticancer med isn't associated to any survey
    if (!anticancerMed.survey_id){
        return next(new AppError('No survey associated to this anticancer med. type'))
    }
    
    // Update first injection route date
    const injectionRoute = await injectionRoutes[0].update({
        date: date,
        status: (injectionRoutes.length > 1) ? INJECTION_STATUS.ON_GOING : INJECTION_STATUS.FINISHED
    },{
        where: {
            id: req.user.id
        },
        attributes: { exclude: ['anticancer_med_design_id'] },
        returning: true,
        plain: true,
    });

    // Find all side effect associated to survey
    const sideEffects = await models.SideEffect.findAll({
        where: {
            survey_id: anticancerMed.survey_id
        }
    })

    // Create side effect record for first injection
    for (const sideEffect of sideEffects) {
        const sideEffectRecord = await models.SideEffectRecord.create({
            side_effect_id: sideEffect.id,
            injection_route_id: injectionRoute.id,
            user_id: req.user.id
        })  

        /// Create survey record 
        const surveyDate = new Date(date);
        surveyDate.setDate(surveyDate.getDate() + req.user.survey_duration)
        await models.SurveyRecord.create({
            week: 1,
            survey_date: moment(surveyDate).format('YYYY-MM-DD'),
            side_effect_record_id: sideEffectRecord.id,
            expected_date: moment(surveyDate).format('YYYY-MM-DD')
        })
    }

    res.status(200).json({
        success: true,
        message: 'Update injection route successful',
        data: {
            injection_route: injectionRoute
        }
    });
});

exports.getAllInjectionRoute = catchAsync(async (req, res, next) => {
    const injection_routes = await models.InjectionRoute.findAll({
        where: {
            user_id: req.user.id
        },
        include: [{
            model: models.AnticancerMedDesignElement,
            as: 'anticancer_med_design_element',
            attributes: { exclude: ['anticancer_med_design_id'] },
        }],
        order: [
            ['anticancer_med_design_element', 'order']
        ]
    });

    res.status(201).json({
        success: true,
        message: 'Get all route successful',
        data: {
            injection_routes: injection_routes
        }
    });
});

exports.getLastInjectionRoute = catchAsync(async (req,res, next) => {
    const lastInjectionRoute = await models.InjectionRoute.findOne({
        where:{
            user_id: req.user.id,
            [Op.not]: {
                date: null
            },
        },
        include: [{
            model: models.AnticancerMedDesignElement,
            as: 'anticancer_med_design_element',
            where: {
                name: {
                    [Op.not]: ['진단', '수술'],
                }
            }
        }],
        order: [
            ['anticancer_med_design_element', 'order', 'DESC']
        ]
    })
    
    if (!lastInjectionRoute){
        return next(new AppError('Please fill first injection date!', 400));
    }

    const sideEffectRecord = await models.SideEffectRecord.findOne({
        where: {
            injection_route_id: lastInjectionRoute.id
        }
    });

    /// Setup survey date expected date
    const expectedSurveyDate = new Date(lastInjectionRoute.date);
    expectedSurveyDate.setDate(expectedSurveyDate.getDate() + req.user.survey_duration)

    /// Do when side effect record for this injection route is available
    if (sideEffectRecord){
        const surveyRecords = await models.SurveyRecord.findAll({
            where: {
                side_effect_record_id: sideEffectRecord.id
            },
            include: [{
                model: models.SurveyAnswerRecord,
                as: 'survey_answer_records'
            }]
        });

        /// Do when user already filled week 1 survey
        if (surveyRecords.length > 0){
            /// Set expected date as +7 days after last survey record survey date
            expectedSurveyDate.setDate(expectedSurveyDate.getDate() + (surveyRecords.length * req.user.survey_duration))

            /// Get last survey record
            const lastSurveyRecord = surveyRecords[surveyRecords.length - 1]
            
             /// Do when user already filled survey in the same week
            if (Date() < expectedSurveyDate && lastSurveyRecord.survey_answer_records.length > 0){
                return next(new AppError("이번 주 부작용 설문지가 이미 제출되었습니다.", 400));
            }
        }
    }

    res.status(201).json({
        success: true,
        message: 'Get last injection date successful',
        data: {
            injection_route: lastInjectionRoute,
            expected_survey_date: moment(expectedSurveyDate).format('YYYY-MM-DD')
        }
    });
});