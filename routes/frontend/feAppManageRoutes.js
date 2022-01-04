const express = require('express');
const feAppManageController = require('../../controllers/frontend/feAppManageController');
const viewsController = require('../../controllers/viewsController');

const router = express.Router();

router.use(viewsController.protect);

router
    .route('/anticancer-med-management')
    .get(feAppManageController.getAnticancerMedManagement);

router
    .route('/anticancer-med-management/:id')
    .patch(feAppManageController.updateAnticancerMed);

router
    .route('/anticancer-med-management/:id/design')
    .get(feAppManageController.getAnticancerMedDesignDetail)
    .patch(feAppManageController.updateAnticancerMedDesign);

router
    .route('/survey-management')
    .get(feAppManageController.getSurveyManagement);

router
    .route('/survey-management/refresh')
    .get(feAppManageController.refreshSurvey);

router
    .route('/survey-management/create')
    .get(feAppManageController.getCreateSurvey)
    .post(feAppManageController.createSurvey);

router
    .route('/survey-management/:id')
    .get(feAppManageController.getSurveyDetail)
    .patch(feAppManageController.updateSurvey);

router
    .route('/side-effect-management')
    .get(feAppManageController.getSideEffectManagement);

router
    .route('/side-effect-management/refresh')
    .get(feAppManageController.refreshSideEffects);

router
    .route('/side-effect-management/anc-side-effect/upload-image')
    .post(feAppManageController.sideEffectDescUpload,
        feAppManageController.uploadSideEffectDescImage);

router
    .route('/side-effect-management/anc-side-effect')
    .get(feAppManageController.getANCSideEffectDetail)
    .patch(feAppManageController.updateANCSideEffect);

router
    .route('/side-effect-management/:id')
    .get(feAppManageController.getSideEffectDetail)
    .patch(feAppManageController.updateSideEffect);

router
    .route('/side-effect-management/:id/upload-image')
    .post(feAppManageController.sideEffectDescUpload,
        feAppManageController.uploadSideEffectDescImage);

router
    .route('/push-notif-management')
    .get(feAppManageController.getPushNotifManagement)
    .post(feAppManageController.pushNotifImageUpload, 
        feAppManageController.createPushNotif);

router
    .route('/push-notif-management/refresh')
    .get(feAppManageController.refreshPushNotif);

router
    .route('/push-notif-management/:id')
    .delete(feAppManageController.deletePushNotif)
    .patch(feAppManageController.pushNotifImageUpload, 
        feAppManageController.updatePushNotif);
router
    .route('/popup-management')
    .get(feAppManageController.getPopupManagement);

router
    .route('/popup-management/refresh')
    .get(feAppManageController.refreshPopup);

router
    .route('/popup-management/create')
    .get(feAppManageController.getCreatePopup)
    .post(feAppManageController.popupImageUpload,
        feAppManageController.createPopup);

router
    .route('/popup-management/:id')
    .get(feAppManageController.getPopupDetail)
    .patch(feAppManageController.popupImageUpload,
        feAppManageController.updatePopup)
    .delete(feAppManageController.deletePopup);

router
    .route('/authority-management')
    .get(feAppManageController.getAuthorityManagement)
    .patch(feAppManageController.updateAuthorityManagement);

module.exports = router;
