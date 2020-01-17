let http = require('http');
let url = require('url');
let fs = require('fs');

function renderView(path, res) {
	path = path + '.html';
	let html = fs.readFileSync(path);
	res.write(html);
}

http.createServer((req, res) => {
	let url_obj = url.parse(req.url);
	let { pathname } = url_obj;
	// res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });

	// 一切请求都要过服务器
	switch (pathname) {
		// 首页
		case '/':
		case '/index':
		case '/index.html':
			renderView('index', res);
			break;
		// 关于页
		case '/about':
			renderView('about', res);
			break;
		default:
			// 处理错误页
			renderView('error', res);
			break;
	}
	res.end(); //终止请求响应循环
}).listen(3000, () => {
	console.log('恭喜服务器已启动');
});
