/*
    1、首先得有一个客户端
    2、通过客户端连接服务器
    3、选择数据库
    4、使用对应的集合进行CRUD操作
*/
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://127.0.0.1:27017';
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
	// console.log(err);
	if (err) {
		// 有错误
	} else {
		// 连接成功
		let stu = client.db('student');
		let film_collection = stu.collection('film');
		// 查询
		// film_collection.find({ name: 'xx' }).toArray((err, result) => {
		// 	console.log(result);
		// });
		find(film_collection);
		// 新增
		// film_collection.insert({ name: 'XXS', age: 28 }, (err, result) => {
		// 	console.log(result);
		// });
		// 删除
		// film_collection.deleteMany({ name: 'XXS' }, (err, result) => {
		// 	console.log(result);
		// });
		// 更新
		// film_collection
		// 	.updateMany({ name: 'xx' }, { $set: { age: 25 } })
		// 	.then(result => {
		// 		console.log(result);
		// 	})
		// 	.catch(err => {});
	}
});

function find(collection) {
	collection.find({ name: 'xx' }).toArray((err, result) => {
		console.log(result);
	});
}

// let conn = MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// conn.then(client => {
// 	console.log(client);
// }).catch(err => {
// 	console.log(err);
// });
