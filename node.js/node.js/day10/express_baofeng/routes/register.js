var express = require('express');
// 生成验证码
var svgCaptcha = require('svg-captcha');
let Db = require('../db/db');

var router = express.Router();

router.get('/captcha', function(req, res) {
	var options = {
		width: 92,
		heigth: 32,
		fontSize: 65,
		size: 4,
		noise: 2,
		// color: true,
		// background: '#E3E3E3',
		mathMin: 10,
		mathMax: 90,
		mathOperator: '+-',
	};
	var captcha = svgCaptcha.create(options);
	// var captcha = svgCaptcha.createMathExpr(options);
	req.session.captcha = captcha.text;

	res.type('svg');
	res.status(200).send(captcha.data);
});

router
	.route('/')
	.get((req, res) => {
		res.render('register');
	})
	.post((req, res) => {
		// 一、使用cookie存储用户信息
		// res.cookie('user', 'zhangsan', { signed: true, httpOnly: true, maxAge: 1000 * 60 * 60, path: '/register' });
		// res.cookie('pwd', '123456', { expires: new Date(Date.now() + 60 * 60 * 1000) });
		// 二、使用session存储用户信息
		// req.session.user = 'zhangsan';
		// req.session.pwd = 'a123456';
		// res.send(req.session.captcha);

		let { username, password, yzm } = req.body;
		// 用户或密码不能为空
		// 用户名的合法性：比如是手机，需要符合手机的正则验证
		// 密码的合法性和强度控制：比如密码应该由数字加英文共同组成且长度不少于6位
		// 验证码是否正确
		// 用户名是否已注册

		let responseInfo = null;
		if (username == '' || password == '') {
			responseInfo = { error_code: 101, reason: '用户名或密码不能为空', data: null };
			// res.send({ error_code: 0, reason: '成功', data: null });
		} else if (!/^1[35789]\d{9}$/.test(username)) {
			responseInfo = { error_code: 102, reason: '请填写正确的手机号', data: null };
		} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/.test(password)) {
			// 至少6-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符：
			responseInfo = { error_code: 103, reason: '密码不符合规范', data: null };
		} else if (String(req.session.captcha).toLowerCase() != String(yzm).toLowerCase()) {
			responseInfo = { error_code: 104, reason: '验证码错误', data: null };
		} else {
			// 使用cookie暂时存储用户的用户名和密码，在登录的时候取出来判断
			// res.cookie('user', username, { signed: true, httpOnly: true, maxAge: 1000 * 60 * 60 });
			// res.cookie('pwd', password, { signed: true, httpOnly: true, maxAge: 1000 * 60 * 60 });

			let db = new Db('baofeng');
			// 判断用户是否已存在，如果存在则报错，否则新增用户
			db.count('user', { username, password }, rst => {
				let { error_code, reason, data } = rst;
				// 0表示账号不存在
				if (data == 0) {
					// 新增一个用户
					db.insert('user', { username, password }, rst => {
						let { error_code, reason, data } = rst;
						if (error_code == 0) {
							responseInfo = { error_code: 0, reason: '注册成功', data: { username, password } };
						} else {
							responseInfo = { error_code, reason, data };
						}
						res.send(responseInfo);
					});
				} else {
					// 否则账号已存在
					responseInfo = { error_code: 105, reason: '账号已存在', data: null };
					res.send(responseInfo);
				}
			});

			// promise解决回调地狱
			Promise.all([userValid(username, password), userInsert(username, password)])
				.then(rst => {
					console.log(rst);
				})
				.catch(err => {
					console.log(err);
				});
		}

		// res.set('Access-Control-Allow-Origin', '*');
	});
function userValid(username, password) {
	var p = new Promise((resolve, reject) => {
		let db = new Db('baofeng');
		db.count('user', { username, password }, rst => {
			let { error_code, reason, data } = rst;
			// 0表示账号不存在
			if (data == 0) {
				resolve();
			} else {
				// 否则账号已存在
				reject({ error_code: 105, reason: '账号已存在', data: null });
			}
		});
	});
	return p;
}
function userInsert(username, password) {
	var p = new Promise((resolve, reject) => {
		let db = new Db('baofeng');
		db.insert('user', { username, password }, rst => {
			let { error_code, reason, data } = rst;
			if (error_code == 0) {
				resolve({ error_code: 0, reason: '注册成功', data: { username, password } });
			} else {
				reject({ error_code, reason, data });
			}
		});
	});
	return p;
}
module.exports = router;