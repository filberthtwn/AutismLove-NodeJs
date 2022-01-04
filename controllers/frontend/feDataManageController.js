const catchAsync = require('../../utils/catchAsync');
const models = require('../../models');
const { Op } = require("sequelize");
const excelGenerator = require('excel4node');
const moment = require('moment');
const strings = require('../../constants/strings'); 
const AppError = require('../../utils/appError');
const pug = require('pug');

const limit = 10;

exports.getDataManagement = catchAsync(async (req, res, next) => {
    const users = await models.User.findAndCountAll({
        where: {
            [Op.not]: {
                role: 'ADMIN'
            },
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med',
            },
            {
                model: models.InjectionRoute,
                as: 'injection_routes',
                where: {
                    [Op.not]: {
                        date: null
                    },
                },
                include: [
                    {
                        model: models.AnticancerMedDesignElement,
                        as: 'anticancer_med_design_element',
                    },
                    {
                        model: models.SideEffectRecord,
                        as: 'side_effect_records',
                        include: [
                            {
                                model: models.SurveyRecord,
                                as: 'survey_records',
                            },
                        ]
                    }
                ],
            }
        ],
        order: [
            ['created_at', 'DESC'],
            ['injection_routes','anticancer_med_design_element', 'order', 'ASC'],
            ['injection_routes','side_effect_records', 'survey_records', 'week', 'DESC']
        ],
        distinct:true,
        limit: limit,
        offset: 0,
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: users.count / limit,
        current_page: 1
    });

    res.status(200).render('data-management/dataManagement',{
        path: '/data-management',
        url: req.originalUrl,
        users: users.rows,
        pagination: pagination,
        strings: strings,
        total_count: users.count,
        limit: limit
    });
});

exports.getRoute = catchAsync(async (req, res, next) => {
    const user = await models.User.scope('showLastLoginAt').findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med',
            },
            {
                model: models.InjectionRoute,
                as: 'injection_routes',
                include: [
                    {
                        model: models.AnticancerMedDesignElement,
                        as: 'anticancer_med_design_element',
                    },
                    {
                        model: models.SideEffectRecord,
                        as: 'side_effect_records',
                        include: [
                           {
                                model: models.SurveyRecord,
                                as: 'survey_records',
                           }
                        ]
                    }
                ],
                
            }
        ],
        order: [
            ['injection_routes', 'anticancer_med_design_element', 'order']
        ]
    });

    res.status(200).render('data-management/routeManagement', {
        path: '/data-management',
        url: req.originalUrl,
        user: user,
        moment: require('moment'),
        strings: strings
    });
});

exports.updateInjectionRoute = catchAsync(async (req, res, next) => {
    for (injection_route of req.body.injection_routes){
        await models.InjectionRoute.update({
            date: injection_route.date
        }, {
            where: {
                id: injection_route.id
            }
        });
    }

    req.flash('response', {
        status: true,
        message: 'Injection route edited successfully!'
    });
    
    res.redirect('/data-management/' + req.params.id + '/route');
});

exports.getAnticancerRecord = catchAsync(async (req, res, next) => {
    const user = await models.User.scope('showLastLoginAt').findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med',
            },
            {
                model: models.AnticancerRecord,
                as: 'anticancer_med_records',
                limit: limit,
                offset: 0,
            }
        ],
    });

    const anticancer_records = await models.AnticancerRecord.findAndCountAll({
        where: {
            user_id: user.id
        },
        order: [
            ['date', 'DESC']
        ],
        limit: limit,
        offset: 0,
    })

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: anticancer_records.count/limit,
        current_page: 1
    });

    console.log("COUNT");
    console.log(anticancer_records.count);

    res.status(200).render('data-management/anticancerRecord', {
        path: '/data-management',
        url: req.originalUrl,
        user: user,
        anticancer_records: anticancer_records.rows,
        moment: require('moment'),
        pagination: pagination,
        strings: strings,
        total_count: anticancer_records.count,
        limit: limit
    });
});

exports.createAnticancerRecord = catchAsync(async (req, res, next) => {
    req.body.user_id = req.params.id;
    req.body.date = parseAnticancerDate(req);

    if (req.body.date == ''){
        delete req.body.date;
    }

    /// Change is_anc_calculated_result body into boolean
    req.body.is_anc_calculated_result = req.body.is_anc_calculated_result ? true : false

    await models.AnticancerRecord.create(req.body);

    req.flash('response', {
        status: true,
        message: 'Anticancer record created successfully!'
    });
    
    res.redirect('/data-management/' + req.params.id + '/anticancer-record');
});

exports.updateAnticancerRecord = catchAsync(async (req, res, next) => {
    req.body.user_id = req.params.id;
    req.body.date = parseAnticancerDate(req);

    /// Change is_anc_calculated_result body into boolean
    req.body.is_anc_calculated_result = req.body.is_anc_calculated_result ? true : false

    await models.AnticancerRecord.update(req.body,{
        where: {
            id: req.params.anticancer_record_id
        }
    });

    req.flash('response', {
        status: true,
        message: 'Anticancer record edited successfully!'
    });
    
    res.redirect('/data-management/' + req.params.id + '/anticancer-record');
});

exports.deleteAnticancerRecord = catchAsync(async (req, res, next) => {
    req.body.user_id = req.params.id;
    await models.AnticancerRecord.destroy({
        where: {
            id: req.params.anticancer_record_id
        }
    });

    req.flash('response', {
        status: true,
        message: 'Anticancer record deleted successfully!'
    });
    
    res.redirect('/data-management/' + req.params.id + '/anticancer-record');
});

exports.refreshAnticancerRecord = catchAsync(async (req, res, next) => {
    var { page, sort } = req.query;

    console.log(sort);

    if(!sort){
        sort = ['date', 'DESC'];
    }

    const anticancer_records = await models.AnticancerRecord.findAndCountAll({
        where: {
            user_id: req.params.id
        },
        order: [
            sort
        ],
        limit: limit,
        offset: (page - 1) * limit,
    })

    console.log(anticancer_records);

    const anticancerRecordItems = pug.compileFile('views/data-management/anticancerRecord/components/anticancerRecordItems.pug')({
        anticancer_records: anticancer_records.rows,
        moment: moment,
        strings: strings
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: anticancer_records.count/limit,
        current_page: Number(page)
    });

    res.status(200).json({
        success: true,
        message: 'Get anticancer record items successful',
        data: {
            anticancer_record_items: anticancerRecordItems,
            pagination: pagination,
            total_count: anticancer_records.count,
            limit: limit,
        }
    });
})

exports.getSurveyList = catchAsync(async (req, res, next) => {
    const user = await models.User.scope('showLastLoginAt').findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med',
                include: [
                    {
                        model: models.Survey,
                        as: 'survey',
                        include: [
                            {
                                model: models.SideEffect,
                                as: 'side_effects',
                                right: true,
                                separate: true,
                                include: [
                                    {
                                        model: models.SurveyQuestion,
                                        as: 'survey_questions',
                                        attributes: ['side_effect_id'],
                                        include: [
                                            {
                                                model: models.SurveyAnswerSubType,
                                                as: 'survey_answer_sub_type',
                                                include: [
                                                    {
                                                        model: models.SurveyAnswerType,
                                                        as: 'survey_answer_type',
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                model: models.AnticancerRecord,
                as: 'anticancer_med_records'
            }
        ]
    });

    var injectionRoutes = await models.InjectionRoute.findAll({
        where: {
            user_id: req.params.id
        },
        include: [
            {
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element',
            },
            {
                model: models.SideEffectRecord,
                as: 'side_effect_records',
                include: [
                    {
                        model: models.SideEffect,
                        as: 'side_effect',
                    },
                    {
                        model: models.SurveyRecord,
                        as: 'survey_records',
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
                                                include: [
                                                    {
                                                        model: models.SurveyAnswerType,
                                                        as: 'survey_answer_type',
                                                    }
                                                ]
                                            }
                                        ]
                                    },{
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
            ['anticancer_med_design_element', 'order', 'ASC'],
            ['side_effect_records', 'survey_records','week', 'ASC']
        ]
    });
    injectionRoutes = injectionRoutes.filter(e => e.side_effect_records.length > 0);

    const lastInjectioRoute = await models.InjectionRoute.findOne({
        where: { user_id: req.params.id },
        include: [
            {
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element',
            },
        ],
        order: [
            ['anticancer_med_design_element', 'order', 'DESC']
        ]
    })

    res.status(200).render('data-management/surveyList', {
        path: '/data-management',
        url: req.originalUrl,
        user: user,
        injection_routes: injectionRoutes,
        moment: require('moment'),
        currentDate: moment(new Date()).format("YYYY-MM-DD"),
        strings: strings,
        last_injection_route: lastInjectioRoute
    });
});

exports.updateLastSurveyDate = catchAsync(async (req, res, next) => {
    const lastInjectionRoute = await models.InjectionRoute.findOne({
        where:{
            user_id: req.params.id,
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

    await models.InjectionRoute.update({
        date: req.body.date
    }, {
        where: {
            id: lastInjectionRoute.id
        }
    });

    req.flash('response', {
        status: true,
        message: 'Last injection date edited successfully!'
    });
    
    res.redirect('/data-management/' + req.params.id + '/survey-list');
});

exports.updateAlarmDateSetting = catchAsync(async (req, res, next) => {
    const injectionRoute = await models.InjectionRoute.findOne({
        where: {
            user_id: req.params.id
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
                        as: 'survey_records'
                    }
                ]
            }
        ],
        order: [
            ['anticancer_med_design_element', 'order', 'DESC']
        ]
    });

    console.log("INJECTION ROUTES:");
    console.log(injectionRoute);
    // const lastFilledInjectionRoute = await findLastFilledInjectionRoute(req.params.id);
    // console.log(lastFilledInjectionRoute);
    for (const side_effect_record of injectionRoute.side_effect_records) {
        /// Get latest survey record
        const surveyRecord = side_effect_record.survey_records[side_effect_record.survey_records.length - 1];
        if (req.body.last_survey_date < surveyRecord.survey_date){
            return next(new AppError('New survey date cannot less than current survey date', 400));
        }
        
        await models.SurveyRecord.update({
            expected_date: req.body.last_survey_date
        },{
            where:{
                id: surveyRecord.id,
            },
        })
    }

    req.flash('response', {
        status: true,
        message: 'Alarm date edited successfully!'
    });
    
    res.redirect('/data-management/' + req.params.id + '/survey-list');
});

exports.updateSurveyDuration = catchAsync(async (req, res, next) => {
    await models.User.update({
        survey_duration: req.body.survey_duration
    },{
        where:{
            id: req.params.id,
        },
    })

    req.flash('response', {
        status: true,
        message: 'Survey duration edited successfully!'
    });
    
    res.redirect('/data-management/' + req.params.id + '/survey-list');
});

exports.updateAlarmSetting = catchAsync(async (req, res, next) => {
    await models.User.update({
        is_alarm_on: req.body.is_alarm_on
    },{
        where:{
            id: req.params.id,
        },
    })

    req.flash('response', {
        status: true,
        message: 'Alarm setting edited successfully!'
    });
    
    res.redirect('/data-management/' + req.params.id + '/survey-list');
});

exports.dataExcelDownload = catchAsync(async (req, res, next) => {
    const headers = [
        {title: 'Created at', key: 'created_at', width: 16},
        {title: 'Name', key: 'name', width: 24},
        {title: 'Phone Number', key: 'phone_number', width: 24},
        {title: 'Anticancer Med. Type', key: 'anticancer_med', width: 24},
        {title: 'Anticancer Route Name', key: 'last_injection_route', width: 24},
        {title: 'Week', key: 'week', width: 16},
    ];
    const workbook = new excelGenerator.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    /// Initialize header style
    let headerStyle = workbook.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            relativeIndent: 24,
            wrapText: true
        },
        fill:{
            type: 'pattern',
            patternType: 'solid',
            fgColor: '#FF9595'
        },
        font: {
          color: '#FFFFFF',
          vertAlign: 'center',
          size: 12,
        },
    });

    /// Setup Header
    worksheet.row(1).setHeight(30);
    for (const [idx, val] of headers.entries()) {
        worksheet.column(idx + 1).setWidth(val.width);
        worksheet.cell(1, idx + 1).string(val.title).style(headerStyle);
    }

    /// Initialize content style
    const contentStyle = workbook.createStyle({
        alignment: {
            vertical: 'center',
            wrapText: true
        },
        font: {
          color: '#000000',
          size: 12,
        },
    });

    /// Get all users
    const users = await models.User.findAll({
        where: {
            [Op.not]: {
                role: 'ADMIN'
            },
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med',
            },
            {
                model: models.InjectionRoute,
                as: 'injection_routes',
                where: {
                    [Op.not]: {
                        date: null
                    },
                },
                include: [
                    {
                        model: models.AnticancerMedDesignElement,
                        as: 'anticancer_med_design_element',
                    },
                    {
                        model: models.SideEffectRecord,
                        as: 'side_effect_records',
                        include: [
                            {
                                model: models.SurveyRecord,
                                as: 'survey_records',
                            },
                        ]
                    }
                ],
            }
        ],
        order: [
            ['injection_routes','anticancer_med_design_element', 'order', 'ASC']
        ],
    });

    /// Insert users into excel
    for (const [row, user] of users.entries()) {
        for (const [col, header] of headers.entries()) {
            let value = String(user[header.key] ?? '-');
            /// When key is 'created_at' get only name
            if (header.key === 'created_at'){
                value = moment(user.created_at).format('YYYY-MM-DD')
            }

            /// When key is 'anticancer_med' get only name
            if (header.key === 'anticancer_med'){
                value = user.anticancer_med.name;
            }

            /// When key is 'last_injection_route' get only name
            if (header.key === 'last_injection_route'){
                value = '-';
                if (user.injection_routes.length > 0){
                    value = user.injection_routes[user.injection_routes.length-1].anticancer_med_design_element.name;
                }
            }

            /// When key is 'week' get only name
            if (header.key === 'week'){
                value = '1';
                const lastInjectionRoute = user.injection_routes[user.injection_routes.length-1];
                if (lastInjectionRoute && lastInjectionRoute.side_effect_records.length > 0){
                    console.log(lastInjectionRoute.side_effect_records[0].survey_records[0]);
                    value = lastInjectionRoute.side_effect_records[0].survey_records[0].week.toString();
                }
            }

            worksheet.cell(row + 2, col + 1).string(value).style(contentStyle);
        }
    }

    /// Write file excel to folder
    const fileName = `public/files/data-management/data_management.xlsx`;
    workbook.write(fileName);

    res.redirect('/files/data-management/data_management.xlsx');
});

exports.routeExcelDownload = catchAsync(async (req, res, next) => {
    const headers = [
        {title: '순번', key: 'order', width: 16},
        {title: 'Name', key: 'name', width: 24},
        {title: 'Date', key: 'date', width: 16},
        {title: 'Status', key: 'status', width: 16},
    ];
    const workbook = new excelGenerator.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    /// Initialize header style
    let headerStyle = workbook.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            relativeIndent: 24,
            wrapText: true
        },
        fill:{
            type: 'pattern',
            patternType: 'solid',
            fgColor: '#FF9595'
        },
        font: {
          color: '#FFFFFF',
          vertAlign: 'center',
          size: 12,
        },
    });

    /// Setup Header
    worksheet.row(1).setHeight(30);
    for (const [idx, val] of headers.entries()) {
        worksheet.column(idx + 1).setWidth(val.width);
        worksheet.cell(1, idx + 1).string(val.title).style(headerStyle);
    }

    /// Initialize content style
    const contentStyle = workbook.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: true
        },
        font: {
          color: '#000000',
          size: 12,
        },
    });

    /// Get all injection routes
    const injectionRoutes = await models.InjectionRoute.findAll({
        where: {
            user_id: req.params.id
        },
        include: [
            {
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element',
            }
        ],
        order: [
            ['anticancer_med_design_element', 'order']
        ]
    });

    /// Insert injection route into excel
    for (const [row, injectionRoute] of injectionRoutes.entries()) {
        for (const [col, header] of headers.entries()) {
            let value = String(injectionRoute[header.key] ?? '-');
            /// When key is 'week' get only name
            if (header.key === 'order'){
                value = injectionRoute.anticancer_med_design_element.order.toString();
            }

            /// When key is 'week' get only name
            if (header.key === 'name'){
                value = injectionRoute.anticancer_med_design_element.name;
            }

            worksheet.cell(row + 2, col + 1).string(value).style(contentStyle);
        }
    }

    /// Write file excel to folder
    const fileName = `public/files/route-management/route_management-${req.params.id}.xlsx`;
    workbook.write(fileName);

    res.redirect(`/files/route-management/route_management-${req.params.id}.xlsx`);
});

exports.anticancerRecordExcelDownload = catchAsync(async (req, res, next) => {
    const headers = [
        {title: 'Date', key: 'created_at', width: 16},
        {title: 'Visit Purpose', key: 'purpose', width: 24},
        {title: 'ANC (Neutrophil)', key: 'anc_number', width: 16},
        {title: 'Anticancer Injection', key: 'injection', width: 16},
        {title: 'Leukocyte Stimulator', key: 'stimulator', width: 16},
    ];
    const workbook = new excelGenerator.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    /// Initialize header style
    let headerStyle = workbook.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            relativeIndent: 24,
            wrapText: true
        },
        fill:{
            type: 'pattern',
            patternType: 'solid',
            fgColor: '#FF9595'
        },
        font: {
          color: '#FFFFFF',
          vertAlign: 'center',
          size: 12,
        },
    });

    /// Setup Header
    worksheet.row(1).setHeight(30);
    for (const [idx, val] of headers.entries()) {
        worksheet.column(idx + 1).setWidth(val.width);
        worksheet.cell(1, idx + 1).string(val.title).style(headerStyle);
    }

    /// Initialize content style
    const contentStyle = workbook.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: true
        },
        font: {
          color: '#000000',
          size: 12,
        },
    });

    // /// Get all anticancer records
    const anticancerRecords = await models.AnticancerRecord.findAll({
        where: {
            user_id: req.params.id
        },
        order: [
            ['created_at', 'DESC']
        ]
    });

    /// Insert anticancer records into excel
    for (const [row, anticancerRecord] of anticancerRecords.entries()) {
        for (const [col, header] of headers.entries()) {
            let value = String(anticancerRecord[header.key] ?? '-');

            /// When key is 'created_at' get only name
            if (header.key === 'created_at'){
                value = moment(anticancerRecord.created_at).format('YYYY-MM-DD')
            }

            /// When key is 'week' get only name
            if (header.key === 'anc_number'){
                value = anticancerRecord.anc_number.toString();
            }

            worksheet.cell(row + 2, col + 1).string(value).style(contentStyle);
        }
    }

    /// Write file excel to folder
    const fileName = `public/files/anticancer-record-management/anticancer-record-management-${req.params.id}.xlsx`;
    await workbook.write(fileName);

    res.redirect(`/files/anticancer-record-management/anticancer-record-management-${req.params.id}.xlsx`);
});

exports.routeSurveyListDownload = catchAsync(async (req, res, next) => {
    var headers = [
        {title: 'Route Name', key: 'route_name', width: 16},
        {title: 'Injection Date', key: 'date', width: 24},
        {title: 'Survey Expected Date', key: 'expected_date', width: 16},
        {title: 'Condition', key: 'condition', width: 16},
    ];

    const user = await models.User.scope('showLastLoginAt').findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med',
                include: [
                    {
                        model: models.Survey,
                        as: 'survey',
                        include: [
                            {
                                model: models.SideEffect,
                                as: 'side_effects',
                                right: true,
                                separate: true,
                                include: [
                                    {
                                        model: models.SurveyQuestion,
                                        as: 'survey_questions',
                                        attributes: ['side_effect_id'],
                                        include: [
                                            {
                                                model: models.SurveyAnswerSubType,
                                                as: 'survey_answer_sub_type',
                                                include: [
                                                    {
                                                        model: models.SurveyAnswerType,
                                                        as: 'survey_answer_type',
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                model: models.AnticancerRecord,
                as: 'anticancer_med_records'
            }
        ]
    });

    for (const side_effect of user.anticancer_med.survey.side_effects) {
        for (const survey_question of side_effect.survey_questions) {
            headers.push({
                title: 'Survey ' + side_effect.name + ' - ' + survey_question.survey_answer_sub_type.survey_answer_type.name,
                key: 'survey_answer',
                width: 24
            })
        }
    }

    const workbook = new excelGenerator.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    /// Initialize header style
    let headerStyle = workbook.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            relativeIndent: 24,
            wrapText: true
        },
        fill:{
            type: 'pattern',
            patternType: 'solid',
            fgColor: '#FF9595'
        },
        font: {
          color: '#FFFFFF',
          vertAlign: 'center',
          size: 12,
        },
    });

    /// Setup Header
    worksheet.row(1).setHeight(30);
    for (const [idx, val] of headers.entries()) {
        worksheet.column(idx + 1).setWidth(val.width);
        worksheet.cell(1, idx + 1).string(val.title).style(headerStyle);
    }

    /// Initialize content style
    const contentStyle = workbook.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: true
        },
        font: {
          color: '#000000',
          size: 12,
        },
    });

    /// Get all survey record
    var injectionRoutes = await models.InjectionRoute.findAll({
        where: {
            user_id: req.params.id
        },
        include: [
            {
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element',
            },
            {
                model: models.SideEffectRecord,
                as: 'side_effect_records',
                include: [
                    {
                        model: models.SideEffect,
                        as: 'side_effect',
                    },
                    {
                        model: models.SurveyRecord,
                        as: 'survey_records',
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
                                                include: [
                                                    {
                                                        model: models.SurveyAnswerType,
                                                        as: 'survey_answer_type',
                                                    }
                                                ]
                                            }
                                        ]
                                    },{
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
    });
    injectionRoutes = injectionRoutes.filter(e => e.side_effect_records.length > 0);

    /// Insert injection route into excel
    var index = 2;
    for (const [parentRow, injectionRoute] of injectionRoutes.entries()) {
        for (const [row, surveyRecord] of injectionRoute.side_effect_records[0].survey_records.entries()) {
            for (const [col, header] of headers.entries()) {
                let value = String(injectionRoute[header.key] ?? '-');
                /// When key is 'route_name' get only name
                if (header.key === 'route_name'){
                    value = injectionRoute.anticancer_med_design_element.name + ' - ' + surveyRecord.week;
                }

                /// When key is 'survey_answer' get only name
                if (header.key === 'survey_answer'){
                    const answers = [];
                    for (const sideEffect of user.anticancer_med.survey.side_effects) {
                        for (const surveyQuestion of sideEffect.survey_questions) {
                            const sideEffectRecord = injectionRoute.side_effect_records.find(e => e.side_effect_id == sideEffect.id)
                            if (typeof sideEffectRecord !== "undefined"){
                                const surveyRecordY = sideEffectRecord.survey_records.find(e => e.week == surveyRecord.week);
                                if (typeof surveyRecordY !== "undefined"){
                                    const surveyAnswerRecord = surveyRecordY.survey_answer_records.find(e => e.survey_question.survey_answer_sub_type.survey_answer_type_id == surveyQuestion.survey_answer_sub_type.survey_answer_type_id)
                                    if (typeof surveyAnswerRecord !== "undefined"){
                                        answers.push(surveyAnswerRecord.survey_answer_option.answer);
                                    }
                                }
                            }
                        }
                    }
                    value = answers[col - 4];
                }
                worksheet.cell(index, col + 1).string(value).style(contentStyle);
            }
            index++;
        }
    }

    /// Write file excel to folder
    const fileName = `public/files/user-survey-management/user_survey_management-${req.params.id}.xlsx`;
    await workbook.write(fileName);

    res.redirect(`/files/user-survey-management/user_survey_management-${req.params.id}.xlsx`);
});

exports.searchUser = catchAsync(async (req, res, next) => {
    var { search_query, page, sort } = req.query;

    if(!sort){
        sort = ['created_at', 'DESC'];
    }

    const users = await models.User.findAndCountAll({
        where: {
            [Op.not]: {
                role: 'ADMIN'
            },
            [Op.or]: {
                name: {
                    [Op.iLike]: '%' + search_query + '%'
                },
                email: {
                    [Op.iLike]: '%' + search_query+ '%'
                },
                phone_number: {
                    [Op.iLike]: '%' + search_query + '%'
                },
                // created_at: {
                //     [Op.iLike]: '%' + search_query + '%'
                // },
            }
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med',
            },
            {
                model: models.InjectionRoute,
                as: 'injection_routes',
                where: {
                    [Op.not]: {
                        date: null
                    },
                },
                include: [
                    {
                        model: models.AnticancerMedDesignElement,
                        as: 'anticancer_med_design_element',
                    },
                    {
                        model: models.SideEffectRecord,
                        as: 'side_effect_records',
                        include: [
                            {
                                model: models.SurveyRecord,
                                as: 'survey_records',
                            },
                        ]
                    }
                ],
            }
        ],
        order: [
            sort,
            ['injection_routes','anticancer_med_design_element', 'order', 'ASC'],
            ['injection_routes','side_effect_records', 'survey_records', 'week', 'DESC']
        ],
        distinct: true,
        limit: limit,
        offset: (page - 1) * limit,
    });

    const dataItems = pug.compileFile('views/data-management/components/dataItems.pug')({
        users: users.rows,
        moment: moment,
        strings: strings
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: users.count / limit,
        current_page: Number(page),
    });
    
    res.status(200).json({
        success: true,
        message: 'Get data items successful',
        data: {
            data_items: dataItems,
            pagination: pagination,
            total_count: users.count,
            limit: limit,
        }
    });
})

const parseAnticancerDate = (req) => {
    if(!req.body.date){
        req.body.date = null;
    }else{
        const date = req.body.date.split('.').reverse();

        console.log(date);

        const momentDateFormat = [];
        const dateFormat = [];

        if (date.length > 0){
            momentDateFormat.push('YY');
            dateFormat.push('YYYY');
        }

        if (date.length > 1){
            momentDateFormat.push('MM');
            dateFormat.push('MM');
        }

        if (date.length > 2){
            momentDateFormat.push('DD');
            dateFormat.push('DD');
        }

        const reversedDateFormat = dateFormat;
        req.body.date = moment(req.body.date, momentDateFormat.join('.')).format(reversedDateFormat.join('-'));
    }

    return req.body.date
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