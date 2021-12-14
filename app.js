var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();

var cors = require('cors')
app.use(cors())

// 挂载post请求处理
const { read } = require('./flimPromis/_read');
const { write } = require('./flimPromis/_write');
const { _delete } = require('./flimPromis/_delete');
const { revise } = require('./flimPromis/_revise');
const { userOnLine } = require('./flimPromis/_userKey')
const { registered } = require('./flimPromis/registered')
// 接收write请求并写入对应用户数据库
write(app);

// 接收read请求
read(app);

// 接收delete请求
_delete(app)

// 接收revise请求
revise(app)

// 接收用户登录请求
userOnLine(app)

// 接受注册
registered(app)

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
