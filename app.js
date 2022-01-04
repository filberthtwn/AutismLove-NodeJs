const path = require('path');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const cors = require('cors');

const adminAuthRouter = require('./routes/frontend/adminAuthRoutes');
const feUserRouter = require('./routes/frontend/userRoutes');
const feDataRouter = require('./routes/frontend/feDataManageRoutes');
const feNoticeFaqRouter = require('./routes/frontend/feNoticeFaqRoutes');
const feAppManageRouter = require('./routes/frontend/feAppManageRoutes');

const viewRouter = require('./routes/frontend/viewRoutes');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const hospitalRouter = require('./routes/hospitalRoutes');
const injectionRouteRouter = require('./routes/injectionRouteRoutes');
const anticancerRouter = require('./routes/anticancerRoutes');
const anticancerMedRouter = require('./routes/anticancerMedRoutes');
const surveyRouter = require('./routes/surveyRoutes');
const anticancerMedTypesRouter = require('./routes/anticancerMedTypesRoutes');
const sideEffectRecordRouter = require('./routes/sideEffectRecordRoutes');
const popupdRouter = require('./routes/popupRoutes');
const utilRouter = require('./routes/utilRoutes');

//* Admin Routes Require
const adminHospitalRouter = require('./routes/admin/adminHospitalRoutes');
const adminAnticancerRecordRouter = require('./routes/admin/adminAnticancerRoutes');
const adminSurveyRouter = require('./routes/admin/adminSurveyRoutes');

const app = express();
app.use(cookieParser());
app.enable('trust proxy');

app.use(session({ secret: 'biock_secret',saveUninitialized: true, resave: true, cookie: { maxAge: 60000 } }));

//* Configure flash session
app.use(flash());
app.use((req, res, next) => {
    res.locals.response = req.flash("response");
    next();
});

//* Enable CORS
app.use(cors())

// Configure method override for frontend admin forms
app.use(methodOverride('_method'));

app.set('view engine', 'pug');
app.set('view cache', false);
app.set('views',[ 
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/data-management')]);

/// Setup global for pug template
app.locals.basedir = path.join(__dirname, 'views');
app.locals.moment = require('moment');
app.locals.ucfirst = function(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
};
// app.locals.incrementDay = function(date, days){
//     const date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// };

Date.prototype.incrementDay = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
// app.use('/biock', express.static(path.join(__dirname, 'public')));


app.use("/js-datepicker", express.static(path.join(__dirname, "/node_modules/js-datepicker/dist")));
app.use("/jquery", express.static(path.join(__dirname, "/node_modules/jquery/dist")));
app.use("/moment", express.static(path.join(__dirname, "/node_modules/moment/dist")));

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App running on port ${port}...${__dirname}`);
});

app.use('/api/v1', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/hospitals', hospitalRouter);
app.use('/api/v1/injection-routes', injectionRouteRouter);
app.use('/api/v1/anticancer-records', anticancerRouter);
app.use('/api/v1/anticancer-med', anticancerMedRouter);
app.use('/api/v1/surveys', surveyRouter);
app.use('/api/v1/anticancer-med-types', anticancerMedTypesRouter);
app.use('/api/v1/side-effect-records', sideEffectRecordRouter);
app.use('/api/v1/popups', popupdRouter);
app.use('/api/v1/utils', utilRouter);

//* Admin Routes
app.use('/api/admin/v1/hospitals', adminHospitalRouter);
app.use('/api/admin/v1/anticancer-records', adminAnticancerRecordRouter);
app.use('/api/admin/v1/surveys', adminSurveyRouter);

//* Frontend Routes
app.use('/login', adminAuthRouter);
app.use('/user-management', feUserRouter);
app.use('/data-management', feDataRouter);
app.use('/notice-faq-management', feNoticeFaqRouter);
app.use('/app-management', feAppManageRouter);

app.use('/', viewRouter);

app.use(globalErrorHandler);
