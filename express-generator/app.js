var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var collectionRouter = require('./routes/collection');
var collection2Router = require('./routes/collection2');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views2'));
app.set('view engine', 'jade');

app.use(logger('short', {stream: fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', collectionRouter);
app.use('/collection', collectionRouter);
app.use('/collection2', collection2Router);
app.use('/users', usersRouter);

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost';
MongoClient.connect(url, function (err, db) {
    // 共享数据
    app.locals.db = db;
});

// 共享数据
app.locals.ha = 99;
// express 会对中间件参数判断，如果是4个，就当成错误处理中间件

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
