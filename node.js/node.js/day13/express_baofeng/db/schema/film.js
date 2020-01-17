let mongoose = require('mongoose');

let Schema = mongoose.Schema;
/*
"url": "images/51_270_360.jpg",
"http": "http://shop.baofeng.com/product/detail-10433-223523-837047.html",
"title": "撒坝味道",
"message": "家的味道爱的味道",
"type": 1,
"txt": "高清",
"grade": 9.3
*/
let filmSchema = new Schema({
	url: {
		type: String, //约束类型为字符串
	},
	http: {
		type: String,
	},
	title: {
		type: String,
	},
	message: {
		type: String, //约束类型为字符串
	},
	type: {
		type: Number,
	},
	txt: {
		type: String,
	},
	grade: {
		type: Number,
	},
});

module.exports = filmSchema;
