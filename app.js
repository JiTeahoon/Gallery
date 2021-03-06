var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql = require('mysql');

var boardRouter = require('./routes/board');
var indexRouter = require('./routes/index');
var userRegisterRouter = require('./routes/user-register');
var loginRouter = require('./routes/login');
var viewRouter = require('./routes/view');
var writeRouter = require('./routes/write');

var app = express();
var http = require('http');
var server = http.createServer(app);

var webSocket = require('./socket');

var mySqlClient = mysql.createConnection({
  user: 'root',
  password: 'eocla880714',
  database: 'gallerydb'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('mysql', mySqlClient);
//key 세션의 키값, secret 세션의 비밀키, resave: 세션을 항상 저장할 지 여부(false 권장), 
//saveUninitialized 세션이 저장되기전에 uninitalize상태로 저장
var sessionMiddleware = session({
  key: 'sessionkey',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 //쿠키 유효기간 24시간
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware);

app.use('/', indexRouter);
app.use('/board', boardRouter);
app.use('/login', loginRouter);
app.use('/view', viewRouter);
app.use('/write', writeRouter);
app.use('/register', userRegisterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var port = 3000;
server.listen(port, function () {
  console.log('Server On !');
});

webSocket(server, app, sessionMiddleware);

module.exports = app;