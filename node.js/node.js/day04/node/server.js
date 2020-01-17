let http = require('http');
let server = http.createServer();
server.on('connection', function() {
	console.log('有人来了');
});
server.on('request', (req, res) => {
	res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
	res.end('来了，老弟');
});
server.listen(3000, function() {
	console.log('服务器已启动');
});
