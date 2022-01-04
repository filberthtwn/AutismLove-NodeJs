
const express = require('express');
const viewsController = require('../../controllers/viewsController');
const feNoticeFaqController = require('../../controllers/frontend/feNoticeFaqController');

const router = express.Router();

router.use(viewsController.protect);

router.route('/notice')
    .get(feNoticeFaqController.getNoticeManagement);

router.route('/notice/refresh')
    .get(feNoticeFaqController.refreshNotice);

router
    .route('/notice/create')
    .get(feNoticeFaqController.getCreateNotice)
    .post(feNoticeFaqController.createNotice);

router
    .route('/notice/:id')
    .get(feNoticeFaqController.getNoticeDetail)
    .patch(feNoticeFaqController.updateNotice)
    .delete(feNoticeFaqController.deleteNotice);


router.route('/faq')
    .get(feNoticeFaqController.getFaqManagement);

router.route('/faq/refresh')
    .get(feNoticeFaqController.refreshFaq);

router
    .route('/faq/create')
    .get(feNoticeFaqController.getCreateFaq)
    .post(feNoticeFaqController.createFaq);

router
    .route('/faq/:id')
    .get(feNoticeFaqController.getFaqDetail)
    .patch(feNoticeFaqController.updateFaq)
    .delete(feNoticeFaqController.deleteFaq);

module.exports = router;
