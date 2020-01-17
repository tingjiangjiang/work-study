let http = require('http');

http.createServer((req, res) => {
	// 用来获取请求头
	// console.log(req.headers);
	// res设置header的时候尽量在发送内容前
	// 一、通过setHeader设置头
	res.statusCode = 201;
	res.setHeader('access-control-allow-origin', '*');
	res.setHeader('content-type', 'text/html;charset=utf8');
	res.setHeader('Date', '');
	// 二、通过writeHead设置头
	// res.writeHead(201, { 'content-type': 'text/html;charset=utf8' }); //text/plain
	// res.write('中文乱码');
	res.write('<h1>我的心太乱</h1>');
	res.end();
}).listen(3000, () => {
	console.log('服务器已启动');
});
