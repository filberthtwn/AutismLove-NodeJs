const express = require('express');
const feDataManageController = require('../../controllers/frontend/feDataManageController');
const viewsController = require('../../controllers/viewsController');

const router = express.Router();

router.use(viewsController.protect);
router.use(viewsController.restrictTo('ADMIN'));

router
    .route('/')
    .get(feDataManageController.getDataManagement);

router
    .route('/refresh')
    .get(feDataManageController.searchUser);

router
    .route('/download-excel')
    .get(feDataManageController.dataExcelDownload);

router
    .route('/:id/route')
    .get(feDataManageController.getRoute)
    .patch(feDataManageController.updateInjectionRoute);

router
    .route('/:id/route/download-excel')
    .get(feDataManageController.routeExcelDownload);

router
    .route('/:id/route/:injection_route_id')
    .patch(viewsController.restrictTo('ADMIN'),
        feDataManageController.updateInjectionRoute);
        
router
    .route('/:id/anticancer-record')
    .get(feDataManageController.getAnticancerRecord)
    .post(viewsController.restrictTo('ADMIN'),
    feDataManageController.createAnticancerRecord);

router
    .route('/:id/anticancer-record/refresh')
    .get(feDataManageController.refreshAnticancerRecord);

router
    .route('/:id/anticancer-record/download-excel')
    .get(feDataManageController.anticancerRecordExcelDownload);

router
    .route('/:id/anticancer-record/:anticancer_record_id')
    .patch(feDataManageController.updateAnticancerRecord)
    .delete(feDataManageController.deleteAnticancerRecord);

router
    .route('/:id/survey-list')
    .get(feDataManageController.getSurveyList);

router
    .route('/:id/survey-list/download-excel')
    .get(feDataManageController.routeSurveyListDownload);

router
    .route('/:id/survey-list/alarm-date-setting')
    .patch(feDataManageController.updateAlarmDateSetting);

router
    .route('/:id/survey-list/last-survey-date')
    .patch(feDataManageController.updateLastSurveyDate);

router
    .route('/:id/survey-list/survey-duration')
    .patch(feDataManageController.updateSurveyDuration);

router
    .route('/:id/survey-list/alarm-setting')
    .patch(feDataManageController.updateAlarmSetting);

module.exports = router;