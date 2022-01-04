const catchAsync = require('../../utils/catchAsync');
const models = require('../../models');

exports.createAnticancerRecord = catchAsync(async (req, res, next) => {
    const anticancerRecord = await models.AnticancerRecord.create(req.body)

    res.status(200).json({
        success: true,
        message: 'Create anticancer record successful',
        data: anticancerRecord
    });
});