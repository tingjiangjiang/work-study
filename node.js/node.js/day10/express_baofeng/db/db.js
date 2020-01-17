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
	// 查询
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
	// 新增
	insert(collection, data, callback) {
		this.common()
			.then(() => {
				let model = this.fmodel(collection);
				model.insertMany(data, (err, res) => {
					if (err) {
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
}

// 示例：
let db = new Db('baofeng');
db.insert('user', { username: '18855556666', password: 'asdfE123' }, rst => {
	console.log(rst);
});
// db.find('user', { username: '17731148315', password: 'asdfE123' }, rst => {
// 	console.log(rst);
// });
// db.count('user', { username: '17731148313', password: 'asdfE123' }, rst => {
// 	console.log(rst);
// });

module.exports = Db;
