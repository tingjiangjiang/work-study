let mongodb = require('mongodb').MongoClient;

mongodb.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (error, result) => {
	if (error) {
		// 有错误
	} else {
		let db = result.db('student');
		let collection = db.collection('film');
		// 查询
		collection
			.find()
			.toArray()
			.then(result => {
				console.log(result);
			})
			.catch(error => {});
		// 新增

		// 修改

		// 删除
	}
});
