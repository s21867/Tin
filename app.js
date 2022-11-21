var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var buildingsRouter = require('./routes/BuildingsRoute')
var clientsRouter = require('./routes/ClientsRoute')
var purchaseRouter = require('./routes/PurchasesRoute')
var clientApiRouter = require('./routes/api/ClientApiRoute')
var buildingApiRouter = require('./routes/api/BuildingApiRoute')
var purchaseApiRouter = require('./routes/api/PurchaseApiRoute')
var authApiRouter = require('./routes/api/AuthApiRoute')
var cors = require('cors')


const session = require('express-session');
const authUtils = require('./util/authUtils')
const i18n = require('i18n');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
i18n.configure({
  locales: ['pl','en'],
  directory: path.join(__dirname,'locales'),
  objectNotation: true,
  cookie: 'acme-hr-lang'
})
app.use(i18n.init)
app.use((req,res,next) => {
  if(!res.locals.lang){
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next()
})

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'my_secret_password',
  resave: false
}))
app.use((req,res,next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
})

app.use('/', indexRouter);
app.use('/Buildings',authUtils.permitAuthenticatedUser,buildingsRouter)
app.use('/Clients',authUtils.permitAuthenticatedUser,clientsRouter)
app.use('/Purchases',authUtils.permitAuthenticatedUser,purchaseRouter)
app.use('/api/Clients',clientApiRouter)
app.use('/api/Buildings',buildingApiRouter)
app.use('/api/Purchases',purchaseApiRouter)
app.use('/api/auth',authApiRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
