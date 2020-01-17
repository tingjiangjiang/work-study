//导入http模块
var http = require('http');
//开启一个监听事件，每次http请求都会触发这个事情
http.createServer(function(req,res){
	//把编码设置成utr-8
	res.write('<head><meta charset="utf-8"/></head>');
	//设置响应体信息
	res.write('婷酱酱搭建nodejs服务器成功');
	//结束事件
	res.end();
}).listen(8888);