// 一、require引入包（第三方包、核心包和路由文件）

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var ejs = require('ejs');

var app = express();

// 二、设置模板引擎
// 设置视图模板的根目录
app.set('views', path.join(__dirname, 'views'));
// 修改视图后缀为html
// app.engine('html', require('ejs').renderFile);
app.engine('html', ejs.__express);
// 设置模板引擎
app.set('view engine', 'html');

// 三、使用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 四、加载路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 五、错误处理
app.use(function(req, res, next) {
	next(createError(404));
});

app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
