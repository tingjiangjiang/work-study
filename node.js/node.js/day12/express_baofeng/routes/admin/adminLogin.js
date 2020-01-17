var express = require('express');
var Db = require('../../db/db');

var router = express.Router();

/* GET home page. */
router
	.route('/')
	.get((req, res, next) => {
		res.render('admin_login', { tip: '', username: '', password: '' });
	})
	.post((req, res) => {
		let { username, password } = req.body;

		let db = new Db('baofeng');
		db.count('adminuser', { username, password }, rst => {
			let { error_code, reason, data } = rst;
			if (data == 1) {
				req.session.adminlogin = { username, password };
				res.redirect('/admin');
			} else {
				res.render('admin_login', { username, password, tip: '用户名或密码错误' });
			}
		});
	});

// 注销功能
router.get('/logout', (req, res) => {
	req.session.adminlogin = null;
	res.redirect('/admin/login');
});

module.exports = router;
