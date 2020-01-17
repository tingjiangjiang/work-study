var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let names = ['蔡徐坤', '乔碧萝', '麦当娜', '迈克杰克逊', '碧昂斯', '惠特妮休斯顿'];

	res.render('index', { names, page: 1, size: 10 });
	// res.send({ code: 200, msg: '成功', data: { names } });
});

module.exports = router;
