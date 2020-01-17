var express = require('express');
// 生成验证码
var svgCaptcha = require('svg-captcha');

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
		console.log(req.body);
		// cookie的选项：
		/*
		signed：设置为true，表示该cookie需要加密（加密是根据cookieParser里面的秘钥来加密的），也是就说要设置signed必须要先有秘钥
		httpOnly：默认为false,建议设置为true, 客户端将无法通过document.cookie读取到 COOKIE 信息，可防止 XSS 攻击产生
		secure：当 secure 值为 true 时， cookie 在 HTTP 中是无效，在 HTTPS 中才有效
		maxAge：设置过期时间，（单位为毫秒）
		expires：设置过期时间（单位为秒）
		path：设置访问路径，比如设置为/register，那么该cookie就只能在/register路径下访问，其他路径下不可见
		domain：默认当前主域名和子域名都可见
		 */
		res.cookie('user', 'zhangsan', { signed: true, httpOnly: true, maxAge: 1000 * 60 * 60, path: '/register' });
		res.cookie('pwd', '123456', { expires: new Date(Date.now() + 60 * 60 * 1000) });
		// res.send(req.session.captcha);
		res.send(req.sessionID);
	});

module.exports = router;
