const mongodb = require('mongodb').MongoClient;

class Db {
	constructor(dbname) {
		this.dbname = dbname;
		this.baseUrl = 'mongodb://127.0.0.1:27017';
	}
	// 连接数据库
	connect(coll_name) {
		let p = new Promise((resolve, reject) => {
			mongodb.connect(this.baseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, result) => {
				if (error) {
					reject(error);
				} else {
					let db = result.db(this.dbname);
					let collection = db.collection(coll_name);
					resolve(collection);
				}
			});
		});
		return p;
	}
	// 查询
	find(coll_name, callback) {
		this.connect(coll_name)
			.then(collection => {
				collection
					.find()
					.toArray()
					.then(result => {
						// console.log(result);
						callback({ error_code: 0, msg: '查询成功', data: result });
					})
					.catch(error => {
						// console.log('查询失败');
						callback({ error_code: 101, msg: '查询失败', data: error });
					});
			})
			.catch(error => {
				// console.log('连接失败');
				callback({ error_code: 102, msg: '连接失败', data: error });
			});
		/*
		mongodb.connect(this.baseUrl, (error, result) => {
			if (error) {
				// 有错误
			} else {
				let db = result.db(this.dbname);
				let collection = db.collection(coll_name);
				// 查询
				collection
					.find()
					.toArray()
					.then(result => {
						console.log(result);
					})
					.catch(error => {});
			}
        });
        */
	}
	// 新增
	insert(coll_name, data) {
		this.connect(coll_name)
			.then(collection => {
				collection
					.insert(data)
					.then(result => {
						console.log(result);
					})
					.catch(error => {
						console.log('查询失败');
					});
			})
			.catch(error => {
				console.log('连接失败');
			});
		// mongodb.connect(this.baseUrl, (error, result) => {
		// 	if (error) {
		// 		// 有错误
		// 	} else {
		// 		let db = result.db(this.dbname);
		// 		let collection = db.collection(coll_name);
		// 		// 查询
		// 		collection
		// 			.insert({ name: 'LL' })
		// 			.then(result => {
		// 				console.log(result);
		// 			})
		// 			.catch(error => {});
		// 	}
		// });
	}
	// 修改
	async update(coll_name) {
		try {
			let collection = await this.connect(coll_name);
			collection
				.update({ name: 'LL' }, { $set: { name: 'LLL' } })
				.then(result => {
					console.log(result);
				})
				.catch(error => {
					console.log('修改失败');
				});
		} catch (error) {
			console.log('连接失败');
		}
	}
	// 删除
	delete(coll_name) {
		mongodb.connect('mongodb://127.0.0.1:27017', (error, result) => {
			if (error) {
				// 有错误
			} else {
				let db = result.db('student');
				let collection = db.collection(coll_name);
				// 查询
				collection
					.deleteMany({ name: 'LLL' })
					.then(result => {
						console.log(result);
					})
					.catch(error => {});
			}
		});
	}
}

// let db = new Db('test');
// db.find('movie');
// db.insert();
// db.update();
// db.delete();

module.exports = Db;
