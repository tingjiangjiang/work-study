// callback 方式的数据传递
// function Http(callback) {
// 	// 异步数据返回操作
// 	// let rst = {};
// 	$.ajax({
// 		type: 'GET',
// 		url: 'http://www.bestqingshan.top/demo/ajaxWeather.php',
// 		dataType: 'json',
// 		success: function(data) {
// 			// console.log(data);
// 			callback(data); //回调函数的调用
// 			// rst = data;
// 		},
// 	});
// 	// return rst;
// 	// 同步数据返回操作
// 	// return { code: 200, weather: '小雨' };
// }

// promise 方式的数据传递
function Http() {//这里的参数也是完全可以不写的
	var p = new Promise((resolve, reject) => {//resolve 解决  reject 拒绝
		$.ajax({
			type: 'GET',
			url: 'http://www.bestqingshan.top/demo/ajaxWeather.php',
			dataType:'json',
			success: function(data) {
				resolve(data);//回调函数
			},
			error: function(err) {
				reject(err);
			},
		});
	});
	return p;
}
