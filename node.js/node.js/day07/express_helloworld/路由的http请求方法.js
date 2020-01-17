const express = require('express');
const app = express();
const fs = require('fs');

// app.get('/', (req, res) => {
// 	res.end('GET');
// });

// all可以接受express内部支持的所有HTTP请求方法
app.all('/', (req, res) => {
	if (req.method == 'GET') {
		let buf = fs.readFileSync('./views/index.html');
		res.setHeader('Content-Type', 'text/html');
		res.send(buf);
	} else {
		res.end('ALL');
	}
});

app.listen(3000, () => {
	console.log('服务器已启动');
});
