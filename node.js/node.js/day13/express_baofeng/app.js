var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// 后台路由
var adminItemRouter = require('./routes/admin/adminItem'); //后台项目
var adminListRouter = require('./routes/admin/adminList'); //后台列表
var adminIndexRouter = require('./routes/admin/adminIndex'); //后台首页
var adminLoginRouter = require('./routes/admin/adminLogin'); //后台登录

// 前台路由
var indexRouter = require('./routes/index/index'); //前台首页
var demandRouter = require('./routes/index/demand');
var playRouter = require('./routes/index/play');
var loginRouter = require('./routes/index/login');
var registerRouter = require('./routes/index/register');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views/index'), path.join(__dirname, 'views/admin')]);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// 用来处理日志打印的中间件
app.use(logger('dev'));
// 内置中间件,用来处理json格式的post请求数据
app.use(express.json());
// 内置中间件,用来处理urlencoded格式的post请求数据
app.use(express.urlencoded({ extended: false }));
// 第三方中间件，用来处理cookie
app.use(cookieParser('baofeng'));
// 内置中间件,用来处理静态资源
app.use(express.static(path.join(__dirname, 'public')));
/*
	saveUninitialized : 是否保存未初始化的会话；未初始化的意思是session还没有使用，比如访问首页或登录页（首页和登录页里面是没有使用session的），此时session里面只有一个sessionID，并没有session实际要存储的内容；保存指的是将session的信息保存到服务器
	resave：覆盖(所谓的覆盖并不是sessionID的覆盖，指的是内容的重写覆盖，每次有操作session的时候，不管内容有没有变化，都重新覆盖)
	rolling：滚动设置sessiond的过期时间，比如session的过期时间是10分钟，那么每次有session操作的时候会以当前时间为起点再加上10分钟，让过期时间滚动刷新。

	[
		{
			sessionID:{
				captcha:'',
				title:''
			},
			sessionID:{
				captcha:'',
				title:''
			},
		}
	]
*/

app.use(
	session({
		secret: 'baofeng',
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
	})
);

// app.use(session({ secret: 'baofeng', saveUninitialized: true, resave: true, rolling: true }));

// 前台登录拦截
app.use((req, res, next) => {
	// 根据用户传入的cookie判断用户是否已登录
	let { baofenglogin } = req.signedCookies;
	if (baofenglogin) {
		next();
	} else if (req.url == '/play') {
		// 判断用户访问的路径是否需要拦截
		res.redirect('/login');
	} else {
		next();
	}
});
// 后台登录拦截
app.use((req, res, next) => {
	// 根据用户传入的cookie判断用户是否已登录
	let adminlogin = req.session.adminlogin;
	if (adminlogin) {
		next();
	} else if (req.url == '/admin/login') {
		// 判断用户访问的路径是否需要拦截
		next();
	} else if (req.url.includes('/admin')) {
		res.redirect('/admin/login');
	} else {
		next();
	}
});

// 后台路由
app.use('/admin', adminIndexRouter);
app.use('/admin/login', adminLoginRouter);
app.use('/admin/list', adminListRouter);
app.use('/admin/item', adminItemRouter);

// 前台路由
app.use('/', indexRouter);
app.use('/demand', demandRouter);
app.use('/play', playRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	// let error = new Error('我错了');
	// next(error);
	next(createError(500));
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
