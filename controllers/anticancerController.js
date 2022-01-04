const catchAsync = require('../utils/catchAsync');
const models = require('../models');

exports.createAnticancerRecord = catchAsync(async (req, res, next) => {
    const anticancerRecord = await models.AnticancerRecord.create(req.body)
    console.log(anticancerRecord);

    res.status(200).json({
        success: true,
        message: 'Create anticancer record successful',
        data: {
            
        }
    });
});

exports.getAnticancerRecord = catchAsync(async (req, res, next) => {
    const { page } = req.query;
    const limit = req.query.limit ?? 15;
    const offset = (page <= 1) ? page - 1 : ((page - 1) * limit);

    const anticancerRecord = await models.AnticancerRecord.findAndCountAll({
        where: {
            user_id: req.user.id 
        },
        limit: limit,
        offset: offset
    })

    res.status(200).json({
        success: true,
        message: 'Get all anticancer record successful',
        data: {
            total_value: anticancerRecord.count,
            limit: limit,
            page: parseInt(page),
            anticancerRecord: anticancerRecord.rows
        }
    });
});

exports.getAnticancerMedDetail = catchAsync(async (req, res, next) => {
    const anticancerMed = await models.AnticancerMed.findOne({
        id: req.user.anticancer_med.id
    });

    res.status(200).json({
        success: true,
        message: 'Get anticancer med detail successful',
        data: {
            anticancer_med: anticancerMed
        }
    });
})