let express = require('express');
let indexRouter = require('./router/indexRouter');

let app = express();

app.use('/index', indexRouter);

app.use((req, res, next) => {
	let err = new Error('咕咕 没有找到页面');
	next(err);
});
// 错误处理中间件
app.use((err, req, res, next) => {
	res.send('错误页');
});
app.listen(3000, () => {
	console.log('服务器已启动');
});

// var express = require('express');
// var app = express();
// var path = require('path');
// var indexRouter = require('./router/indexRouter');
// var aboutRouter = require('./router/aboutRouter');

// app.use('/index', indexRouter);
// app.use(aboutRouter);
// app.use(express.static(path.join(__dirname, 'public')));


// app.listen(3000, () => {
// 	console.log('服务器已启动');
// })