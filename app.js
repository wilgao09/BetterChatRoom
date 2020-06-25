var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var bodyparser = require('body-parser');

var indexRouter = require('./routes/index');
var checkUserRouter = require('./routes/checkUser');
var dashboardRouter = require('./routes/dashboard');
var roomRouter = require('./routes/rooms');

var JWTmid = require('./middleware/JWTAuth');
// var usersRouter = require('./routes/users');
// var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
//i dont know if this is the right place
// app.use(function(req, res, next) {
//   res.setHeader('Cache-Control', 'private');

// } )vb 

app.use(JWTmid);
// app.use(function(req,res,next){
//   console.log("request looks like");
//   console.log(req);
//   next();
// })
app.use('/', indexRouter);
app.use('/checkUser', checkUserRouter);
app.use('/dashboard',dashboardRouter);
app.use('/rooms', roomRouter);

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
