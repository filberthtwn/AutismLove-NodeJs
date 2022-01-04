const catchAsync = require('../utils/catchAsync');
const models = require('../models');

exports.getPopup = catchAsync(async (req, res, next) => {
    const popup = await models.Popup.findOne({
        order: [
            ['created_at', 'DESC']
        ]
    })

    res.status(200).json({
        success: true,
        message: 'Get popup successful',
        data: {
            popup: popup
        }
    });
});