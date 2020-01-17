const client = require('mongodb').MongoClient;

class Db {
	constructor(dbname) {
		this.dbname = dbname;
		this.baseUrl = 'mongodb://127.0.0.1:27017';
	}
	connect(coll_name) {
		// 初始化客户端连接
		let mongo_client = client.connect(this.baseUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// 初始化promise对象，用于返回数据库集合(collection)
		let p = new Promise((resolve, reject) => {
			mongo_client
				.then(MongoClient => {
					// 选择数据库
					let db = MongoClient.db(this.dbname);
					// 选择数据库对应的集合
					let collection = db.collection(coll_name);
					// 返回要操作的集合
					resolve(collection);
				})
				.catch(err => {
					// 返回错误
					reject(err);
				});
		});
		return p;
	}
	// 初始化
	// 查询
	// 示例：this.find('film')
	async find({ coll_name, query = {}, callback } = {}) {
		let is_error = null;
		let collection = await this.connect(coll_name).catch(err => {
			// err没有错误的时候值为null
			// 有错误的时候err的值不为null
			is_error = err;
		});
		if (is_error) {
			callback({ error_code: 101, msg: '连接失败', data: is_error });
			return;
		}
		// 查询操作
		collection
			.find(query)
			.toArray()
			.then(result => {
				callback({ error_code: 0, msg: '成功', data: result });
			})
			.catch(err => {
				callback({ error_code: 102, msg: '查询失败', data: err });
			});
	}
	// 排序功能
	async pagination(coll_name, page, size, callback) {
		let is_error = null;
		let collection = await this.connect(coll_name).catch(err => {
			// err没有错误的时候值为null
			// 有错误的时候err的值不为null
			is_error = err;
		});
		if (is_error) {
			callback({ error_code: 101, msg: '连接失败', data: is_error });
			return;
		}
		// 查询操作
		page = (page - 1) * size;
		collection
			.find()
			.skip(page)
			.limit(size)
			.toArray()
			.then(result => {
				callback({ error_code: 0, msg: '成功', data: result });
			})
			.catch(err => {
				callback({ error_code: 102, msg: '查询失败', data: err });
			});
	}
	// 排序功能
	async sort(coll_name, query, callback) {
		let is_error = null;
		let collection = await this.connect(coll_name).catch(err => {
			// err没有错误的时候值为null
			// 有错误的时候err的值不为null
			is_error = err;
		});
		if (is_error) {
			callback({ error_code: 101, msg: '连接失败', data: is_error });
			return;
		}
		// 查询操作
		collection
			.find()
			.sort(query)
			.toArray()
			.then(result => {
				callback({ error_code: 0, msg: '成功', data: result });
			})
			.catch(err => {
				callback({ error_code: 102, msg: '查询失败', data: err });
			});
	}
	// 新增
	async insert(coll_name, data, callback) {
		let is_error = null;
		let collection = await this.connect(coll_name).catch(err => {
			// err没有错误的时候值为null
			// 有错误的时候err的值不为null
			is_error = err;
		});
		if (is_error) {
			callback({ error_code: 101, msg: '连接失败', data: is_error });
			return;
		}
		// 查询操作
		collection
			.insert(data)
			.then(result => {
				callback({ error_code: 0, msg: '成功', data: result });
			})
			.catch(err => {
				callback({ error_code: 102, msg: '查询失败', data: err });
			});
	}
	// 修改
	async update(coll_name, query, data, callback) {
		let is_error = null;
		let collection = await this.connect(coll_name).catch(err => {
			// err没有错误的时候值为null
			// 有错误的时候err的值不为null
			is_error = err;
		});
		if (is_error) {
			callback({ error_code: 101, msg: '连接失败', data: is_error });
			return;
		}
		// 查询操作
		collection
			.updateMany(query, { $set: data })
			.then(result => {
				callback({ error_code: 0, msg: '成功', data: result });
			})
			.catch(err => {
				callback({ error_code: 102, msg: '查询失败', data: err });
			});
	}
	// 删除
	async delete(coll_name, query, calback) {
		let is_error = null;
		let collection = await this.connect(coll_name).catch(err => {
			// err没有错误的时候值为null
			// 有错误的时候err的值不为null
			is_error = err;
		});
		if (is_error) {
			callback({ error_code: 101, msg: '连接失败', data: is_error });
			return;
		}
		// 查询操作
		collection
			.deleteMany(query)
			.then(result => {
				callback({ error_code: 0, msg: '成功', data: result });
			})
			.catch(err => {
				callback({ error_code: 102, msg: '查询失败', data: err });
			});
	}
}

let db = new Db('student');

// db.find({
// 	coll_name: 'film',
// 	callback: res => {
// 		console.log(res);
// 	},
// 	query: { name: 'xx' },
// });
// db.pagination('film', 2, 3, res => {
// 	console.log(res);
// });

module.exports = Db;
