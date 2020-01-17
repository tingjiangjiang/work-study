let fs = require('fs');
let path = require('path');
let paths = require('./paths');
let url = require('url');



// 通过getResType获取资源的路径和content-type
function getResType(res_name) {
	// 根据指定的资源名称获取其后缀，如：.css或.jpg ; 注意有'.'
	let extname = path.extname(res_name); //通过path.extname获取文件后缀
	// 截取后缀名（不包含'.'）
	let ext = extname.split('.')[1];
	switch (extname) {
		// 标签贯穿
		case '.png':
		case '.jpg':
		case '.jpeg':
		case '.bmp':
		case '.gif':
			return { rPath: paths.PATH_IMAGE, type: `image/${ext}` };
		case '.css':
			return { rPath: paths.PATH_CSS, type: `text/${ext}` };
		case '.js':
			return { rPath: paths.PATH_JS, type: 'application/javascript' };
		case '.ico':
			return { rPath: paths.PATH_IMAGE, type: 'image/x-icon' };
		default:
			break;
	}
	// 当所有条件都不满足的时候返回null表示该资源类型无法识别（可能还包含有路由的处理）
	return null;
}
function public_resouce(req, res) {
	let url_obj = url.parse(req.url);
	let { pathname } = url_obj;
	let res_name = path.basename(pathname);
	// 通过getResType方法获取资源所在路径和资源的content-type类型，如：{path:IMAGE,type:'image/jpg'}
	let path_type = getResType(res_name);
	if (!path_type) return;
	// 对返回的对象进行解构赋值，得到path（IMAGE或CSS等）和type（image/png或text/css等）
	let { rPath, type } = path_type;
	// 拼接资源的路径，所在目录+资源名称；如：IMAGE/timg.jpg
	let res_path = path.join(rPath, res_name);
	// 根据资源路径，读取指定的内容
	let buf = fs.readFileSync(res_path);
	// 设置资源的content-type
	res.setHeader('content-type', type);
	// 把内容写入到客户端
	res.end(buf);
}

module.exports = public_resouce;
