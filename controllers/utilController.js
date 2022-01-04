const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const models = require('../models');

exports.getAnticancerRecordAuthority = catchAsync(async (req, res, next) => {
    const anticancerRecordAuthority = await models.Util.findOne({
        where: {
            name: 'anticancer_record_edit_authority'
        }
    })

    res.status(200).json({
        success: true,
        message: 'Get anticancer record authority successful',
        data: {
            anticancer_record_edit_authority: anticancerRecordAuthority
        }
    });
});

exports.getANCSideEffect = catchAsync(async (req, res, next) => {
    const ancSideEffect = await models.Util.findOne({
        where: {
            name: 'anc_side_effect'
        }  
    });

    ancSideEffect.value = JSON.parse(ancSideEffect.value);

    res.status(200).json({
        success: true,
        message: 'ANC Side Effect',
        data: {
            anc_side_effect: ancSideEffect
        }
    });
});