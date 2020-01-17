let fs = require('fs');
let path = require('path');
let paths = require('../paths');

// 渲染视图
function renderView(pt, res) {
	pt = pt + '.html'; //组织文件名
	pt = path.join(paths.PATH_VIEWS, pt); //组织文件所在路径
	let html = fs.readFileSync(pt);
	res.end(html);
}
// 什么是路由？路由是由http请求方法和和路径共同构成的
/*
	method		url
	get			/index
	post		/index
*/
function index(req, res) {
	if (req.method == 'GET') {
		renderView('index', res);
	} else {
		req.on('data', data => {});
		req.on('end', () => {
			res.end('success');
		});
	}
}

module.exports = index;
