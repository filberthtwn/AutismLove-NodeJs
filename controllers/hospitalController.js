const dotenv = require('dotenv');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');

exports.getAllHospital = catchAsync(async (req, res, next) => {
    const { name } = req.query;
    const params = {
        'ServiceKey': process.env.DATA_GO_SERVICE_KEY,
        'QN': name
    };

    const response = await axios.get('http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire',{
        params: params
    });
    
    var filteredHospitals = [];
    const hospitals = response.data.response.body.items.item;
    for (const hospital of hospitals) {
        filteredHospitals.push(hospital.dutyName);
    }
    
    res.status(200).json({
        success: true,
        message: 'Get all hospital successful',
        data: {
            hospitals: filteredHospitals
        }
    });
});