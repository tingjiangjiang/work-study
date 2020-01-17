const express = require('express');
const app = express();
const fs = require('fs');

/*
    1、中间件的书写次序很重要(中间件一般需要放到所有的路由操作之前)
    2、中间件的作用？在进入路有前处理相关数据内容（get请求的内容，post请求的内容，cookie，session...）
*/

// express.json和express.urlencoded的作用就是解析req请求中的post数据，解析后将数据转换为对象格式存储到req.body属性中

app.use(express.json()); //json用来解析req请求的json格式数据
app.use(express.urlencoded({ extended: false })); //用来解析req请求的urlencoded

app.route('/')
	.get((req, res) => {
		let buf = fs.readFileSync('./views/index.html');
		// res.writeHead(200, { 'content-type': 'text/html' });//使用res.end没有问题，使用res.send出现发送报错问题（原因是在end之后还有header的发送）
		// res.statusCode = 201;
		// res.setHeader('content-type', 'text/html');

		// express通过status方法设置code，通过set或type设置content-type
		// res.status(202);
		// res.set('content-type', 'text/html');
		// res.set({ 'content-type': 'text/html', Date: '' });

		res.status(200).set({ 'content-type': 'text/html', Date: '' });
		// res.status(200).type('html');
		res.send(buf);
	})
	.post((req, res) => {
		// GET参数的获取：req.query(获取查询参数)和req.params(获取路径参数)
		// node原生获取post参数的做法
		// let arr = [];
		// req.on('data', data => {
		// 	arr.push(data);
		// });
		// req.on('end', () => {
		// 	let buf = Buffer.concat(arr);
		// 	console.log(buf.toString());
		// });
		// express获取post参数的做法
		console.log(req.body);
	});

app.listen(3000, () => {
	console.log('服务器已启动');
});
