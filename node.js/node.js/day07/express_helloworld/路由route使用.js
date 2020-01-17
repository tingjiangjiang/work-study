var express = require('express');
var app = express();

app.route('/')
	.get(
		(req, res, next) => {
			console.log('呵呵呵');
			next();
		},
		(req, res) => {
			res.send('GET');
		}
	)
	.post((req, res) => {
		res.send('POST');
	});

app.listen(3000, () => {
	console.log('服务器已启动');
});
