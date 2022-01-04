const catchAsync = require('../../utils/catchAsync');
const models = require('../../models');
const strings = require('../../constants/strings'); 
const pug = require('pug');

const limit = 10;

exports.getNoticeManagement = catchAsync(async (req, res, next) => {
    const notices = await models.Notice.findAndCountAll({
        order: [
            ['created_at', 'DESC']
        ],
        limit: limit,
        offset: 0,
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: notices.count / limit,
        current_page: 1
    });

    res.status(200).render('notice-faq-management/noticeManagement',{
        path: '/notice-faq-management',
        notices: notices.rows,
        moment: require('moment'),
        url: req.originalUrl,
        pagination: pagination,
        strings: strings,
        total_count: notices.count,
        limit: limit,
        pagination: pagination,
    });
});

exports.getCreateNotice = catchAsync(async (req, res, next) => {
    res.status(200).render('notice-faq-management/noticeDetail',{
        path: '/notice-faq-management',
        title: strings.CREATE_NOTICE(),
        url: req.originalUrl,
        strings: strings
    });
});

exports.createNotice = catchAsync(async (req, res, next) => {
    await models.Notice.create(req.body);

    req.flash('response', {
        status: true,
        message: 'Notice created successfully!'
    });
    
    res.redirect('/notice-faq-management/notice');
});

exports.getNoticeDetail = catchAsync(async (req, res, next) => {
    const notice = await models.Notice.findOne({
        where: { id: req.params.id }
    });

    res.status(200).render('notice-faq-management/noticeDetail',{
        path: '/notice-faq-management',
        title: strings.NOTICE_DETAIL(),
        notice: notice,
        moment: require('moment'),
        url: req.originalUrl,
        strings: strings
    });
});

exports.updateNotice = catchAsync(async (req, res, next) => {
    await models.Notice.update(req.body,
    {
        where: { id: req.params.id }
    });

    req.flash('response', {
        status: true,
        message: 'Notice updated successfully!'
    });
    
    res.redirect('/notice-faq-management/notice');
});

exports.deleteNotice = catchAsync(async (req, res, next) => {
    await models.Notice.destroy({
        where: {id: req.params.id}
    });

    req.flash('response', {
        status: true,
        message: 'Notice deleted successfully!'
    });
    
    res.redirect('/notice-faq-management/notice');
});

exports.refreshNotice = catchAsync(async (req, res, next) => {
    var { page, sort } = req.query;
    
    if(!sort){
        sort = ['created_at', 'DESC'];
    }

    const notices = await models.Notice.findAndCountAll({
        order: [
            sort
        ],
        limit: limit,
        offset: (page - 1) * limit,
    });

    const noticeItems = pug.compileFile('views/notice-faq-management/components/noticeItems.pug')({
        notices: notices.rows,
        url: req.originalUrl,
        strings: strings,
        moment: require('moment'),
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: notices.count/ limit,
        current_page: page
    });

    res.status(200).json({
        success: true,
        message: 'Get notice items successful',
        data: {
            strings: strings,
            notices_items: noticeItems,
            pagination: pagination
        }
    });
});

//* FAQ SECTION
exports.getFaqManagement = catchAsync(async (req, res, next) => {
    const faqs = await models.Faq.findAndCountAll({
        order: [
            ['created_at', 'DESC']
        ],
        limit: limit,
        offset: 0,
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: faqs.count / limit,
        current_page: 1
    });

    res.status(200).render('notice-faq-management/faqManagement',{
        path: '/notice-faq-management',
        faqs: faqs.rows,
        url: req.originalUrl,
        strings: strings,
        total_count: faqs.count,
        limit: limit,
        pagination: pagination,
    });
});

exports.getCreateFaq = catchAsync(async (req, res, next) => {
    res.status(200).render('notice-faq-management/faqDetail',{
        path: '/notice-faq-management',
        title: strings.CREATE_FAQ(),
        url: req.originalUrl,
        strings: strings
    });
});

exports.createFaq = catchAsync(async (req, res, next) => {
    await models.Faq.create(req.body);

    req.flash('response', {
        status: true,
        message: 'FAQ created successfully!'
    });
    
    res.redirect('/notice-faq-management/faq');
});

exports.getFaqDetail = catchAsync(async (req, res, next) => {
    const faq = await models.Faq.findOne({
        where: { id: req.params.id }
    });

    res.status(200).render('notice-faq-management/faqDetail',{
        path: '/notice-faq-management',
        title: strings.FAQ_DETAIL(),
        faq: faq,
        moment: require('moment'),
        url: req.originalUrl,
        strings: strings
    });
});

exports.updateFaq = catchAsync(async (req, res, next) => {
    await models.Faq.update(req.body,
    {
        where: { id: req.params.id }
    });

    req.flash('response', {
        status: true,
        message: 'FAQ updated successfully!'
    });
    
    res.redirect('/notice-faq-management/faq');
});

exports.deleteFaq = catchAsync(async (req, res, next) => {
    await models.Faq.destroy({
        where: {id: req.params.id}
    });

    req.flash('response', {
        status: true,
        message: 'FAQ deleted successfully!'
    });
    
    res.redirect('/notice-faq-management/faq');
});

exports.refreshFaq = catchAsync(async (req, res, next) => {
    const { page, sort } = req.query;

    if(!sort){
        sort = ['created_at', 'DESC'];
    }

    const faqs = await models.Faq.findAndCountAll({
        order: [
            sort
        ],
        limit: limit,
        offset: (page - 1) * limit,
    });

    const faqItems = pug.compileFile('views/notice-faq-management/components/faqItems.pug')({
        faqs: faqs.rows,
        url: req.originalUrl,
        strings: strings,
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: faqs.count/ limit,
        current_page: page
    });
    
    res.status(200).json({
        success: true,
        message: 'Get faq items successful',
        data: {
            strings: strings,
            faq_items: faqItems,
            pagination: pagination
        }
    });
});