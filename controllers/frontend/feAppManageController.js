const catchAsync = require('../../utils/catchAsync');
const models = require('../../models');
const firebase = require("../../firebaseConfig");
const multer = require('multer');
const pug = require('pug');
const { Op } = require("sequelize");
const strings = require('../../constants/strings'); 

const limit = 10;

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("ROUTE PATH: ");
        console.log(req.route.path);
        switch (req.route.path) {
            case '/push-notif-management':
                cb(null, 'public/assets/img/push-notif');
                break;
            case '/popup-management/create':
            case '/popup-management/:id':
                cb(null, 'public/assets/img/popup');
                break;
            case '/side-effect-management/:id/upload-image':
                cb(null, 'public/assets/img/side-effect-desc');
                break;
            case '/side-effect-management/anc-side-effect/upload-image':
                cb(null, 'public/assets/img/anc-side-effect');
                break;
            default:
                break;
        }
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        switch (req.route.path) {
            case '/push-notif-management':
                cb(null, `push-notif-${Date.now()}.${ext}`);
                break;
            case '/popup-management/create':
            case '/popup-management/:id':
                cb(null, `popup-${Date.now()}.${ext}`);
                break;
            case '/side-effect-management/:id/upload-image':
                cb(null, `side-effect-img-${req.params.id}-${Date.now()}.${ext}`);
            case '/side-effect-management/anc-side-effect/upload-image':
                cb(null, `anc-side-effect-img-${Date.now()}.${ext}`);
            default:
                break;
        }
        
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
        /// Maximum size is 2MB
        fileSize: 10 * (1024 * 1024),
    },
});

//* ANTICANCER MED.
exports.getAnticancerMedManagement = catchAsync(async (req, res, next) => {
    const anticancerMeds = await models.AnticancerMed.findAll({
        include: [
            {
                model: models.AnticancerMedDesign,
                as: 'anticancer_med_design',
                include: [{
                    model: models.AnticancerMedDesignElement,
                    as: 'anticancer_med_design_elements'
                }]
            },
            {
                model: models.Survey,
                as: 'survey'
            },
        ]
    });

    const surveys = await models.Survey.findAll();


    res.status(200).render('app-management/anticancer-med/anticancerMedManagement',{
        path: '/app-management',
        url: req.originalUrl,
        anticancer_meds: anticancerMeds,
        surveys: surveys,
        strings: strings
    });
});

exports.getAnticancerMedDesignDetail = catchAsync(async (req, res, next) => {
    const anticancerMed = await models.AnticancerMed.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: models.AnticancerMedDesign,
                as: 'anticancer_med_design',
                include: [
                    {
                        model: models.AnticancerMedDesignElement,
                        as: 'anticancer_med_design_elements'
                    }
                ]
            }
        ]
    })
    
    res.status(200).render('app-management/anticancer-med/anticancerMedDesignDetail',{
        path: '/app-management',
        url: req.originalUrl,
        title: strings.ANTICANCER_MED_ELEMENT(),
        anticancer_med: anticancerMed,
        strings: strings
    });
})

exports.updateAnticancerMedDesign = catchAsync(async (req, res, next) => {
    const { anticancer_med_design_elements } = req.body;

    for (anticancer_med_design_element of anticancer_med_design_elements){
        await models.AnticancerMedDesignElement.update(anticancer_med_design_element, {
            where: { id: anticancer_med_design_element.id }
        });
    }
    
    req.flash('response', {
        status: true,
        message: 'Anticancer Med. Design updated successfully!'
    });

    res.redirect('/app-management/anticancer-med-management/' + req.params.id + '/design');
});

exports.updateAnticancerMed = catchAsync(async (req, res, next) => {

    const body = {
        description: req.body.description,
        record_bg_color: req.body.record_bg_color,
        record_table_color: req.body.record_table_color
    }

    if (req.body.survey_id){
        body.survey_id = req.body.survey_id
    }

    await models.AnticancerMed.update(body, {
        where: { id: req.params.id },
        plain: true,
        returning: true
    });

    req.flash('response', {
        status: true,
        message: 'Anticancer Med. updated successfully!'
    });

    res.redirect('/app-management/anticancer-med-management');
});

// ANTICANCER MED. END
exports.getSurveyManagement = catchAsync(async (req, res, next) => {
    const surveys = await models.Survey.findAndCountAll({
        include: [
            {
                model: models.SideEffect,
                as: 'side_effects',
                include: [
                    {
                        model: models.SurveyQuestion,
                        as: 'survey_questions',
                        right: true,
                        separate: true,
                        attributes: ['survey_answer_sub_type_id'],
                        include: [
                            {
                                model: models.SurveyAnswerSubType,
                                as: 'survey_answer_sub_type',
                                include: [
                                    {
                                        model: models.SurveyAnswerType,
                                        as: 'survey_answer_type'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        order: [
            ['created_at', 'DESC']
        ],
        distinct: true,
        limit: limit,
        offset: 0,
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: surveys.count / limit,
        current_page: 1,
    });

    res.status(200).render('app-management/survey/surveyManagement', {
        path: '/app-management',
        url: req.originalUrl,
        surveys: surveys.rows,
        strings: strings,
        total_count: surveys.count,
        limit: limit,
        pagination: pagination,
    });
});

exports.getCreateSurvey = catchAsync(async (req, res, next) => {
    const surveyAnswerTypes = await models.SurveyAnswerType.findAll({
        include: [{
            model: models.SurveyAnswerSubType,
            as: 'survey_answer_sub_types'
        }]
    });

    const survey_side_effect_component = pug.compileFile('views/components/survey_side_effect.pug')({
        survey_answer_types: surveyAnswerTypes,
        strings: strings,
    });
    const survey_question_component = pug.compileFile('views/components/survey_question.pug')({
        survey_answer_types: surveyAnswerTypes,
        strings: strings,
    });

    res.status(200).render('app-management/survey/surveyDetail', {
        path: '/app-management',
        url: req.originalUrl,
        title: 'Create Survey',
        url: req.originalUrl,
        survey_side_effect_component: survey_side_effect_component,
        survey_question_component: survey_question_component,
        strings: strings,
    });
});

exports.createSurvey = catchAsync(async (req, res, next) => {
    const survey = await models.Survey.create({
        name: req.body.survey_name
    });

    for(side_effect of req.body.side_effects){
        const created_side_effect = await models.SideEffect.create({
            name: side_effect.name,
            survey_id: survey.id
        });

        for(survey_question of side_effect.survey_questions){
            await models.SurveyQuestion.create({
                question: survey_question.question,
                side_effect_id: created_side_effect.id,
                survey_answer_sub_type_id: survey_question.survey_answer_sub_type_id
            });
        }
    }

    req.flash('response', {
        status: true,
        message: 'Survey created successfully!'
    });
    
    res.redirect('/app-management/survey-management');
});

exports.getSurveyDetail = catchAsync(async (req, res, next) => {
    const survey = await models.Survey.findOne({
        where: {id : req.params.id},
        include: [
            {
                model: models.SideEffect,
                as: 'side_effects',
                include: [
                    {
                        model: models.SurveyQuestion,
                        as: 'survey_questions',
                    }
                ]
            }
        ]
    })

    const surveyAnswerTypes = await models.SurveyAnswerType.findAll({
        include: [{
            model: models.SurveyAnswerSubType,
            as: 'survey_answer_sub_types'
        }]
    });

    const survey_side_effect_component = pug.compileFile('views/components/survey_side_effect.pug')({
        survey_answer_types: surveyAnswerTypes,
        strings: strings,
    });
    const survey_question_component = pug.compileFile('views/components/survey_question.pug')({
        survey_answer_types: surveyAnswerTypes,
        strings: strings,
    });

    res.status(200).render('app-management/survey/surveyDetail', {
        path: '/app-management',
        url: req.originalUrl,
        title: strings.SURVEY_DETAIL(),
        survey: survey,
        url: req.originalUrl,
        survey_side_effect_component: survey_side_effect_component,
        survey_question_component: survey_question_component,
        strings: strings
    });
});

exports.updateSurvey = catchAsync(async (req, res, next) => {
    var survey = await models.Survey.update({
        name: req.body.survey_name
    },{
        where: {id: req.params.id},
        returning: true,
        plain: true
    });
    survey = survey[1];

    console.log(req.body);

    for(side_effect of req.body.side_effects){
        var created_side_effect;
        if (side_effect.id){
            /// Update side effect when side effect id is specified
            created_side_effect = await models.SideEffect.update({
                name: side_effect.name,
            },{
                where: {id: side_effect.id},
                returning: true,
                plain: true
            });
            created_side_effect = created_side_effect[1];
        }else{
            /// Create new side effect when side effect id is null
            created_side_effect = await models.SideEffect.create({
                name: side_effect.name,
                survey_id: survey.id
            });
        }

        for(survey_question of side_effect.survey_questions){
            if (survey_question.id){
                await models.SurveyQuestion.update({
                    question: survey_question.question,
                    survey_answer_sub_type_id: survey_question.survey_answer_sub_type_id
                },{
                    where: {id: survey_question.id},
                });
            }else{
                await models.SurveyQuestion.create({
                    question: survey_question.question,
                    side_effect_id: created_side_effect.id,
                    survey_answer_sub_type_id: survey_question.survey_answer_sub_type_id
                });
            }
        }
    }

    req.flash('response', {
        status: true,
        message: 'Survey updated successfully!'
    });
    
    res.redirect('/app-management/survey-management');
});

exports.refreshSurvey = catchAsync(async (req, res, next) => {
    const { page } = req.query;

    const surveys = await models.Survey.findAndCountAll({
        include: [
            {
                model: models.SideEffect,
                as: 'side_effects',
                include: [
                    {
                        model: models.SurveyQuestion,
                        as: 'survey_questions',
                        right: true,
                        separate: true,
                        attributes: ['survey_answer_sub_type_id'],
                        include: [
                            {
                                model: models.SurveyAnswerSubType,
                                as: 'survey_answer_sub_type',
                                include: [
                                    {
                                        model: models.SurveyAnswerType,
                                        as: 'survey_answer_type'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        order: [
            ['created_at', 'DESC']
        ],
        distinct: true,
        limit: limit,
        offset: (page - 1) * limit,
    });

    const surveyItems = pug.compileFile('views/app-management/survey/components/surveyItems.pug')({
        surveys: surveys.rows,
        url: req.originalUrl,
        strings: strings
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: surveys.count / limit,
        current_page: Number(page)
    });

    res.status(200).json({
        success: true,
        message: 'Get survey items successful',
        data: {
            strings: strings,
            survey_items: surveyItems,
            pagination: pagination,
            total_count: surveys.count
        }
    });
});

exports.getSideEffectManagement = catchAsync(async (req, res, next) => {
    const sideEffects = await models.SideEffect.findAndCountAll({
        include: [
            {
                model: models.Survey,
                as: 'survey'
            }
        ],
        limit: limit,
        offset: 0,
        order: [
            ['survey', 'name', 'ASC'],
            ['order', 'ASC']
        ]
    });

    const ancSideEffect = await models.Util.findOne({
        where: { name: 'anc_side_effect' }
    });

    ancSideEffect.value = JSON.parse(ancSideEffect.value);

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: sideEffects.count / limit,
        current_page: 1
    });

    res.status(200).render('app-management/side-effect/sideEffectManagement', {
        path: '/app-management',
        url: req.originalUrl,
        side_effects: sideEffects.rows,
        anc_side_effect: ancSideEffect,
        pagination: pagination,
        strings: strings,
        total_count: sideEffects.count,
        limit: limit
    });
});

exports.getSideEffectDetail = catchAsync(async (req, res, next) => {
    const sideEffect = await models.SideEffect.findOne({
        where: { id: req.params.id }
    });

    res.status(200).render('app-management/side-effect/sideEffectDetail', {
        path: '/app-management',
        url: req.originalUrl,
        sideEffect: sideEffect,
        strings: strings
    });
});

exports.sideEffectDescUpload = upload.single('image');
exports.uploadSideEffectDescImage = catchAsync(async (req, res, next) => {
    const link = `${req.file.destination.replace('public', '')}/${req.file.filename}`;
    return res.send({
        link: req.protocol + '://' + req.headers.host + link
    });
    return res.status(20).json({
        success: true,
        message: 'Get last injection date successful',
        data: {
            path: 'abc'
        }
    });
});

exports.updateSideEffect = catchAsync(async (req, res, next) => {
    await models.SideEffect.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    req.flash('response', {
        status: true,
        message: 'Side Effect edited successfully!'
    });
    
    res.redirect('/app-management/side-effect-management');
});

exports.getANCSideEffectDetail = catchAsync(async (req, res, next) => {
    const ancSideEffect = await models.Util.findOne({
        where: {
            name: 'anc_side_effect'
        }  
    });

    ancSideEffect.value = JSON.parse(ancSideEffect.value);

    res.status(200).render('app-management/side-effect/anc-side-effect/ancSideEffectDetail', {
        path: '/app-management',
        url: req.originalUrl,
        anc_side_effect: ancSideEffect,
        strings: strings
    });
});

exports.ancSideEffectupload = upload.single('image');
exports.uploadANCSideEffectImage = catchAsync(async (req, res, next) => {
    const link = `${req.file.destination.replace('public', '')}/${req.file.filename}`;
    return res.send({
        link: req.protocol + '://' + req.headers.host + link
    });
});

exports.updateANCSideEffect = catchAsync(async (req, res, next) => {
    console.log(req.body);
    await models.Util.update({
        value: JSON.stringify(req.body)
    }, {
        where: { name: 'anc_side_effect' }
    });

    req.flash('response', {
        status: true,
        message: 'ANC Side Effect edited successfully!'
    });
    
    res.redirect('/app-management/side-effect-management');
})

exports.refreshSideEffects = catchAsync(async (req, res, next) => {
    var { page, sort } = req.query;
    
    if(!sort){
        sort = [
            ['survey', 'name', 'ASC'],
            ['order', 'ASC']
        ]
    }

    if(sort) {
        sort = [sort]

        if(sort[0] == 'survey_name'){
            sort = [['survey', 'name', sort[1]]];
        }
    }

    console.log(sort);

    const sideEffects = await models.SideEffect.findAndCountAll({
        include: [
            {
                model: models.Survey,
                as: 'survey'
            }
        ],
        order: sort,
        distinct: true,
        limit: limit,
        offset: (page - 1) * limit,
    });

    const sideEffectItems = pug.compileFile('views/app-management/side-effect/components/sideEffectItems.pug')({
        side_effects: sideEffects.rows,
        url: '/app-management/side-effect-management',
        strings: strings
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: sideEffects.count / limit,
        current_page: Number(page)
    });

    res.status(200).json({
        success: true,
        message: 'Get side effect items successful',
        data: {
            strings: strings,
            side_effect_items: sideEffectItems,
            pagination: pagination,
            total_count: sideEffects.count
        }
    });
});

exports.getPushNotifManagement = catchAsync(async (req, res, next) => {
    const notifications = await models.PushNotification.findAndCountAll({
        order: [
            ['created_at', 'DESC']
        ],
        limit: limit,
        offset: 0,
    });

    const users = await models.User.findAll({
        where: {
            [Op.not]: {
                role: 'ADMIN'
            },
        },
    })

    /// Compile push notif user component into raw html
    const push_notif_user_component = pug.compileFile('views/components/pushNotifUser.pug')();

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: notifications.count / limit,
        current_page: 1,
    });

    res.status(200).render('app-management/push-notification/pushNotifManagement', {
        path: '/app-management',
        url: req.originalUrl,
        moment: require('moment'),
        notifications: notifications.rows,
        users: users,
        push_notif_user_component: push_notif_user_component,
        strings: strings,
        pagination: pagination,
        total_count: notifications.count,
        limit: limit,
    });
});

exports.pushNotifImageUpload = upload.single('image');
exports.createPushNotif = catchAsync(async (req, res, next) => {
    console.log('IMAGE: ');
    console.log(req.file);
    if (req.file){
        req.body.image_url = `${req.file.destination.replace('public', '')}/${req.file.filename}`;
    }

    await models.PushNotification.create(req.body);
    // await sendNotification(req);

    req.flash('response', {
        status: true,
        message: 'Notification created successfully!'
    });

    res.redirect('/app-management/push-notif-management');
});

exports.updatePushNotif = catchAsync(async (req, res, next) => {
    if (req.file){
        req.body.image_url = `${req.file.destination.replace('public', '')}/${req.file.filename}`;
    }

    const notification = await models.PushNotification.findOne({
        where: { id: req.params.id }
    });

    var users = [];
    if (req.body.selected_users){
        users = await models.User.findAll({
            where: {
                id: req.body.selected_users
            }
        });
    }
    
    req.body = {
        title: notification.title,
        description: notification.description,
        link: notification.link,
        image_url: notification.image_url,
        selected_users: users
    }

    await sendNotification(req);

    req.flash('response', {
        status: true,
        message: 'Notification push successfully!'
    });

    res.redirect('/app-management/push-notif-management');
});

exports.deletePushNotif = catchAsync(async (req, res, next) => {
    await models.PushNotification.destroy({
        where: {id: req.params.id}
    });

    req.flash('response', {
        status: true,
        message: 'Notification deleted successfully!'
    });

    res.redirect('/app-management/push-notif-management');
});

exports.refreshPushNotif = catchAsync(async (req, res, next) => {
    var { page, sort } = req.query;

    if(!sort){
        sort = ['created_at', 'DESC'];
    }

    const notifications = await models.PushNotification.findAndCountAll({
        order: [
            sort
        ],
        limit: limit,
        offset: (page - 1) * limit,
    });

    const pushNotifItems = pug.compileFile('views/app-management/push-notification/components/pushNotifItems.pug')({
        notifications: notifications.rows,
        url: req.originalUrl,
        strings: strings,
        moment: require('moment')
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: notifications.count / limit,
        current_page: Number(page)
    });

    res.status(200).json({
        success: true,
        message: 'Get notification items successful',
        data: {
            push_notif_items: pushNotifItems,
            pagination: pagination,
            total_count: notifications.count
        }
    });
});

const sendNotification = async (req) => {
    const { title, link, description, image_url, selected_users } = req.body;
    const baseUrl = req.protocol + "://" + req.headers.host;

    message = {
        notification: {
            title: title,
            body: description,
            imageUrl: 'https://www.w3schools.com/w3css/img_lights.jpg',
        },
        data: {}
    }

    if (link){
        message.data.link = link
    }

    // if (image_url){
    //     message.notification.image = 'https://www.w3schools.com/w3css/img_lights.jpg';
    //     message.apns = {
    //         payload: 'test',
    //         image: 'https://www.w3schools.com/w3css/img_lights.jpg',
    //     }
    // }

    console.log(message);

    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    /// When no user selected, then send it to topic 'admin'
    if(!selected_users){
        message.topic = 'admin';
        await firebase.messaging().send(message);
        return
    }

    /// Send to spesific user when selected_users.length > 0
    for (const selected_user of selected_users) {
        if (selected_user.fcm_token){
            const response = await firebase.messaging().sendToDevice(selected_user.fcm_token, message, notification_options);
            console.log(response);
        }
    }
} 

exports.getPopupManagement = catchAsync(async (req, res, next) => {
    const popups = await models.Popup.findAndCountAll({
        order: [
            ['created_at', 'DESC']
        ],
        limit: limit,
        offset: 0,
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: popups.count / limit,
        current_page: 1,
    });

    res.status(200).render('app-management/popup/popupManagement', {
        path: '/app-management',
        url: req.originalUrl,
        popups: popups.rows,
        moment: require('moment'),
        strings: strings,
        pagination: pagination,
        total_count: popups.count,
        limit: limit,
    });
});

exports.getPopupDetail= catchAsync(async (req, res, next) => {
    const popup = await models.Popup.findOne({
        where: { id: req.params.id }
    });

    res.status(200).render('app-management/popup/popupDetail', {
        path: '/app-management',
        url: req.originalUrl,
        popup: popup,
        moment: require('moment'),
        title: strings.UPDATE_POPUP(),
        strings: strings
    });
});

exports.getCreatePopup = catchAsync(async (req, res, next) => {
    res.status(200).render('app-management/popup/popupDetail', {
        path: '/app-management',
        url: req.originalUrl,
        title: strings.CREATE_POPUP(),
        strings: strings
    });
});

exports.popupImageUpload = upload.single('image');
exports.createPopup = catchAsync(async (req, res, next) => {
    if (req.file){
        req.body.image_url = `${req.file.destination.replace('public', '')}/${req.file.filename}`;
    }
    
    req.body.start_date = req.body.start_date + ' ' + req.body.start_time;
    req.body.end_date = req.body.end_date + ' ' + req.body.end_time;

    await models.Popup.create(req.body);

    req.flash('response', {
        status: true,
        message: 'Popup created successfully!'
    });

    res.redirect('/app-management/popup-management');
});

exports.updatePopup = catchAsync(async (req, res, next) => {
    if (req.file){
        req.body.image_url = `${req.file.destination.replace('public', '')}/${req.file.filename}`;
    }

    await models.Popup.update(req.body, {
        where: { id: req.params.id }
    });

    req.flash('response', {
        status: true,
        message: 'Popup updated successfully!'
    });

    res.redirect('/app-management/popup-management');
});

exports.deletePopup = catchAsync(async (req, res, next) => {
    await models.Popup.destroy({
        where: { id: req.params.id }
    });

    req.flash('response', {
        status: true,
        message: 'Popup deleted successfully!'
    });

    res.redirect('/app-management/popup-management');
});

exports.refreshPopup = catchAsync(async (req, res, next) => {
    var { page, sort } = req.query;

    if(!sort){
        sort = ['created_at', 'DESC'];
    }

    const popups = await models.Popup.findAndCountAll({
        order: [
            sort
        ],
        limit: limit,
        offset: (page - 1) * limit,
    });

    const popupItems = pug.compileFile('views/app-management/popup/components/popupItems.pug')({
        popups: popups.rows,
        url: req.originalUrl,
        strings: strings,
        moment: require('moment')
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: popups.count / limit,
        current_page: Number(page)
    });

    res.status(200).json({
        success: true,
        message: 'Get popup items successful',
        data: {
            strings: strings,
            popup_items: popupItems,
            pagination: pagination,
            total_count: popups.count
        }
    });
});
  
exports.getAuthorityManagement = catchAsync(async (req, res, next) => {
    const isEditAnticancerAuthorityEnable = await models.Util.findOne({
        where: { name: 'anticancer_record_edit_authority' }
    })

    res.status(200).render('app-management/authority/authorityManagement', {
        path: '/app-management',
        url: req.originalUrl,
        isEditAnticancerAuthorityEnable: isEditAnticancerAuthorityEnable.value,
        strings: strings
    });
});

/**
 * Update Anticancer Edit Authoerity
 */
exports.updateAuthorityManagement = catchAsync(async (req, res, next) => {
    /// Do update anticancer edit authority query
    await models.Util.update({
        value: (req.body.is_edit_anticancer_authority_enable == 'on') ? 'true' : 'false'
    }, {
        where: { name: 'anticancer_record_edit_authority' }
    })

    /// Setup flash session for alert
    req.flash('response', {
        status: true,
        message: 'Update authority successfully!'
    });

    /// When finished, redirect to authority mangement
    res.redirect('/app-management/authority-management');
});