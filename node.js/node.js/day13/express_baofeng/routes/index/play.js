var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(
	'/',
	// 登录拦截
	function(req, res, next) {
		// let { baofenglogin } = req.signedCookies;
		// if (baofenglogin) {
		// 	next();
		// } else {
		// 	res.redirect('/login');
		// }
		next();
	},
	function(req, res, next) {
		res.render('play');
	}
);

module.exports = router;
