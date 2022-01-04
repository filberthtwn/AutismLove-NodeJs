const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const models = require('../models');
const multer = require('multer');
const { Op } = require('sequelize');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/img/side_effect_record');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `side_effect_record-${req.user.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')){
        cb(new AppError('Not an image! Please upload only images',), false);
        return
    }
    cb(null, true);
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 10 * (1024 * 1024),
    },
});

/**
 * Find all side effect record query
 * 
 * For GetAllSideEffectRecord API
 */
const findAllSideEffectRecord = async (injectionRouteId)  => {
    const sideEffectRecords = await models.SideEffectRecord.findAll({
        where: {
            injection_route_id: injectionRouteId
        },
        include: [
            {
                model: models.SideEffect,
                as: 'side_effect',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: models.SurveyQuestion,
                        as: 'survey_questions',
                        right: true,
                        separate: true,
                        attributes: ['id', 'survey_answer_sub_type_id'],
                        include: [
                            {
                                model: models.SurveyAnswerSubType,
                                as: 'survey_answer_sub_type',
                            }
                        ]
                    }
                ] 
            },
            {
                model: models.SurveyRecord,
                as: 'survey_records',
                right: true,
                attributes: ['id', 'week'],
                include: [{
                    model: models.SurveyAnswerRecord,
                    as: 'survey_answer_records',
                    right: true,
                    separate: true,
                    attributes: ['id'],
                    include: [
                        {
                            model: models.SurveyAnswerOption,
                            as: 'survey_answer_option',
                            attributes: ['id', 'answer', 'score'],
                        },
                        {
                            model: models.SurveyQuestion,
                            as: 'survey_question',
                            attributes: ['id', 'question'],
                            include: [{
                                model: models.SurveyAnswerSubType,
                                as: 'survey_answer_sub_type',
                                attributes: ['id', 'name', 'survey_answer_type_id']
                            }]
                        }
                    ]
                }
            ]
        }]
    });

    return sideEffectRecords
}

/**
 * Find Past Injection Route
 * 
 * Used for GetAllInjectionRoute for get all injection route with date not null
 */
const findFilledInjectionRoute = async (userId) => {
    const injectionRoutes = await models.InjectionRoute.findAll({
        where:{
            user_id: userId,
            [Op.not]: {
                date: null
            },
        },
        include: [
            {
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element',
                where: {
                    [Op.not]: {
                        order: [0, 1]
                    }
                }
            },
            {
                model: models.SideEffectRecord,
                as: 'side_effect_records',
                include: [
                    {
                        model: models.SideEffect,
                        as: 'side_effect',
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: models.SurveyQuestion,
                                as: 'survey_questions',
                                right: true,
                                separate: true,
                                attributes: ['id', 'survey_answer_sub_type_id'],
                                include: [
                                    {
                                        model: models.SurveyAnswerSubType,
                                        as: 'survey_answer_sub_type',
                                    }
                                ]
                            },
                        ]
                    },
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
                                include: [
                                    {
                                        model: models.SurveyQuestion,
                                        as: 'survey_question',
                                        include: [
                                            {
                                                model: models.SurveyAnswerSubType,
                                                as: 'survey_answer_sub_type',
                                            }
                                        ]
                                    },
                                    {
                                        model: models.SurveyAnswerOption,
                                        as: 'survey_answer_option',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        order: [
            ['anticancer_med_design_element', 'order', 'ASC']
        ]
    })

    return injectionRoutes;
}

exports.checkSideEffectRecord = catchAsync(async (req, res, next) => {
    const sideEffectRecord = await models.SideEffectRecord.findOne({
        where: {
            id: req.params.id
        },
        plain: true
    });

    if (!sideEffectRecord){
        return next(new AppError('Side effect record not found', 400));
    }

    req.sideEffectRecord = sideEffectRecord;

    next();
})

exports.getAllSideEffectRecord = catchAsync(async (req, res, next) => {
    const { page } = req.query;
    const limit = req.query.limit ?? 15;
    const offset = (page <= 1) ? page - 1 : ((page - 1) * limit);
    const response = []

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
        }],
        order: [
            ['anticancer_med_design_element', 'order', 'DESC']
        ]
    })

    const surveyAnswerTypes = await models.SurveyAnswerType.findAll({
        attributes: ['id', 'name']
    });

    for (const surveyAnswerType of surveyAnswerTypes) {
        const side_effects = [];
        const sideEffectRecords = await findAllSideEffectRecord(lastInjectionRoute.id);
                
        /// Do when survey record week > 1
        if (sideEffectRecords.length > 0){
            if (sideEffectRecords[0].survey_records.length <= 4){
                for (const sideEffectRecord of sideEffectRecords) {
                    var totalData = 0;
                    if(sideEffectRecord.side_effect.survey_questions.some(surveyQuestion => surveyQuestion.survey_answer_sub_type.survey_answer_type_id == surveyAnswerType.id)){
                        const filledInjectionRoute = await findFilledInjectionRoute(req.user.id);
                        const injectionRoutes = [];
                        filledInjectionRoute.forEach(e => {
                            injectionRoutes.push(e.dataValues);
                        });

                        injectionRoutes.forEach(injectionRoute => {
                            const filteredSideEffectRecord = [];
                            injectionRoute.side_effect_records.forEach(e => {
                                if(e.side_effect.id == sideEffectRecord.side_effect.id){
                                    filteredSideEffectRecord.push(e)
                                }
                            });

                            for (const sideEffectRecord of filteredSideEffectRecord) {
                                for (const survey_record of sideEffectRecord.survey_records) {
                                    survey_record.dataValues.survey_answer_records = survey_record.survey_answer_records.filter(e => e.survey_question.survey_answer_sub_type.survey_answer_type_id == surveyAnswerType.id)
                                }
                                totalData = totalData + sideEffectRecord.survey_records.length;
                            }

                            injectionRoute.side_effect_records = filteredSideEffectRecord;
                        });

                        var counter = 0;
                        for (const injectionRoute of injectionRoutes.reverse()) {
                            const surveyRecords = [];
                            for (const survey_record of injectionRoute.side_effect_records[0].survey_records.reverse()) {
                                if(counter <= 4 && survey_record.survey_date != null){
                                    surveyRecords.push(survey_record);
                                }
                                counter++;
                            }
                            injectionRoute.side_effect_records[0].dataValues.survey_records = surveyRecords.reverse();
                        }

                        side_effects.push({
                            side_effect: sideEffectRecord.side_effect,
                            injection_routes: injectionRoutes.reverse(),
                        });

                        console.log("(DEBUG) TOTAL DATA");
                        console.log(totalData);

                    }

                }
            }
        }        
        response.push({
            survey_answer_type: surveyAnswerType,
            side_effects: side_effects
        })
    }

    res.status(200).json({
        success: true,
        message: 'Get all side effect record successful',
        data: {
            side_effect_records: response
        }
    });
});

exports.getSideEffectRecordDetail = catchAsync(async (req, res, next) => {
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
        }],
        order: [
            ['anticancer_med_design_element', 'order', 'DESC']
        ]
    });

    var sideEffectRecord = await models.SideEffectRecord.findOne({
        where: {
            side_effect_id: req.params.side_effect_id,
            injection_route_id: lastInjectionRoute.id
        },
        include: [{
                model: models.SideEffect,
                as: 'side_effect',
            },{
            model: models.SurveyRecord,
            as: 'survey_records',
            include: [{
                model: models.SurveyAnswerRecord,
                as: 'survey_answer_records',
                separate: true,
                attributes: ['id'],
                include: [
                    {
                        model: models.SurveyAnswerOption,
                        as: 'survey_answer_option',
                    },
                    {
                        model: models.SurveyQuestion,
                        as: 'survey_question',
                        include: [{
                            model: models.SurveyAnswerSubType,
                            as: 'survey_answer_sub_type',
                            nclude: [{  
                                model: models.SurveyAnswerType,
                                as: 'survey_answer_type',
                            }],
                        }],
                    }
                ],
            }],
        }],
    });
    sideEffectRecord = sideEffectRecord.toJSON();


    var surveyAnswerTypes = await models.SurveyAnswerType.findAll();

    sideEffectRecord.records = [];
    for (const surveyAnswerType of surveyAnswerTypes) {
        const surveyRecords = [];
        for (const survey_record of sideEffectRecord.survey_records) {
            const surveyRecord = JSON.parse(JSON.stringify(survey_record));
            
            if (survey_record.survey_answer_records.some((e) => e.survey_question.survey_answer_sub_type.survey_answer_type_id == surveyAnswerType.id)){
                surveyRecord.survey_answer_records = surveyRecord.survey_answer_records.filter((e) => (e.survey_question.survey_answer_sub_type.survey_answer_type_id == surveyAnswerType.id));
                delete surveyRecord.survey_question;

                for (const survey_answer_record of surveyRecord.survey_answer_records) {
                    delete survey_answer_record.survey_question;    
                }

                surveyRecords.push(surveyRecord);
            }
        }   

        sideEffectRecord.records.push({
            survey_answer_type: surveyAnswerType,
            survey_records: surveyRecords
        });
    }

    delete sideEffectRecord.survey_records;
    

    res.status(200).json({
        success: true,
        message: 'Get side effect detail successful',
        data: {
            side_effect_record: sideEffectRecord
        }
    });
});

exports.updateSideEffectRecordMemo = catchAsync(async (req, res, next) => {
    var sideEffectRecord = await models.SideEffectRecord.findOne({
        where: {
            id: req.params.id 
        },
    })
    
    sideEffectRecord = await sideEffectRecord.update({
        memo: req.body.memo,
        memo_updated_at: new Date()
    }, {
        individualHooks: true,
        returning: true,
        plain: true,
    })

    res.status(200).json({
        success: true,
        message: 'Update side effect record memo successful',
        data: {
            side_effect_record: sideEffectRecord
        }
    });
});

exports.sideEffectRecordUpload = upload.array('images')
exports.uploadSideEffectRecordImage = catchAsync(async (req, res, next) => {
    var imagePaths = []
    if (req.sideEffectRecord.dataValues.image_urls){
        imagePaths = req.sideEffectRecord.dataValues.image_urls.split(',');
    }

    for (const file of req.files) {
        const filePath = `/${file.destination.replace('public/', '')}/${file.filename}`
        imagePaths.push(filePath);
    }

    sideEffectRecord = await models.SideEffectRecord.update(
        {
            image_urls: imagePaths.join(','),
        },
        {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        }
    );

    res.status(200).json({
        success: true,
        message: 'Upload side effect record image successful',
        data: {
            side_effect_record: sideEffectRecord[1]
        }
    });
})