let url = require('url');
let qs = require('querystring');

function gparser(options) {//中间件的精髓next
	let { extd } = options;
	return function(req, res, next) {
		let url_obj = url.parse(req.url);
		let { query } = url_obj;
		if (extd == false) {
			req.zg = qs.parse(query);
		} else {
			console.warn('该方法已过期，请设置extd:false');
		}
		next();
	};
}

module.exports = gparser;
