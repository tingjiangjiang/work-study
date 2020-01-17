let url = require('url');
let indexRouter = require('./index');
let aboutRouter = require('./about');
let errorRouter = require('./error');

// 路由处理
function router(req, res) {
	let url_obj = url.parse(req.url);
	let { pathname } = url_obj;

	// 一切请求都要过服务器
	switch (pathname) {
		// 首页
		case '/':
		case '/index':
		case '/index.html':
			indexRouter(req, res);
			break;
		// 关于页
		case '/about':
			aboutRouter(req, res);
			break;
		default:
			// 处理错误页
			errorRouter(req, res);
			break;
	}
}

module.exports = router;
