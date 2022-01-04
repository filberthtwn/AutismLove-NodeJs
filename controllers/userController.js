const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const models = require('./../models');

exports.getUserDetail = catchAsync(async (req, res, next) => {
    var user = await models.User.findOne({
        where: {
            id: req.user.id
        },
        attributes: { include: ['pattern'] },
        include: [{
            model: models.AnticancerMed,
            as: 'anticancer_med',
            include: [
                {
                    model: models.AnticancerMedDesign,
                    as: 'anticancer_med_design'
                }
            ]
        }]
    });

    user = user.toJSON();
    user.is_pattern_created = (user.pattern) ? true : false;

    user.pattern = null;

    res.status(200).json({
        success: true,
        message: 'Get user detail successful',
        data: {
            user: user
        }
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
        
    if (req.body.anticancer_med){
        const anticancerMed = await models.AnticancerMed.findOne({
            where: { name: req.body.anticancer_med }
        });
    
        if (!anticancerMed){
            return next(new AppError('Anticancer medical not found', 400));
        }

        req.body.anticancer_med_id = anticancerMed.id;
    }
    
    await models.User.update(req.body, { 
            where: { id: req.user.id },
            individualHooks: true,
        },
    );

    if (req.body.surgery_date){
        const injectionRoutes = await models.InjectionRoute.findAll({
            where: {
                user_id: req.user.id
            },
            include: [{
                model: models.AnticancerMedDesignElement,
                as: 'anticancer_med_design_element'
            }],
            order: [
                ['anticancer_med_design_element', 'order']
            ]
        })

        await models.InjectionRoute.update({
            date: req.body.surgery_date
        },{
            where: {
                id: injectionRoutes[1].id
            }
        })
    }

    const user = await models.User.findOne({
        where: { id: req.user.id },
        include: [{
            model: models.AnticancerMed,
            as: 'anticancer_med',
            attributes: ['id', 'name']
        }]
    })

    res.status(201).json({
        success: true,
        message: 'Update user successful',
        data: {
            user: user
        }
    });
});

exports.updateAlarmSetting = catchAsync(async (req, res, next) => {
    const user = await models.User.update(req.body, {
        where: { id: req.user.id },
        plain: true,
        returning: true
    })

    res.status(201).json({
        success: true,
        message: 'Update alarm setting successful',
        data: {
            user: user[1]
        }
    });
})

exports.updateVisited = catchAsync(async (req, res, next) => {
    const { identifier, value } = req.body;

    if(identifier != 'main_visited' && 
    identifier != 'survey_visited' && 
    identifier != 'record_visited' && 
    identifier != 'side_effect_visited'){
        return next(new AppError('Identifier not found', 400));
    }

    const body = {};
    body[identifier] = (value != null) ? value : true;

    const user = await models.User.update(body, {
        where: { id: req.user.id },
        plain: true,
        returning: true
    });

    console.log(user);

    res.status(201).json({
        success: true,
        message: `Update ${identifier} successful`,
        data: {
            user: user[1]
        }
    });
})