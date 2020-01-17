// 1、导入
var Client = require('mongodb').MongoClient;
// 2、初始化客户端
var url = 'mongodb://127.0.0.1:27017';
var mongo = new Client(url, { useNewUrlParser: true });
// 3、链接服务器
mongo.connect((err, MongoClient) => {
	if (err) {
	} else {
		var db = MongoClient.db('baofeng');
		var collection = db.collection('films');

		// CRUD
		// collection.find();
		// collection.updateMany
		// collection.insertOne
		// collection.deleteMany
	}
});
// 4、
