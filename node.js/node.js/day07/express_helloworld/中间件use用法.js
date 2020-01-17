const express = require('express');
const app = express();
let url = require('url');
let qs = require('querystring');

// use可以接受任何请求
// app.use('/index', (req, res) => {
// 	console.log(req.method);
// 	res.send('helloworld');
// });

// 当前中间件的作用是解析GET请求的数据到req的zz属性
function eparser() {
	return {
		fget: (req, res, next) => {
			let query = url.parse(req.url).query;
			req.zg = qs.parse(query);
			next();
		},
		fpost: (req, res, next) => {
			let arr = [];
			req.on('data', data => {
				arr.push(data);
			});
			req.on('end', () => {
				let buf = Buffer.concat(arr);
				let obj = qs.parse(buf.toString());
				req.zp = obj;
				next();
			});
		},
	};
}
function egparser(title) {
	console.log(title);
	return (req, res, next) => {
		let query = url.parse(req.url).query;
		req.zg = qs.parse(query);
		next();
	};
}

// app.use((req, res, next) => {
// 	let query = url.parse(req.url).query;
// 	req.zz = qs.parse(query);
// 	next();
// });
app.use(eparser().fget);
app.use(eparser().fpost);

app.get('/index', (req, res) => {
	console.log(req.zg);
	res.send('get请求');
});

app.listen(3000, () => {
	console.log('服务器已启动');
});
