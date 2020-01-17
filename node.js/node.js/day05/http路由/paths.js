// __dirname用来获取当期文件所在的目录
// __filename用来获取当前文件的路径(都是双下划线)
let path = require('path');

const PATH_ROOT = __dirname;
const PATH_ROUTER = path.join(PATH_ROOT, 'router');
const PATH_VIEWS = path.join(PATH_ROOT, 'views');
const PATH_PUBLIC = path.join(PATH_ROOT, 'public');
const PATH_CSS = path.join(PATH_PUBLIC, 'css');
const PATH_IMAGE = path.join(PATH_PUBLIC, 'image');
const PATH_JS = path.join(PATH_PUBLIC, 'js');

module.exports = {//对象的简写
	PATH_ROOT,
	PATH_ROUTER,
	PATH_VIEWS,
	PATH_PUBLIC,
	PATH_CSS,
	PATH_IMAGE,
	PATH_JS,
};
