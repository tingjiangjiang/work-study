let http = require('http');
// 引入路由处理模块
let router = require('./router/router');
// 引入静态资源处理模块
let resouce = require('./static');

http.createServer((req, res) => {
	// if (req.url != '/favicon.ico') {
	// 处理静态资源
	resouce(req, res);
	// 处理路由
	router(req, res);
	// }
}).listen(3000, () => {
	console.log('服务器已启动');
});
/*
	localhost:3000/		首页
	localhost:3000/about	关于页
*/


let http = require('http');
let router = require('./router/router');
let resouce = require('./static');
http.createServer((req, res) => {
	resouce(req, res);
	router(req, res);
}).listen(3000, () => {
	console.log('启动');
});