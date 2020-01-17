const mongoose = require('mongoose');

class Db {
	constructor(dbname) {
		this.dbname = dbname;
		this.baseUrl = `mongodb://127.0.0.1:27017/${dbname}`;
		this.isConnected = false; //默认没有连接上
	}
	// 连接
	connect() {
		var p = new Promise((resolve, reject) => {
			mongoose.connect(this.baseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
				if (err) {
					reject(err);
				} else {
					this.isConnected = true;
					resolve();
				}
			});
		});
		return p;
	}
	async common() {
		var p = new Promise((resolve, reject) => {
			if (this.isConnected) {
				// 如果已连接则直接返回
				resolve();
			}
			// 否则发起连接
			else {
				this.connect()
					.then(() => {
						resolve();
					})
					.catch(err => {
						reject(err);
					});
			}
		});
		return p;
	}
	fmodel(collection) {
		let scheam = require(`./schema/${collection}`);
		let model = mongoose.model(collection, scheam);
		return model;
	}
	// 基本带条件查询
	find(collection, query, callback) {
		this.common()
			.then(() => {
				let model = this.fmodel(collection);
				model.find(query, (err, res) => {
					if (err) {
						callback({ error_code: 102, reason: '查询失败', data: err });
					} else {
						callback({ error_code: 0, reason: '查询成功', data: res });
					}
				});
			})
			.catch(err => {
				// console.log('连接失败');
				callback({ error_code: 101, reason: '连接失败', data: err });
			});
	}
	// 查询数量
	count(collection, query, callback) {
		this.common()
			.then(() => {
				let model = this.fmodel(collection);
				model.count(query, (err, res) => {
					if (err) {
						callback({ error_code: 102, reason: '查询失败', data: err });
					} else {
						callback({ error_code: 0, reason: '查询成功', data: res });
					}
				});
			})
			.catch(err => {
				// console.log('连接失败');
				callback({ error_code: 101, reason: '连接失败', data: err });
			});
	}
	// 分页排序查询
	pagination({ collection, query = {}, skip = 0, limit = 5, sort = {}, success, error } = {}) {
		this.common()
			.then(() => {
				let model = this.fmodel(collection);
				model
					.find(query)
					.skip(skip)
					.limit(limit)
					.sort(sort)
					.exec((err, res) => {
						if (err) {
							error({ error_code: 102, reason: '查询失败', data: err });
						} else {
							success({ error_code: 0, reason: '查询成功', data: res });
						}
					});
			})
			.catch(err => {
				// console.log('连接失败');
				callback({ error_code: 101, reason: '连接失败', data: err });
			});
	}
	// 新增
	insert(collection, data, callback) {
		this.common()
			.then(() => {
				let model = this.fmodel(collection);
				model.insertMany(data, (err, res) => {
					if (err) {
						console.log(err);
						callback({ error_code: 102, reason: '新增失败', data: err });
					} else {
						callback({ error_code: 0, reason: '新增成功', data: res });
					}
				});
			})
			.catch(err => {
				// console.log('连接失败');
				callback({ error_code: 101, reason: '连接失败', data: err });
			});
	}
	// 更新

	// 删除
	delete(collection, query, callback) {
		this.common()
			.then(() => {
				let model = this.fmodel(collection);
				model.deleteMany(query, (err, res) => {
					if (err) {
						console.log(err);
						callback({ error_code: 102, reason: '删除失败', data: err });
					} else {
						callback({ error_code: 0, reason: '删除成功', data: res });
					}
				});
			})
			.catch(err => {
				// console.log('连接失败');
				callback({ error_code: 101, reason: '连接失败', data: err });
			});
	}
}

// 示例：

/*
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
*/
// let db = new Db('baofeng');
// db.delete('film', { _id: '5d88b132e8005ce4a7629359' }, rst => {
// 	console.log(rst);
// });
// let param = {
// 	url: './images/1.jpg',
// 	http: '',
// 	title: '飞驰人生',
// 	message: '献丑了',
// 	type: 1,
// 	txt: '超清',
// 	grade: 8.0,
// };
// db.insert(
// 	'film',
// 	[param, param, param, param, param, param, param, param, param, param, param, param, param, param],
// 	rst => {
// 		console.log(rst);
// 	}
// );
// db.find('user', {}, rst => {
// 	console.log(rst);
// });
// db.count('user', { username: '17731148313', password: 'asdfE123' }, rst => {
// 	console.log(rst);
// });

module.exports = Db;
