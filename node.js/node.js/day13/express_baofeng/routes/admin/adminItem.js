var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var Db = require('../../db/db');

var router = express.Router();

// uploadFile只负责上传文件，不负责新增数据
function uploadFile(req, callback) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err) {
			callback(fields);
			return;
		}
		// 给上传的文件路径默认值
		// fields['url'] = '';

		var file = files.file;
		var name = file.name;
		var size = file.size;

		// 判断是否有文件上传
		if (name == '' && size == 0) {
			// 没有文件上传
			callback(fields);
			return;
		}

		var ext = path.extname(name); //获取文件后缀
		// 目标:是将上传来的文件从临时目录拷贝（不要使用rename剪切，因为在windows下，不能跨盘符剪切）到目标upload目录
		var ROOT = path.dirname(path.dirname(__dirname));
		var PUBLIC = path.join(ROOT, 'public');
		var UPLOAD = path.join(PUBLIC, 'upload');
		// 判断upload目录是否存在，不存在则创建
		if (!fs.existsSync(UPLOAD)) {
			fs.mkdirSync(UPLOAD);
		}
		// 使用时间戳+随机数的形式生成一个唯一的新名字
		let time = new Date().getTime();
		let rand = Math.round(Math.random() * 1000);
		var newName = '';
		newName = String(time + rand);
		// 名字加后缀
		newName = newName + ext;

		var readStream = fs.createReadStream(file.path);
		var writeStream = fs.createWriteStream(path.join(UPLOAD, newName));
		readStream.on('end', () => {
			fields['url'] = path.join('/upload', newName);
			callback(fields);
		});
		readStream.pipe(writeStream);
	});
}

router
	.route('/')
	.get((req, res, next) => {
		let data = {
			_id: '',
			title: '',
			message: '',
			txt: '',
			type: '',
			url: '',
			grade: '',
		};
		res.render('admin_item', { data });
	})
	.post((req, res, next) => {
		uploadFile(req, fields => {
			let { _id, title, message, type, txt, grade, url } = fields;
			// console.log(fields);
			switch (type) {
				case 'VIP专享':
					type = 1;
					break;
				case 'VIP限免':
					type = 2;
					break;
				case 'VIP折扣':
					type = 3;
					break;
				default:
					break;
			}
			let db = new Db('baofeng');
			// _id为空表示新增
			if (_id == '') {
				db.insert('film', { title, message, type, txt, grade, url }, rst => {
					let { error_code, reason } = rst;
					console.log(rst);
					if (error_code == 0) {
						res.redirect('/admin/list');
					} else {
						res.redirect('/admin/list');
					}
				});
			} else {
				// 修改
				db.update('film', { _id }, { title, message, type, txt, grade, url }, rst => {
					let { error_code, reason } = rst;
					console.log(rst);
					if (error_code == 0) {
						res.redirect('/admin/list');
					} else {
						res.redirect('/admin/list');
					}
				});
			}
		});
	});

module.exports = router;
