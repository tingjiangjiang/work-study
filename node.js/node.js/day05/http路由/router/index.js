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
function index(req, res) {
	console.log(req);
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
