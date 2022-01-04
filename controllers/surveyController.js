const AppError = require('../utils/appError');
const { Op } = require("sequelize");
const catchAsync = require('../utils/catchAsync');
const models = require('../models');
const MEDICINE_TYPE = require('../constants/medicineType');
const INJECTION_STATUS = require('../constants/injectionStatus');
const ROUTE_TITLES = require('../constants/routeTitles');
const moment = require('moment');
const strings = require('../constants/strings');

const createOtherSurveyRecords = async (latestWeek, lastInjectionRouteId, otherRecords) => {
    const otherSurveyRecord = await models.OtherSurveyRecord.create({
        week: latestWeek,
        injection_route_id: lastInjectionRouteId
    })

    const otherSurveyParams = [];
    for (const other_record of otherRecords) {
        otherSurveyParams.push({
            symtomps: other_record.symtomps,
            severity: other_record.severity,
            other_survey_record_id: otherSurveyRecord.id
        })
    }
    await models.OtherSurveyAnswerRecord.bulkCreate(otherSurveyParams)
};

exports.getAllSurvey = catchAsync(async (req, res, next) => {
    var surveys = [];

    const user = await models.User.findOne({
        where: {
            id: req.user.id
        },
        include: [{
            model: models.AnticancerMed,
            as: 'anticancer_med',
            include: [{
                model: models.Survey,
                as: 'survey',
            }]
        }]
    })

    if (!user.anticancer_med.survey){
        return next(new AppError(strings.NO_SURVEY_LINKED(), 400));
    }
    
    const sideEffects = await models.SideEffect.findAll({
        where: {
            survey_id: user.anticancer_med.survey.id
        },
    });
    
    for (const sideEffect of sideEffects) {
        const surveyQuestions = await models.SurveyQuestion.findAll({
            where: {
                side_effect_id: sideEffect.id
            },
        });

        if (surveyQuestions.length == 0){
            continue;
        }

        //* Parse object to hash map
        var mappedQuestions = [];
        for (const val of surveyQuestions) {
            const mappedQuestion = {}
            for (const key in val.dataValues) {
                mappedQuestion[key] = val.dataValues[key];
            }

            const surveyOptions = await models.SurveyAnswerOption.findAll({
                where: {
                    survey_answer_sub_type_id: val.dataValues.survey_answer_sub_type_id
                },
            });

            mappedQuestion.survey_answer_sub_type_id = undefined;
            mappedQuestion.options = surveyOptions
            mappedQuestions.push(mappedQuestion);
        }
        
        surveys.push({
            side_effect: sideEffect,
            questions: mappedQuestions
        })
    }

    res.status(200).json({
        success: true,
        message: 'Get all survey successful',
        data: {
            surveys: surveys
        }
    });
});

exports.createSurvey = catchAsync(async (req, res, next) => {
    const survey = await models.Survey.findOne({
        where : {
            id: req.user.anticancer_med.survey_id
        },
        include: [
            {
                model: models.SideEffect,
                as: 'side_effects',
                include: [
                    {
                        model: models.SurveyQuestion,
                        as: 'survey_questions'
                    }
                ],
            }
        ],
    });

    var survey_records_response = [];
    const { anticancer_injection_date, records, other_records } = req.body;

    /// Check anticancer injection date request field format
    const isDateValid = moment(anticancer_injection_date, 'YYYY-MM-DD', true).isValid();
    if(!isDateValid){
        return next(new AppError('Wrong date format', 400));
    }

    //* Return error if field anticancer_injection_date is null
    if (!anticancer_injection_date){
        return next(new AppError('Field anticancer_injection_date required', 400));
    }

    //* Return error if field records is null
    if (!records){
        return next(new AppError('Field records required', 400));
    }

    //* Return error if field other_records is null
    if (!other_records){
        return next(new AppError('Field other_records required', 400));
    }

    /// Check side effect length with body request
    if (records.length != survey.side_effects.length){
        return next(new AppError('Please fill all survey question', 400));
    }
    
    /// Check survey question length with body request
    for (const side_effect of survey.side_effects) {
        const side_effect_from_request = records.filter(e => e.side_effect_id == side_effect.id);

        if(side_effect_from_request.length == 0){
            return next(new AppError('Side effect not found', 400));
        }

        if(side_effect_from_request.length < 1){
            return next(new AppError('Duplicated side effect request', 400));
        }

        if(side_effect_from_request[0].answers.length != side_effect.survey_questions.length){
            console.log(side_effect_from_request);
            return next(new AppError('Please answer all survey question', 400));
        }
    }

    const injectionRoutes = await models.InjectionRoute.findAll({
        where: {
            user_id: req.user.id,
            // date: anticancer_injection_date
        },
        include: [
            {
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element'
            }
        ],
        order: [
            ['anticancer_med_design_element', 'order', 'ASC']
        ]
    });

    if(!injectionRoutes[2].date){
        return next(new AppError('Please fill first injection date'), 400);
    }

    if(injectionRoutes[injectionRoutes.length - 1].status == 'FINISHED'){
        return next(new AppError("You've completed your injection routes"), 400);
    }

    var lastInjectionRoute = injectionRoutes.find((e) => e.date == anticancer_injection_date);

    /// Do when user select new date
    if(!lastInjectionRoute){
        if(injectionRoutes[injectionRoutes.length - 1].status == 'ON_GOING'){
            return next(new AppError("You've reached last injection route"), 400);
        }

        const index = injectionRoutes.findIndex((e) => e.status == 'ON_GOING');
        if (index < (injectionRoutes.length - 1)){
            const onGoingRoute = injectionRoutes.find((e) => e.status == 'ON_GOING');
            onGoingRoute.status = 'FINISHED';
            await onGoingRoute.save();

            const newInjectionRoute = injectionRoutes[index + 1];
            newInjectionRoute.date = anticancer_injection_date;
            newInjectionRoute.status = 'ON_GOING';
            await newInjectionRoute.save();

            lastInjectionRoute = newInjectionRoute;

            const sideEffectRecords = await models.SideEffectRecord.findAll({
                where: {
                    injection_route_id: lastInjectionRoute.id
                }
            })

            /// When user select new date before last injection route reach week 4
            if(sideEffectRecords.length == 0){
                const survey = await models.Survey.findOne({
                    where: {
                        id: req.user.anticancer_med.survey_id
                    },
                    include: [
                        {
                            model: models.SideEffect,
                            as: 'side_effects'
                        }
                    ]
                })
            
                for (const side_effect of survey.side_effects) {
                    const sideEffectRecord = await models.SideEffectRecord.create({
                        side_effect_id: side_effect.id,
                        injection_route_id: lastInjectionRoute.id,
                        user_id: req.user.id
                    },{
                        returning: true
                    })
    
                    const expectedDate = new Date(anticancer_injection_date).incrementDay(req.user.survey_duration);
                    await models.SurveyRecord.create({
                        week: 1,
                        side_effect_record_id: sideEffectRecord.id,
                        expected_date: moment(expectedDate).format('YYYY-MM-DD')
                    })
                }
            }  
        }
    }
    
    const sideEffectRecords = await models.SideEffectRecord.findAll({
        where: {
            injection_route_id: lastInjectionRoute.id
        },
        include: [
            {
                model: models.SurveyRecord,
                as: 'survey_records',
                include: [
                    {
                        model: models.SurveyAnswerRecord,
                        as: 'survey_answer_records'
                    }
                ]
            }
        ]
    });

    if(sideEffectRecords[0].survey_records.length == 4){
        if(sideEffectRecords[0].survey_records[3].survey_answer_records.length > 0){
            return next(new AppError("You've filled all survey 4 week in row", 400))
        }
    }

    for (const record of records) {
        const sideEffectRecord = sideEffectRecords.filter(e => e.side_effect_id == record.side_effect_id)[0];
        if (!sideEffectRecord){
            return next(new AppError("Side effect record not found", 400));
        }
        
        const lastSurveyRecord = sideEffectRecord.survey_records[sideEffectRecord.survey_records.length - 1];
        lastSurveyRecord.survey_date = moment(Date()).format('YYYY-MM-DD');
        await lastSurveyRecord.save();

        for (const answer of record.answers) {
            await models.SurveyAnswerRecord.create({
                survey_record_id: lastSurveyRecord.id,
                survey_question_id: answer.survey_question_id,
                survey_answer_option_id: answer.survey_answer_option_id
            })
        }
    }

    /// Create other survey records
    const latestWeek = sideEffectRecords[0].survey_records[sideEffectRecords[0].survey_records.length - 1].week;
    await createOtherSurveyRecords(latestWeek, lastInjectionRoute.id, other_records);

    if(lastInjectionRoute.anticancer_med_design_element.order == (injectionRoutes.length - 1) && lastSurveyRecord.week == 4){
        lastInjectionRoute.status = 'FINISHED';
        lastInjectionRoute.save();
    }else{
        await createExpectedSurvey(req, res, next);
    }

    const injectionRoute = await models.InjectionRoute.findOne({
        where: {
            user_id: req.user.id,
            date: anticancer_injection_date
        },
        include: [
            {
                model: models.SideEffectRecord,
                as: 'side_effect_records',
                include: [
                    {
                        model: models.SurveyRecord,
                        as: 'survey_records',
                        right: true,
                        separate: true,
                        include: [
                            {
                                model: models.SurveyAnswerRecord,
                                as: 'survey_answer_records',
                                right: true,
                                separate: true,
                                // attributes: ['id', 'created_at']
                            }
                        ]
                    }
                ]
            },
            {
                model: models.OtherSurveyRecord,
                as: 'other_survey_records',
                include: [
                    {
                        model: models.OtherSurveyAnswerRecord,
                        as: 'other_survey_answer_records',
                    }
                ]
            }
        ]
    })

    res.status(200).json({
        success: true,
        message: 'Create survey record successful',
        data: {
            injection_route: injectionRoute
        }
    });
})

const updateExpectedSurvey = async (req, res, next) => {

}

const createExpectedSurvey = async (req, res, next) => {
    const injectionRoute = await models.InjectionRoute.findOne({
        where: {
            user_id: req.user.id,
            status: 'ON_GOING'
            // [Op.not]: {
            //     date: null
            // }
        },
        include: [
            {
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element'
            },
            {
                model: models.SideEffectRecord,
                as: 'side_effect_records',
                required: true,
                include: [
                    {
                        model: models.SurveyRecord,
                        as: 'survey_records',
                        // required: true,
                    }
                ]
            }
        ],
        order: [
            ['anticancer_med_design_element', 'order', 'DESC']
        ]
    });
    
    if (injectionRoute.side_effect_records.length > 0){

        const surveyDuration = req.user.survey_duration;
        const surveyRecords = injectionRoute.side_effect_records[0].survey_records;
        var surveyRecordLastWeek = surveyRecords.length;
        const lastSurveyRecord = surveyRecords[surveyRecords.length - 1];

        var sideEffectRecords = injectionRoute.side_effect_records;

        if (surveyRecordLastWeek == 4){
            surveyRecordLastWeek = 0;
            sideEffectRecords = [];
            const injectionRoute = await models.InjectionRoute.findOne({
                where: {
                    user_id: req.user.id,
                    status: 'IN_COMING'
                },
                include: [
                    {
                        model: models.AnticancerMedDesignElement,
                        as: 'anticancer_med_design_element'
                    },
                ],
                order: [
                    ['anticancer_med_design_element', 'order', 'ASC']
                ]
            })

            const survey = await models.Survey.findOne({
                where: {
                    id: req.user.anticancer_med.survey_id
                },
                include: [
                    {
                        model: models.SideEffect,
                        as: 'side_effects'
                    }
                ],
            })

            for (const side_effect of survey.side_effects) {
                const params = {
                    side_effect_id: side_effect.id,
                    user_id: req.user.id,
                    injection_route_id: injectionRoute.id
                }

                const sideEffectRecord = await models.SideEffectRecord.create(params,{
                    returning: true
                });
                
                sideEffectRecords.push(sideEffectRecord);
            }
        }

        const expectedDate = new Date().incrementDay(surveyDuration);
        for (const side_effect_record of sideEffectRecords) {
            const params = {
                week: surveyRecordLastWeek + 1,
                side_effect_record_id: side_effect_record.id,
                expected_date: moment(expectedDate).format('YYYY-MM-DD'),
            }
            await models.SurveyRecord.create(params);
        }
    }
}

const findLastFilledInjectionRoute = async (userId)  => {
    const lastInjectionRoute = await models.InjectionRoute.findAll({
        where:{
            user_id: userId,
            [Op.not]: {
                date: null
            },
        },
        include: [{
            model: models.AnticancerMedDesignElement,
            as: 'anticancer_med_design_element'
        },{
            model: models.SideEffectRecord,
            as: 'side_effect_records',
            include: [{
                model: models.SurveyRecord,
                as: 'survey_records',
            }]
        }],
        order: [
            ['anticancer_med_design_element', 'order', 'DESC'],
            ['side_effect_records', 'survey_records','week', 'ASC']
        ]
    })
    return (lastInjectionRoute.length > 0) ? lastInjectionRoute[0] : null;
}
