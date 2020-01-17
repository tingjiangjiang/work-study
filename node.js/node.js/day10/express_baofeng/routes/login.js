var express = require('express');
var Db = require('../db/db');
var router = express.Router();

/* GET home page. */
router
	.route('/')
	.get((req, res) => {
		res.render('login');
	})
	.post((req, res) => {
		// 获取用户提交的cookie两个办法：req.cookies和req.signedCookies；
		// req.cookies 用来获取不加密的cookie
		// req.signedCookies 用来获取加密的cookie

		let { username, password } = req.body;
		let { user = '', pwd = '' } = req.signedCookies;

		let responseInfo = null;
		if (username == '' || password == '') {
			responseInfo = { error_code: 101, reason: '用户名或密码不能为空', data: null };
			// res.send({ error_code: 0, reason: '成功', data: null });
		} else if (!/^1[35789]\d{9}$/.test(username)) {
			responseInfo = { error_code: 102, reason: '请填写正确的手机号', data: null };
		} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/.test(password)) {
			// 至少6-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符：
			responseInfo = { error_code: 103, reason: '密码不符合规范', data: null };
		} else {
			let db = new Db('baofeng');
			db.count('user', { username, password }, rst => {
				let { error_code, reason, data } = rst;
				if (data == 1) {
					responseInfo = { error_code: 0, reason: '登录成功', data: { username, password } };
				} else {
					responseInfo = { error_code: 104, reason: '用户名或密码错误', data: null };
				}
				res.send(responseInfo);
			});
		}
	});

module.exports = router;
