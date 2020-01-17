//server.js
const url = require('url');
	
require('http').createServer((req, res) => {

    const data = {
	x: 10
    };
    const callback = url.parse(req.url, true).query.callback;
    res.writeHead(200);
    res.end(`${callback}(${JSON.stringify(data)})`);

}).listen(3000, '192.168.1.12');

console.log('启动服务，监听 192.168.1.12:3000');