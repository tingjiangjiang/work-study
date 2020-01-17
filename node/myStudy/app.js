var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.engine('.html',require('ejs')._express);
app.set('view engine','html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

//ajaxDemo-post的页面加载
app.get('/ajaxDemo-post',function(req,res){//设置路由名称
	res.render('ajaxDemo-post');//加载模板文件
});
//检查答案的路由
app.post('/checkAnswer',function(req,res){
	//利用cors解决跨域问题
	res.setHeader('Access-Control-Allow-Origin','*');
	if(req.body.answer!='君不见黄河之水天上来'){
		res.send('错误！');
	}else{
		res.send('正确！');
	}
});
//ajaxDemo-post的页面加载
// app.get('/ajaxDemo-get',function(req,res){//设置路由名称
// 	res.render('ajaxDemo-get');//加载模板文件
// });
//查看答案的路由
app.get('/lookAnswer',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.json({answer:'君不见黄河之水天上来'})
})
module.exports = app;
