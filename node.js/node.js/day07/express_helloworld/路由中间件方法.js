const express = require('express');
const app = express();
const fs = require('fs');

// 中间件方法的参数常见有：req，res，next
// 使用next将当前控制权交给下一个中间件方法；但是要注意res.end的使用；在所有的中间件方法中，只能由一个end操作，其他的方法再调用end会报错
let middleHandler = [
	function(req, res, next) {
		console.log('第一');
		next();
	},
	function(req, res, next) {
		console.log('第二');
		res.write('123123');
		res.end('ab?cd');
	},
];
app.get(
	'/',
	function(req, res, next) {
		console.log('第0');
		next();
	},
	middleHandler
	// [
	// 	function(req, res, next) {
	// 		console.log('第一');
	// 		next();
	// 	},
	// 	function(req, res, next) {
	// 		console.log('第二');
	// 		res.write('123123');
	// 		res.end('ab?cd');
	// 	},
	// ]
);

app.listen(3000, () => {
	console.log('服务器已启动');
});
