const express = require('express');
const app = express();

app.get('/', (req, res) => {
	// res.setHeader('access-control-allow-origin', 'http://127.0.0.1:5500/');
	res.setHeader('access-control-allow-origin', '*');
	// res.end('hellworld');
	// res.json({ title: 'hello' });
	// res.jsonp({ title: 'hello' });
	// res.send({ title: 'me too' });//全能选手，一般用来做接口
	// setInterval(() => {
	// 	res.redirect('/about');//重定向，一般用于内部页面跳转
	// }, 3000);
	res.redirect('/about');
	// res.render //渲染模板用的（类似于渲染arttemplate）
});

app.listen(3000, () => {
	console.log('服务器已启动');
});
