let http = require('http');
let url = require('url');
let qs = require('querystring'); 
// http模块既可以做服务器，也可以做客户端(向其他服务器请求数据)

/*
    浏览器请求 nodejs服务器 nodejs客户端请求其他服务器
*/

// let server = http.createServer();

// server.on('connection', socket => {
// 	console.log('已连接');
// });
// server.on('error', err => {
// 	console.log(err);
// });
// server.on('listening', () => {
// 	console.log('服务器启动监听');
// });
// server.on('request', (req, res) => {
// 	console.log('数据请求来了');
// });

// server.listen(3000);

// 每一次改动了js代码，一定要记得重启服务器
// req是请求信息：包含了用户的请求内容，如：method请求方法，url请求链接
// res是响应信息：包含了服务器给用户的回应
http.createServer((req, res) => {
	res.writeHead(200, { 'content-type': 'text/html;charset=utf8' });
	let path = 'http://www.baidu.com:8080/demo/apache?name=leo&age=2&id=33/#home';
	let obj = url.parse(path);

	// switch (req.method) {
	// 	case 'GET':
	// 		break;
	// 	case 'POST':
	// 		break;
	// 	default:
	// 		break;
	// }
	if (req.method == 'GET') {
		let { query } = url.parse(req.url);
		let params = qs.parse(query);
		let { user, pwd } = params;
		console.log(req);
		// console.log('=====================');
		// console.log(res);
		if (user == 'zhangsan' && pwd == '123456') {
			
			res.write('success');
		} else {
			res.write('error'+'你好');
		}
		res.end();
	} else {
		let arr = [];
		req.on('data', data => {
			arr.push(data);
		});
		req.on('end', () => {
			let buf = Buffer.concat(arr);//concat拼接数组
			let params = qs.parse(buf.toString());
			let { user, pwd } = params;
			if (user == 'zhangsan' && pwd == '123456') {
				res.write('success');
			} else {
				res.write('error'+'世界');
			}
			res.end();
		});
	}
}).listen(3000, () => {
	console.log('服务器启动监听');
});
