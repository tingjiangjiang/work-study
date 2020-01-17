let http = require('http');//模块思想,每个js文件都分工明确
// 引入路由处理模块
let router = require('./router/router');
http.createServer((req, res) => {
	if (req.url != '/favicon.ico') {
		// 处理路由
		router(req, res);
	}
}).listen(3000, () => {//3000端口号
	console.log('服务器已启动');
});
