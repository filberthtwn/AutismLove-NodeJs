const catchAsync = require('../../utils/catchAsync');
const models = require('../../models');
const { Op } = require("sequelize");
const excelGenerator = require('excel4node');
const moment = require('moment');
const strings = require('../../constants/strings');
const pug = require('pug');

const response = {
    status: true,
    message: '',
    data: null
}

const limit = 10;

exports.getUserManagement = catchAsync(async (req, res, next) => {
    const users = await models.User.findAndCountAll({
        where: {
            [Op.not]: {
                role: 'ADMIN'
            },
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med'
            }
        ],
        order: [
            ['created_at', 'DESC']
        ],
        limit: limit,
        offset: 0,
    });

    console.log(users.count);

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: users.count / limit,
        current_page: 1
    });

    res.status(200).render('user-management/userManagement',{
        path: '/user-management',
        url: req.originalUrl,
        users: users.rows,
        strings: strings,
        total_count: users.count,
        limit: limit,
        pagination: pagination,
    });
});

exports.getUserDetail = catchAsync(async (req, res, next) => {
    const user = await models.User.scope('showLastLoginAt').findOne({
        where: {
            id: req.params.id,
            [Op.not]: {
                role: 'ADMIN',
            },
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med',
            },
            {
                model: models.InjectionRoute,
                as: 'injection_routes',
                include: [
                    {
                        model: models.AnticancerMedDesignElement,
                        as: 'anticancer_med_design_element',
                    }
                ],
                where: {
                    [Op.not]: {
                        date: null
                    }
                }
            }
        ]
    });

    const anticancerMeds = await models.AnticancerMed.findAll();

    const sideEffectRecord = await models.SideEffectRecord.findOne({
        where: { injection_route_id: user.injection_routes[user.injection_routes.length-1].id }
    })

    var surveyRecord;
    if (sideEffectRecord){
        surveyRecord = await models.SurveyRecord.findOne({
            where: { side_effect_record_id: sideEffectRecord.id },
            order: [
                ['week', 'DESC']
            ]
        })
    }
    console.log(surveyRecord);

    res.status(200).render('user-management/userDetail', {
        path: '/user-management',
        url: req.originalUrl,
        user: user,
        anticancer_meds: anticancerMeds,
        last_survey_record: surveyRecord,
        moment: require('moment'),
        strings: strings,
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await models.User.update(req.body, {
        where: {id: req.params.id},
        returning: true,
        plain: true
    })

    req.flash('response', {
        status: true,
        message: 'User update successful!'
    });
    
    res.redirect('/user-management/' + user[1].id);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    if (req.body.new_password !== req.body.confirm_new_password){
        req.flash('response', {
            status: false,
            message: 'Password not match'
        });
    }

    if (req.body.new_password.length < 8 || req.body.new_password.length > 20){
        req.flash('response', {
            status: false,
            message: 'Password should be more than 8 less than 20 letters'
        });
    }

    await models.User.update({
        password: req.body.new_password
    }, {
        where: { id: req.params.id },
        individualHooks: true
    })

    req.flash('response', {
        status: true,
        message: 'Change Password successful!'
    });
    
    res.redirect('/user-management/' + req.params.id);
});

exports.updateUserStatus = catchAsync(async (req, res, next) => {
    var user = await models.User.findOne({
        where: { id: req.params.id }
    });

    user = await models.User.update({
        is_active: !user.is_active
    },{
        where: { id: req.params.id },
        plain: true,
        returning: true
    });

    req.flash('response', {
        status: true,
        message: 'User status updated!'
    });

    res.redirect('/user-management/' + user[1].id);
});

exports.userExcelDownload = catchAsync(async (req, res, next) => {
    const headers = [
        {title: 'Created Date', key: 'created_at', width: 16},
        {title: 'ID', key: 'email', width: 24},
        {title: 'Name', key: 'name', width: 24},
        {title: 'Phone Number', key: 'phone_number', width: 24},
        {title: 'Anticancer Med. Type', key: 'anticancer_med', width: 24},
    ];
    const workbook = new excelGenerator.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    /// Initialize header style
    let headerStyle = workbook.createStyle({
        alignment: {
            horizontal: 'center',
            vertical: 'center',
            relativeIndent: 24,
            wrapText: true
        },
        fill:{
            type: 'pattern',
            patternType: 'solid',
            fgColor: '#FF9595'
        },
        font: {
          color: '#FFFFFF',
          vertAlign: 'center',
          size: 12,
        },
    });

    /// Setup Header
    worksheet.row(1).setHeight(30);
    for (const [idx, val] of headers.entries()) {
        worksheet.column(idx + 1).setWidth(val.width);
        worksheet.cell(1, idx + 1).string(val.title).style(headerStyle);
    }

    /// Initialize content style
    const contentStyle = workbook.createStyle({
        alignment: {
            vertical: 'center',
            wrapText: true
        },
        font: {
          color: '#000000',
          size: 12,
        },
    });

    /// Get all users
    const users = await models.User.findAll({
        where: {
            [Op.not]: {
                role: 'ADMIN'
            },
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med'
            }
        ]
    });

    /// Insert users into excel
    for (const [row, user] of users.entries()) {
        for (const [col, header] of headers.entries()) {
            let value = String(user[header.key] ?? '-');
            /// When key is 'created_at' get only name
            if (header.key === 'created_at'){
                value = moment(user.created_at).format('YYYY-MM-DD')
            }

            /// When key is 'anticancer_med' get only name
            if (header.key === 'anticancer_med'){
                value = user.anticancer_med.name;
            }
            worksheet.cell(row + 2, col + 1).string(value).style(contentStyle);
        }
    }

    /// Write file excel to folder
    const fileName = `public/files/user-management/user_management.xlsx`;
    workbook.write(fileName);

    res.redirect('/files/user-management/user_management.xlsx');
})

exports.refreshUsers = catchAsync(async (req, res, next) => {
    var { search_query, page, sort } = req.query;

    if(!sort){
        sort = ['created_at', 'DESC'];
    }
    
    if (sort){
        if (sort[0] == 'anticancer_med'){
            sort = ['anticancer_med', 'name', sort[1]]
        }
    }

    console.log("DEBUG");
    console.log(sort);

    const users = await models.User.findAndCountAll({
        where: {
            [Op.not]: {
                role: 'ADMIN'
            },
            [Op.or]: {
                name: {
                    [Op.iLike]: '%' + search_query + '%'
                },
                email: {
                    [Op.iLike]: '%' + search_query+ '%'
                },
                phone_number: {
                    [Op.iLike]: '%' + search_query + '%'
                }
            }
        },
        include: [
            {
                model: models.AnticancerMed,
                as: 'anticancer_med'
            }
        ],
        order: [sort],
        limit: limit,
        offset: (page - 1) * limit,
    });
    
    const userItems = pug.compileFile('views/user-management/components/userItems.pug')({
        users: users.rows,
        moment: moment,
        strings: strings
    });

    const pagination = pug.compileFile('views/components/pagination.pug')({
        total_count: users.count / limit,
        current_page: Number(page)
    });
    
    res.status(200).json({
        success: true,
        message: 'Get user items successful',
        data: {
            user_items: userItems,
            pagination: pagination,
            total_count: users.count
        }
    });
})