let url = require('url');
let path = require('path');
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
			if (!path.extname(pathname)) {
				// 判断不是静态资源的情况
				errorRouter(req, res);
			}
			break;
	}
}

module.exports = router;
