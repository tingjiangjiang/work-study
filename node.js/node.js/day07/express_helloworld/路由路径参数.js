const express = require('express');
const app = express();
const fs = require('fs');

// /ab?cd可以匹配：abcd或acd
// app.get('/ab?cd', function(req, res) {
// 	res.end('ab?cd');
// });

// /ab+cd可以匹配：abcd、abbcd、abbbcd...
// app.get('/ab+cd', function(req, res) {
// 	res.send('ab+cd');
// });

// /ab*cd里面的*号并不是正则里面的*含义（量词，匹配0~N）；当前路由里面的*表示匹配任意字符(.)任意次数(*)
// /ab*cd可以匹配：abcd, abxcd, abRANDOMcd, ab123cd
// app.get('/ab*cd', function(req, res) {
// 	res.send('ab*cd');
// });

// 路径中携带参数可以替代url中的queryString查询字符串；冒号后面的内容表示参数名称，实际在url路径中输入的内容为参数的值
// app.get('/user', (req, res) => {
// 	console.log(req.query);
// 	res.end('canshu');
// });
// app.get('/user/:id/study/:age', (req, res) => {
// 	console.log(req.params);
// 	res.end('canshu');
// });
// app.get('/user/:id?', (req, res) => {
// 	console.log(req.params);
// 	res.end('canshu');
// });

// app.get('/user/:id(\\d+)?', (req, res) => {
// 	console.log(req.params);
// 	res.end('canshu');
// });
app.listen(3000, () => {
	console.log('服务器已启动');
});
