const catchAsync = require('../../utils/catchAsync');
const models = require('./../../models');

exports.createHospital = catchAsync(async (req, res, next) => {
    const hospital = await models.Hospital.create(req.body)

    res.status(201).json({
        success: true,
        message: 'Hospital created successfully',
        data: {
            hospital: hospital
        }
    });
});